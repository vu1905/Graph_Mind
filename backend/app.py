import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return jsonify({'message': 'Backend Flask API Server is running!'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f"Flask Backend running at http://localhost:{port}")
    app.run(debug=True, host='0.0.0.0', port=port)
