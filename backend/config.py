import os
import atexit
from dotenv import load_dotenv
from neo4j import GraphDatabase
from qdrant_client import QdrantClient

# Load các biến từ file .env
load_dotenv()

class DatabaseConfig:
    def __init__(self):
        # --- NEO4J ---
        self.neo4j_uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self.neo4j_user = os.getenv("NEO4J_USER", "neo4j")
        self.neo4j_password = os.getenv("NEO4J_PASSWORD", "password123")
        self.neo4j_driver = None

        # --- QDRANT ---
        self.qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
        self.qdrant_client = None

    def connect_neo4j(self):
        try:
            self.neo4j_driver = GraphDatabase.driver(
                self.neo4j_uri, 
                auth=(self.neo4j_user, self.neo4j_password)
            )
            self.neo4j_driver.verify_connectivity()
            print("✅ Neo4j Connected Successfully!")
            return self.neo4j_driver
        except Exception as e:
            print(f"❌ Neo4j Connection Error: {e}")
            return None

    def connect_qdrant(self):
        try:
            self.qdrant_client = QdrantClient(url=self.qdrant_url)
            print("✅ Qdrant Connected Successfully!")
            return self.qdrant_client
        except Exception as e:
            print(f"❌ Qdrant Connection Error: {e}")
            return None

    def close(self):
        if self.neo4j_driver:
            self.neo4j_driver.close()

# Khởi tạo instance dùng chung (Singleton pattern)
db = DatabaseConfig()
neo4j_conn = db.connect_neo4j()
qdrant_conn = db.connect_qdrant()

# Đăng ký tự động đóng kết nối khi tắt app (Fix lỗi cleanup warning của Python)
atexit.register(db.close)