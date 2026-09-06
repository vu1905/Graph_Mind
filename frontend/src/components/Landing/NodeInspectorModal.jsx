import React from 'react';
import { X, Network, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

const NodeInspectorModal = ({ isOpen, onClose, selectedNode, nodesData, apiStatus }) => {
  if (!isOpen) return null;

  const node = nodesData?.find(n => n.id === selectedNode || n.type === selectedNode) || {
    id: selectedNode || 'node-core',
    name: 'Graph_Mind Core Engine',
    type: 'graph',
    category: 'System Core',
    engine: 'Stitch Graph Intelligence',
    records: 491200,
    connections: 88,
    status: 'active',
    description: 'Hệ thống quản trị đồ thị tri thức đa chiều, kết nối dữ liệu từ Flask API, PyMySQL và mô hình AI.'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Network size={20} color="#3B82F6" />
            </div>
            <div>
              <h3>{node.name}</h3>
              <span className="modal-subtitle">{node.engine} • {node.category}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-desc">{node.description}</p>

          <div className="modal-grid-stats">
            <div className="stat-box">
              <span className="stat-box-lbl">BẢN GHI / TRIPLE</span>
              <span className="stat-box-val">{node.records ? node.records.toLocaleString() : '128,400'}</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-lbl">SỐ NỐI (EDGES)</span>
              <span className="stat-box-val">{node.connections || 42}</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-lbl">ĐỘ TRỄ TRUY VẤN</span>
              <span className="stat-box-val text-green">12 ms</span>
            </div>
          </div>

          <div className="modal-section-title">
            <Terminal size={16} color="#3B82F6" />
            <span>TRUY VẤN MẪU SPARQL / GQL</span>
          </div>

          <div className="code-block-container">
            <pre>
{`SELECT ?entity ?relation ?target
WHERE {
  ?entity rdf:type graph:${node.type || 'Entity'} ;
          graph:connectedTo ?target ;
          graph:status "active" .
} LIMIT 10`}
            </pre>
          </div>

          <div className="modal-status-footer">
            <div className="status-item">
              <CheckCircle2 size={16} color="#10B981" />
              <span>Backend Flask Status: {apiStatus?.connected ? 'CONNECTED (Port 5000)' : 'STANDBY MODE'}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="ghost-btn" onClick={onClose}>Đóng</button>
          <button className="primary-btn" onClick={onClose}>
            <span>Chạy Truy Vấn Ngay</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeInspectorModal;
