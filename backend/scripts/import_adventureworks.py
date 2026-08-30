import sys
import os
import pandas as pd

# 1. Thêm đường dẫn backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import neo4j_conn

# 2. Cấu hình đường dẫn
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "adventureworks")

# --- KHAI BÁO 3 FILE CSV ---
FILE_CATEGORY = "Production_ProductCategory.csv"
FILE_SUBCATEGORY = "Production_ProductSubcategory.csv"
FILE_PRODUCT = "Production_Product.csv"

def create_constraints():
    print("⏳ Đang tạo Constraints...")
    queries = [
        "CREATE CONSTRAINT cat_id IF NOT EXISTS FOR (c:Category) REQUIRE c.CategoryID IS UNIQUE;",
        "CREATE CONSTRAINT subcat_id IF NOT EXISTS FOR (s:SubCategory) REQUIRE s.SubCategoryID IS UNIQUE;",
        "CREATE CONSTRAINT prod_id IF NOT EXISTS FOR (p:Product) REQUIRE p.ProductID IS UNIQUE;"
    ]
    with neo4j_conn.session() as session:
        for q in queries:
            session.run(q)
    print("✅ Đã tạo Constraints xong!\n")

def import_data_in_batches(csv_filename, query, batch_size=2000):
    file_path = os.path.join(DATA_DIR, csv_filename)
    if not os.path.exists(file_path):
        print(f"❌ Lỗi: Không tìm thấy file '{csv_filename}'")
        return False

    print(f"⏳ Đang xử lý file: {csv_filename}...")
    
    # Đọc CSV và xử lý dữ liệu trống (NaN -> None)
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

    print("🚀 BẮT ĐẦU QUÁ TRÌNH ETL CHO ADVENTUREWORKS...\n")
    create_constraints()

    # ==========================================
    # BƯỚC 1: TẠO CÁC NODE (THỰC THỂ)
    # ==========================================

    # 1.1 Category (Danh mục lớn) - Dùng cột ProductCategoryID
    query_category = """
    UNWIND $rows AS row
    MERGE (c:Category {CategoryID: toInteger(row.ProductCategoryID)})
    SET c.Name = row.Name
    """
    import_data_in_batches(FILE_CATEGORY, query_category)

    # 1.2 SubCategory (Danh mục con) - Dùng cột ProductSubcategoryID
    query_subcategory = """
    UNWIND $rows AS row
    MERGE (s:SubCategory {SubCategoryID: toInteger(row.ProductSubcategoryID)})
    SET s.Name = row.Name
    """
    import_data_in_batches(FILE_SUBCATEGORY, query_subcategory)

    # 1.3 Product (Sản phẩm) - Dùng cột ProductID
    query_product = """
    UNWIND $rows AS row
    MERGE (p:Product {ProductID: toInteger(row.ProductID)})
    SET p.Name = row.Name,
        p.ProductNumber = row.ProductNumber,
        p.ListPrice = toFloat(row.ListPrice)
    """
    import_data_in_batches(FILE_PRODUCT, query_product)

    # ==========================================
    # BƯỚC 2: TẠO MỐI QUAN HỆ (RELATIONSHIPS)
    # ==========================================

    # 2.1 SubCategory thuộc về Category (Đọc từ file SubCategory)
    print("⏳ Đang tạo Mối quan hệ (SubCategory -[:PART_OF]-> Category)...")
    query_rel_sub_cat = """
    UNWIND $rows AS row
    WITH row WHERE row.ProductCategoryID IS NOT NULL
    
    MATCH (s:SubCategory {SubCategoryID: toInteger(row.ProductSubcategoryID)})
    MATCH (c:Category {CategoryID: toInteger(row.ProductCategoryID)})
    MERGE (s)-[:PART_OF]->(c)
    """
    import_data_in_batches(FILE_SUBCATEGORY, query_rel_sub_cat)

    # 2.2 Product thuộc về SubCategory (Đọc từ file Product)
    print("⏳ Đang tạo Mối quan hệ (Product -[:BELONGS_TO]-> SubCategory)...")
    query_rel_prod_sub = """
    UNWIND $rows AS row
    WITH row WHERE row.ProductSubcategoryID IS NOT NULL
    
    MATCH (p:Product {ProductID: toInteger(row.ProductID)})
    MATCH (s:SubCategory {SubCategoryID: toInteger(row.ProductSubcategoryID)})
    MERGE (p)-[:BELONGS_TO]->(s)
    """
    import_data_in_batches(FILE_PRODUCT, query_rel_prod_sub)

    print("🎉 HOÀN TẤT TRỌN VẸN ETL CHO SẢN PHẨM ADVENTUREWORKS!")

if __name__ == "__main__":
    main()