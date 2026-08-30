# 🚀 GraphMind Project

Dự án Web Fullstack với kiến trúc phân tách **Backend (Python Flask)** và **Frontend (React Web)**.

---

## 📂 Cấu Trúc Thư Mục (Project Architecture)

```text
Graph_Mind/
├── 📁 backend/                       # MÃ NGUỒN BACKEND (Python Flask API)
│   ├── 📁 routes/                    # Định nghĩa các Route / API Endpoints (Blueprints)
│   ├── 📁 static/                    # Chứa các tài nguyên tĩnh
│   │   └── 📁 uploads/               # Thư mục lưu trữ file người dùng tải lên (CV, ảnh...)
│   ├── 📁 utils/                     # Thư mục tiện ích helper (Database connection, helper functions)
│   ├── 📄 .env                       # File cấu hình biến môi trường cục bộ
│   ├── 📄 .env.example               # Mẫu cấu hình biến môi trường
│   ├── 📄 .gitignore                 # Cấu hình bỏ qua tệp khi dùng Git
│   ├── 📄 app.py                     # Entry point chính khởi chạy Flask Server (Port 5000)
│   └── 📄 requirements.txt           # Danh sách các thư viện Python dependency
│
├── 📁 docs/                          # TÀI LIỆU DỰ ÁN (Specifications, Architecture Docs)
│
└── 📁 frontend/                      # MÃ NGUỒN FRONTEND (React Web Single Page Application)
    ├── 📁 public/                    # Tài nguyên tĩnh công khai (index.html, favicon...)
    │   └── 📄 index.html             # Tệp HTML khởi đầu của ứng dụng Web
    ├── 📁 src/                       # Mã nguồn ứng dụng React
    │   ├── 📁 assets/                # Hình ảnh, biểu tượng, phông chữ sử dụng trong ứng dụng
    │   ├── 📁 components/            # Các UI Components phân loại theo tính năng
    │   │   ├── 📁 Admin/             # Màn hình & Component dành cho Quản trị viên
    │   │   ├── 📁 Auth/              # Component Đăng nhập, Đăng ký, Quên mật khẩu
    │   │   ├── 📁 DashboardLogged/   # Bảng điều khiển dành cho Người dùng đã đăng nhập
    │   │   ├── 📁 Features/          # Các tính năng lõi của hệ thống
    │   │   └── 📁 Landing/           # Trang chủ / Trang giới thiệu (Landing Page)
    │   ├── 📁 services/              # Các hàm gọi API giao tiếp với Backend
    │   ├── 📄 App.css                # CSS cho Component App chính
    │   ├── 📄 App.js                 # Component React cấp cao nhất
    │   ├── 📄 index.css              # Style toàn cục (Global CSS)
    │   └── 📄 index.js               # File khởi tạo React DOM chính
    └── 📄 package.json               # Quản lý thư viện & kịch bản npm
```

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

*   **Backend:** Python 3.14+, Flask, Flask-CORS, PyMySQL, Python-Dotenv
*   **Frontend:** React Web (react-scripts), HTML5, CSS3, JavaScript (ES6+)

---

## ⚡ Hướng Dẫn Chạy Dự Án (Getting Started)

### 1. Khởi chạy Backend (Flask API)

```bash
# Di chuyển vào thư mục backend
cd backend

# Tạo môi trường ảo Python (nếu chưa có)
python -m venv .venv

# Kích hoạt môi trường ảo
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
# Windows (CMD):
.venv\Scripts\activate.bat

# Cài đặt các thư viện phụ thuộc
pip install -r requirements.txt

# Khởi chạy Flask Server
python app.py
```
> Backend sẽ chạy tại: `http://localhost:5000`

---

### 2. Khởi chạy Frontend (React Web)

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt các gói thư viện Node.js (nếu chưa cài)
npm install

# Khởi chạy React Development Server
npm start
```
> Frontend sẽ chạy tại: `http://localhost:3000`

---

## 📝 Quy Định Đặt Mã Nguồn (Development Conventions)

1.  **Backend Routes:** Tạo các file Blueprint bên trong thư mục `backend/routes/` và đăng ký vào `app.py`.
2.  **Frontend Components:** Đặt các giao diện thành phần vào đúng thư mục tương ứng trong `frontend/src/components/`.
3.  **API Services:** Đặt các hàm xử lý gọi API giao tiếp với backend trong `frontend/src/services/`.
