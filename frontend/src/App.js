import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Search, 
  Cpu, 
  Share2, 
  Zap, 
  Database, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [apiStatus, setApiStatus] = useState({ connected: false, message: 'Đang kết nối Backend...' });
  const [nodes, setNodes] = useState([
    { id: 'n1', title: 'Knowledge Graph Core', category: 'Architecture', connections: 42 },
    { id: 'n2', title: 'Python Flask API', category: 'Backend Engine', connections: 18 },
    { id: 'n3', title: 'Stitch Design System', category: 'UI / UX Rules', connections: 35 },
    { id: 'n4', title: 'React Web Interface', category: 'Frontend Client', connections: 24 }
  ]);

  useEffect(() => {
    // Ping backend Flask API health check endpoint
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus({ connected: true, message: data.message || 'Backend Active (Flask)' });
      })
      .catch(() => {
        setApiStatus({ connected: false, message: 'Flask API Offline (Standby Mode)' });
      });
  }, []);

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="header-nav">
        <div className="brand-badge">
          <div className="brand-icon">
            <Network size={22} />
          </div>
          <div>
            <span className="brand-name">Graph_Mind</span>
          </div>
          <span className="brand-tag">Stitch System v1.0</span>
        </div>

        <div className="nav-actions">
          <div className="status-pill">
            <span className="pulse-dot"></span>
            <span>{apiStatus.message}</span>
          </div>
          <button className="primary-btn">
            <Sliders size={16} />
            <span>Cấu hình Graph</span>
          </button>
        </div>
      </header>

      {/* Asymmetric Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Mạng Lưới Tri Thức <br />
            <span className="inline-highlight">
              Semantic Intelligence <Share2 size={32} />
            </span>
          </h1>
          <p className="hero-subtitle">
            Hệ thống quản trị đồ thị tri thức thông minh, tích hợp trực tiếp quy chuẩn thiết kế **Stitch Design Taste** với cấu trúc tối giản và hiệu năng cao.
          </p>

          <div className="search-box">
            <Search size={20} color="#71717A" style={{ marginRight: '0.75rem' }} />
            <input 
              type="text" 
              placeholder="Tìm kiếm nút tri thức, thực thể hoặc truy vấn SPARQL/GQL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="primary-btn" style={{ padding: '0.55rem 1.1rem' }}>
              <span>Truy vấn</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Bento Cards Grid */}
      <section className="bento-grid">
        {/* Card 1: Knowledge Graph Explorer */}
        <div className="bento-card col-8">
          <div className="card-header">
            <div className="card-title">
              <Network size={20} color="#3B82F6" />
              <span>Knowledge Graph Overview</span>
            </div>
            <span className="metric-badge">4 Active Nodes</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1rem' }}>
            Trực quan hóa cấu trúc liên kết các thực thể tri thức đang hoạt động trong Graph_Mind:
          </p>

          <div className="graph-visual">
            {nodes.map((node) => (
              <div key={node.id} className="node-chip">
                <div className="node-title">
                  <Database size={16} color="#3B82F6" />
                  <span>{node.title}</span>
                </div>
                <div className="node-meta">
                  Phân loại: <strong>{node.category}</strong>
                </div>
                <div className="node-meta">
                  Liên kết: <strong>{node.connections} edges</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Realtime Metrics */}
        <div className="bento-card col-4">
          <div className="card-header">
            <div className="card-title">
              <Zap size={20} color="#3B82F6" />
              <span>Chỉ số Đồ thị</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>TỔNG SỐ NÚT (NODES)</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>1,284</div>
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>TỔNG CẠNH NỐI (EDGES)</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>4,912</div>
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ĐỘ TRỄ TRUY VẤN (LATENCY)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#10B981' }}>12 ms</div>
            </div>
          </div>
        </div>

        {/* Card 3: Backend Integration */}
        <div className="bento-card col-6">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={20} color="#3B82F6" />
              <span>Python Backend Engine (Flask)</span>
            </div>
            <span className="metric-badge">Port 5000</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Server backend Python đã sẵn sàng xử lý các truy vấn xử lý đồ thị, lưu trữ tri thức và phản hồi JSON API.
          </p>
          <div style={{ background: 'var(--canvas-bg)', padding: '1rem', borderRadius: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <div>Endpoint: <code>http://localhost:5000/api/health</code></div>
            <div>Trạng thái: <strong style={{ color: apiStatus.connected ? '#10B981' : '#F59E0B' }}>{apiStatus.connected ? 'ONLINE' : 'STANDBY'}</strong></div>
          </div>
        </div>

        {/* Card 4: Stitch Design System Integration */}
        <div className="bento-card col-6">
          <div className="card-header">
            <div className="card-title">
              <Layers size={20} color="#3B82F6" />
              <span>Stitch Design System (Cách 2 Active)</span>
            </div>
            <span className="metric-badge">DESIGN.md</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Hệ thống tự động áp dụng quy chuẩn thiết kế từ <code>DESIGN.md</code> & <code>.agents/skills/stitch-skill</code>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Geist / Outfit Display Typography</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Charcoal Ink (#18181B) & Electric Blue (#3B82F6)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Asymmetric Bento Grid & Micro-animations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <div>Graph_Mind Knowledge System © 2026</div>
        <div style={{ fontFamily: 'var(--font-mono)' }}>Powered by Stitch Design Taste & Antigravity AI</div>
      </footer>
    </div>
  );
}

export default App;

