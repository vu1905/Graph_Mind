import sys
import os
import pandas as pd

# 1. Thêm đường dẫn backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import neo4j_conn

# 2. Cấu hình đường dẫn
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "adventureworks")

# --- KHAI BÁO 3 FILE CSV PHÂN HỆ SALES ---
FILE_CUSTOMER = "Sales_Customer.csv"
FILE_ORDER_HEADER = "Sales_SalesOrderHeader.csv"
FILE_ORDER_DETAIL = "Sales_SalesOrderDetail.csv"

def create_constraints():
    print("⏳ Đang tạo Constraints cho Khách hàng và Đơn hàng...")
    queries = [
        "CREATE CONSTRAINT cust_id IF NOT EXISTS FOR (c:Customer) REQUIRE c.CustomerID IS UNIQUE;",
        "CREATE CONSTRAINT order_id IF NOT EXISTS FOR (o:SalesOrder) REQUIRE o.SalesOrderID IS UNIQUE;"
    ]
    with neo4j_conn.session() as session:
        for q in queries:
            session.run(q)
    print("✅ Đã tạo Constraints xong!\n")

def import_data_in_batches(csv_filename, query, batch_size=5000):
    # Lưu ý: Batch size tăng lên 5000 vì file SalesOrderDetail rất lớn
    file_path = os.path.join(DATA_DIR, csv_filename)
    if not os.path.exists(file_path):
        print(f"❌ Lỗi: Không tìm thấy file '{csv_filename}'")
        return False

    print(f"⏳ Đang xử lý file: {csv_filename}...")
    
    df = pd.read_csv(file_path)
    df = df.where(pd.notnull(df), None) 
    data_list = df.to_dict(orient="records")

    with neo4j_conn.session() as session:
        for i in range(0, len(data_list), batch_size):
            batch = data_list[i:i + batch_size]
            session.run(query, rows=batch)
            print(f"   -> Đã nạp {min(i + batch_size, len(data_list))}/{len(data_list)} dòng")
            
    print(f"✅ Xong {csv_filename}!\n")
    return True

def main():
    if not neo4j_conn:
        print("❌ Chưa kết nối được Neo4j!")
        return

    print("🚀 BẮT ĐẦU QUÁ TRÌNH ETL PHÂN HỆ SALES...\n")
    create_constraints()

    # ==========================================
    # 1. IMPORT KHÁCH HÀNG (CUSTOMER)
    # ==========================================
    query_customer = """
    UNWIND $rows AS row
    MERGE (c:Customer {CustomerID: toInteger(row.CustomerID)})
    // Lưu ý: AdventureWorks tách Person ra bảng riêng, Customer ở đây đóng vai trò ID mua hàng
    """
    import_data_in_batches(FILE_CUSTOMER, query_customer)

    # ==========================================
    # 2. IMPORT ĐƠN HÀNG & NỐI VỚI KHÁCH HÀNG
    # ==========================================
    # File Header chứa cả thông tin Đơn hàng và ID Khách hàng mua đơn đó
    query_order = """
    UNWIND $rows AS row
    
    // 2.1 Tạo node Đơn hàng
    MERGE (o:SalesOrder {SalesOrderID: toInteger(row.SalesOrderID)})
    SET o.OrderDate = date(substring(row.OrderDate, 0, 10)), // Cắt lấy ngày YYYY-MM-DD
        o.TotalDue = toFloat(row.TotalDue)
        
    // 2.2 Nối với Khách hàng
    WITH o, row WHERE row.CustomerID IS NOT NULL
    MATCH (c:Customer {CustomerID: toInteger(row.CustomerID)})
    MERGE (c)-[:PLACED_ORDER]->(o)
    """
    import_data_in_batches(FILE_ORDER_HEADER, query_order)

    # ==========================================
    # 3. IMPORT CHI TIẾT ĐƠN HÀNG (NỐI ORDER VỚI PRODUCT)
    # ==========================================
    # Đây là bảng trung gian quan trọng nhất thay thế Join Table bằng Edge (Cạnh)
    print("⏳ Đang tạo liên kết Đơn hàng -> Sản phẩm (Rất nhiều dữ liệu, vui lòng chờ)...")
    query_order_detail = """
    UNWIND $rows AS row
    
    MATCH (o:SalesOrder {SalesOrderID: toInteger(row.SalesOrderID)})
    MATCH (p:Product {ProductID: toInteger(row.ProductID)})
    
    // Tạo cạnh CHỨA_SẢN_PHẨM và mang theo thuộc tính Số lượng, Đơn giá
    MERGE (o)-[rel:CONTAINS_PRODUCT]->(p)
    SET rel.OrderQty = toInteger(row.OrderQty),
        rel.UnitPrice = toFloat(row.UnitPrice)
    """
    import_data_in_batches(FILE_ORDER_DETAIL, query_order_detail)

    print("🎉 HOÀN TẤT TRỌN VẸN ETL PHÂN HỆ BÁN HÀNG!")

if __name__ == "__main__":
    main()