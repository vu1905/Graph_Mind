import sys
import os
import pandas as pd

# 1. Thêm đường dẫn backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import neo4j_conn

# 2. Cấu hình đường dẫn
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "adventureworks")

# --- KHAI BÁO CÁC FILE CSV CẦN THIẾT ---
FILE_EMPLOYEE = "HumanResources_Employee.csv"
FILE_PERSON = "Person_Person.csv"
FILE_CUSTOMER = "Sales_Customer.csv"
FILE_ORDER_HEADER = "Sales_SalesOrderHeader.csv"

def create_constraints():
    print("⏳ Đang tạo Constraints cho Nhân viên...")
    query = "CREATE CONSTRAINT emp_id IF NOT EXISTS FOR (e:Employee) REQUIRE e.EmployeeID IS UNIQUE;"
    with neo4j_conn.session() as session:
        session.run(query)
    print("✅ Đã tạo Constraints xong!\n")

def import_data_in_batches(csv_filename, query, batch_size=5000):
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
            print(f"   -> Đã xử lý {min(i + batch_size, len(data_list))}/{len(data_list)} dòng")
            
    print(f"✅ Xong {csv_filename}!\n")
    return True

def main():
    if not neo4j_conn:
        print("❌ Chưa kết nối được Neo4j!")
        return

    print("🚀 BẮT ĐẦU ETL PHÂN HỆ NHÂN SỰ & CON NGƯỜI...\n")
    create_constraints()

    # ==========================================
    # 1. TẠO NODE NHÂN VIÊN (EMPLOYEE)
    # ==========================================
    query_employee = """
    UNWIND $rows AS row
    MERGE (e:Employee {EmployeeID: toInteger(row.BusinessEntityID)})
    SET e.JobTitle = row.JobTitle
    """
    import_data_in_batches(FILE_EMPLOYEE, query_employee)

    # ==========================================
    # 2. CẬP NHẬT MÃ PERSON CHO KHÁCH HÀNG
    # (Để biết Khách hàng ID 1 là Con người ID mấy)
    # ==========================================
    query_map_customer = """
    UNWIND $rows AS row
    WITH row WHERE row.PersonID IS NOT NULL
    MATCH (c:Customer {CustomerID: toInteger(row.CustomerID)})
    SET c.PersonID = toInteger(row.PersonID)
    """
    import_data_in_batches(FILE_CUSTOMER, query_map_customer)

    # ==========================================
    # 3. CẬP NHẬT TÊN TUỔI TỪ BẢNG PERSON
    # Đắp Tên/Họ vào cho cả Nhân viên và Khách hàng
    # ==========================================
    print("⏳ Đang đắp dữ liệu Tên, Họ vào các Node Khách hàng và Nhân viên...")
    query_person_name = """
    UNWIND $rows AS row
    // 3.1 Cập nhật tên Khách hàng
    OPTIONAL MATCH (c:Customer {PersonID: toInteger(row.BusinessEntityID)})
    SET c.FirstName = row.FirstName, c.LastName = row.LastName
    
    WITH row // <--- ĐÂY LÀ CÂU LỆNH CẦU NỐI BẮT BUỘC THÊM VÀO
    
    // 3.2 Cập nhật tên Nhân viên
    OPTIONAL MATCH (e:Employee {EmployeeID: toInteger(row.BusinessEntityID)})
    SET e.FirstName = row.FirstName, e.LastName = row.LastName
    """
    import_data_in_batches(FILE_PERSON, query_person_name, batch_size=10000)

    # ==========================================
    # 4. KẾT NỐI ĐƠN HÀNG VỚI NHÂN VIÊN BÁN (SOLD_BY)
    # ==========================================
    print("⏳ Đang tạo liên kết Đơn hàng -> Nhân viên bán (SOLD_BY)...")
    query_order_employee = """
    UNWIND $rows AS row
    WITH row WHERE row.SalesPersonID IS NOT NULL
    
    MATCH (o:SalesOrder {SalesOrderID: toInteger(row.SalesOrderID)})
    MATCH (e:Employee {EmployeeID: toInteger(row.SalesPersonID)})
    MERGE (o)-[:SOLD_BY]->(e)
    """
    import_data_in_batches(FILE_ORDER_HEADER, query_order_employee)

    print("🎓 CHÚC MỪNG! BẠN ĐÃ TỐT NGHIỆP 100% GIAI ĐOẠN D (NEO4J - ADVENTUREWORKS)!")

if __name__ == "__main__":
    main()