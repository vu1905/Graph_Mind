# 🐍 Backend (Flask API)

Thư mục backend dịch vụ RESTful API được xây dựng với Python Flask.

## 📂 Cấu trúc thư mục

* `routes/`: Nơi chứa các Blueprint xử lý API endpoints.
* `static/uploads/`: Lưu trữ tệp được upload lên từ phía client.
* `utils/`: Các module trợ giúp (Database helper, Auth helper...).
* `app.py`: File khởi chạy chính của Flask server.
* `requirements.txt`: Khai báo các thư viện Python.

## ⚡ Hướng dẫn chạy

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
