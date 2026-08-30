import sys
import os
import uuid

# Thêm đường dẫn backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import qdrant_conn
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

# --- CẤU HÌNH ---
# Đường dẫn tới thư mục chứa file txt của CUAD
CUAD_TXT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "CUAD_v1", "full_contract_txt")
COLLECTION_NAME = "cuad_contracts"
# Chế độ test: Chỉ nhúng 5 hợp đồng đầu tiên. Đổi thành None để chạy toàn bộ 510 hợp đồng.
MAX_FILES = None

def setup_qdrant(vector_size):
    """Kiểm tra và tạo Collection trong Qdrant nếu chưa có"""
    print("⏳ Đang kiểm tra Qdrant Collection...")
    if not qdrant_conn.collection_exists(COLLECTION_NAME):
        qdrant_conn.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
        )
        print(f"✅ Đã tạo mới Collection: '{COLLECTION_NAME}'")
    else:
        print(f"✅ Collection '{COLLECTION_NAME}' đã sẵn sàng.")

def main():
    if not qdrant_conn:
        print("❌ Chưa kết nối được Qdrant!")
        return

    print("🚀 BẮT ĐẦU XỬ LÝ CHUNKING & EMBEDDING CHO CUAD...\n")

    # 1. TẢI MÔ HÌNH EMBEDDING (Chạy CPU tốt)
    print("⏳ Đang tải mô hình nhúng (Embedding Model: all-MiniLM-L6-v2)...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    vector_size = model.get_sentence_embedding_dimension()
    
    # Khởi tạo Qdrant Collection
    setup_qdrant(vector_size)

    # 2. CẤU HÌNH CHUNKING (Cắt văn bản)
    # Cắt thành đoạn 1000 ký tự, phần overlap là 150 ký tự (để không mất nghĩa ngữ cảnh)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=["\n\n", "\n", ".", " ", ""]
    )

    # 3. ĐỌC FILE VÀ XỬ LÝ
    if not os.path.exists(CUAD_TXT_DIR):
        print(f"❌ Không tìm thấy thư mục CUAD TXT tại: {CUAD_TXT_DIR}")
        return

    txt_files = [f for f in os.listdir(CUAD_TXT_DIR) if f.endswith('.txt')]
    files_to_process = txt_files[:MAX_FILES] if MAX_FILES else txt_files

    print(f"\n📁 Tìm thấy tổng cộng {len(txt_files)} hợp đồng.")
    print(f"🔄 Sẽ xử lý {len(files_to_process)} hợp đồng trong đợt này...\n")

    total_chunks_processed = 0

    for idx, filename in enumerate(files_to_process):
        file_path = os.path.join(CUAD_TXT_DIR, filename)
        
        # Đọc nội dung hợp đồng
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            contract_text = f.read()

        # Cắt hợp đồng thành các Chunk nhỏ
        chunks = text_splitter.split_text(contract_text)
        
        print(f"[{idx+1}/{len(files_to_process)}] Đang nhúng {len(chunks)} chunks cho hợp đồng: {filename[:30]}...")

        # Mã hóa (Embed) các chunk thành vector
        embeddings = model.encode(chunks).tolist()

        # Chuẩn bị dữ liệu đẩy vào Qdrant
        points = []
        for i, (chunk, vector) in enumerate(zip(chunks, embeddings)):
            points.append(
                PointStruct(
                    id=str(uuid.uuid4()), # Sinh ID ngẫu nhiên không trùng lặp
                    vector=vector,
                    payload={
                        "contract_name": filename,
                        "chunk_id": i,
                        "text": chunk
                    }
                )
            )

        # Đẩy vào Qdrant
        qdrant_conn.upsert(
            collection_name=COLLECTION_NAME,
            points=points
        )
        total_chunks_processed += len(chunks)

    print(f"\n🎉 HOÀN TẤT! Đã đưa thành công {total_chunks_processed} chunks (đoạn hợp đồng) vào Qdrant Vector DB!")

if __name__ == "__main__":
    main()