import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

NODES_DATABASE = [
    {
        "id": "node-db-01",
        "name": "Database Node",
        "type": "database",
        "category": "Data Storage",
        "engine": "PyMySQL + Vector Index",
        "records": 128400,
        "connections": 42,
        "status": "active",
        "description": "Lưu trữ dữ liệu cấu trúc thực thể, thuộc tính và liên kết tri thức."
    },
    {
        "id": "node-graph-02",
        "name": "Knowledge Graph Node",
        "type": "graph",
        "category": "Triple Store",
        "engine": "Stitch RDF / GQL Engine",
        "records": 491200,
        "connections": 88,
        "status": "active",
        "description": "Quản lý mạng lưới liên kết ngữ cảnh và suy luận quan hệ phức hợp."
    },
    {
        "id": "node-analytics-03",
        "name": "Analytics Node",
        "type": "analytics",
        "category": "Realtime Engine",
        "engine": "Graph Metrics Collector",
        "records": 9850,
        "connections": 35,
        "status": "active",
        "description": "Giám sát hiệu năng truy vấn, đo lường độ trễ và lưu lượng mạng lưới."
    },
    {
        "id": "node-ai-04",
        "name": "Identity & AI Node",
        "type": "identity",
        "category": "AI Context Layer",
        "engine": "Flask Microservice + LLM",
        "records": 3420,
        "connections": 64,
        "status": "active",
        "description": "Xử lý ngữ cảnh tự nhiên, phân tích thực thể AI và định danh truy cập."
    }
]

@app.route('/')
def index():
    return jsonify({'message': 'Backend Flask API Server is running!'})

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'online',
        'message': 'Flask Intelligence Engine Active',
        'port': os.getenv('PORT', 5000),
        'version': '1.0.0'
    })

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    return jsonify({
        'total_nodes': 1284,
        'total_edges': 4912,
        'query_latency_ms': 12,
        'uptime': '99.98%',
        'active_queries_per_sec': 340
    })

@app.route('/api/nodes', methods=['GET'])
def get_nodes():
    return jsonify({
        'status': 'success',
        'count': len(NODES_DATABASE),
        'data': NODES_DATABASE
    })

@app.route('/api/query', methods=['POST'])
def handle_query():
    body = request.get_json() or {}
    query_str = body.get('query', '').strip()
    
    if not query_str:
        filtered = NODES_DATABASE
    else:
        filtered = [
            n for n in NODES_DATABASE 
            if query_str.lower() in n['name'].lower() 
            or query_str.lower() in n['category'].lower()
            or query_str.lower() in n['description'].lower()
        ]
        
    return jsonify({
        'query': query_str,
        'results_count': len(filtered),
        'results': filtered
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f"Flask Backend running at http://localhost:{port}")
    app.run(debug=True, host='0.0.0.0', port=port)

