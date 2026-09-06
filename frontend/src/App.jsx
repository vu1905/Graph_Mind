import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Search, 
  Cpu, 
  Zap, 
  Database, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Activity,
  ChevronRight
} from 'lucide-react';
import HeroIsometric from './components/Landing/HeroIsometric.jsx';
import NodeInspectorModal from './components/Landing/NodeInspectorModal.jsx';
import ConsoleLayout from './components/DashboardLogged/ConsoleLayout.jsx';
import { GraphMindLogo } from './assets/logo/GraphMindLogo.jsx';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'console'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNode, setActiveNode] = useState('graph');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState({ connected: false, message: 'Đang kết nối Backend...' });
  const [metrics, setMetrics] = useState({
    total_nodes: 1284,
    total_edges: 4912,
    query_latency_ms: 12,
    uptime: '99.98%'
  });
  const [nodesData, setNodesData] = useState([
    {
      id: 'database',
      name: 'Database Node',
      type: 'database',
      category: 'Data Storage',
      engine: 'PyMySQL + Vector Index',
      records: 128400,
      connections: 42,
      status: 'active',
      description: 'Lưu trữ dữ liệu cấu trúc thực thể, thuộc tính và liên kết tri thức.'
    },
    {
      id: 'graph',
      name: 'Knowledge Graph Node',
      type: 'graph',
      category: 'Triple Store',
      engine: 'Stitch RDF / GQL Engine',
      records: 491200,
      connections: 88,
      status: 'active',
      description: 'Quản lý mạng lưới liên kết ngữ cảnh và suy luận quan hệ phức hợp.'
    },
    {
      id: 'analytics',
      name: 'Analytics Node',
      type: 'analytics',
      category: 'Realtime Engine',
      engine: 'Graph Metrics Collector',
      records: 9850,
      connections: 35,
      status: 'active',
      description: 'Giám sát hiệu năng truy vấn, đo lường độ trễ và lưu lượng mạng lưới.'
    },
    {
      id: 'identity',
      name: 'Identity & AI Node',
      type: 'identity',
      category: 'AI Context Layer',
      engine: 'Flask Microservice + LLM',
      records: 3420,
      connections: 64,
      status: 'active',
      description: 'Xử lý ngữ cảnh tự nhiên, phân tích thực thể AI và định danh truy cập.'
    }
  ]);

  useEffect(() => {
    // 1. Fetch Backend API Health
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus({ connected: true, message: data.message || 'Flask Backend Active' });
      })
      .catch(() => {
        setApiStatus({ connected: false, message: 'Flask API Standby Mode' });
      });

    // 2. Fetch Metrics
    fetch('http://localhost:5000/api/metrics')
      .then((res) => res.json())
      .then((data) => {
        if (data.total_nodes) {
          setMetrics(data);
        }
      })
      .catch(() => {});

    // 3. Fetch Nodes
    fetch('http://localhost:5000/api/nodes')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          setNodesData(resData.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    fetch('http://localhost:5000/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: searchQuery })
    })
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setActiveNode(data.results[0].id || data.results[0].type);
          setIsModalOpen(true);
        } else {
          setIsModalOpen(true);
        }
      })
      .catch(() => {
        setIsModalOpen(true);
      });
  };

  const handleSelectNodeFromSvg = (nodeId) => {
    setActiveNode(nodeId);
    setIsModalOpen(true);
  };

  if (viewMode === 'console') {
    return (
      <ConsoleLayout 
        onBackToLanding={() => setViewMode('landing')}
        apiStatus={apiStatus}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* 1. TOP NAVBAR HEADER */}
      <header className="navbar-header">
        <div className="navbar-container">
          {/* Brand Logo */}
          <div className="brand-logo">
            <GraphMindLogo variant="horizontal" size={38} />
          </div>

          {/* Navigation Links */}
          <nav className="nav-menu">
            <a href="#product" className="nav-link">Sản Phẩm</a>
            <a href="#solutions" className="nav-link">Giải Pháp</a>
            <a href="#integrations" className="nav-link">Tích Hợp</a>
            <a href="#resources" className="nav-link">Tài Nguyên</a>
            <a href="#pricing" className="nav-link">Bảng Giá</a>
          </nav>

          {/* Right Action Menu */}
          <div className="nav-right-group">
            <div className={`status-badge ${apiStatus.connected ? 'online' : 'standby'}`}>
              <span className="dot"></span>
              <span>{apiStatus.message}</span>
            </div>
            <button className="secondary-btn small" onClick={() => setViewMode('console')}>
              Enterprise Console (6 Modules)
            </button>
            <button className="get-started-btn" onClick={() => setViewMode('console')}>
              <span>Bắt Đầu Ngay</span>
              <ArrowRight size={16} className="btn-arrow" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH ISOMETRIC VISUAL */}
      <section className="hero-landing-section">
        {/* Top Hero Pill Badge */}
        <div className="hero-pill-badge">
          <span className="pill-dot"></span>
          <span>Tất cả Hệ thống & Dữ liệu. Trong một Lớp Đồ thị Thông minh.</span>
        </div>

        {/* Hero Headline */}
        <h1 className="hero-main-title">
          Lớp Tri Thức Thông Minh <br />
          cho <span className="blue-accent-text">Dữ Liệu & Phần Cứng</span> của Bạn
        </h1>

        {/* Subtitle Description */}
        <p className="hero-description">
          Kết nối công cụ, dữ liệu và quy trình làm việc của bạn. Thêm trí tuệ nhân tạo đồ thị (Graph AI). Tự động hóa với ngữ cảnh thực thể, không cần viết code.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <button className="btn-primary-dark" onClick={() => setIsModalOpen(true)}>
            <span>Khám Phá Đồ Thị</span>
            <ArrowRight size={16} />
          </button>

          <button className="btn-secondary-pill" onClick={() => setIsModalOpen(true)}>
            <PlayCircle size={18} color="#3B82F6" />
            <span>Xem Cách Hoạt Động</span>
          </button>
        </div>

        {/* Interactive Search Bar */}
        <form className="hero-search-wrapper" onSubmit={handleSearch}>
          <div className="search-input-box">
            <Search size={18} color="#71717A" />
            <input 
              type="text" 
              placeholder="Tìm kiếm nút tri thức, thực thể hoặc truy vấn SPARQL/GQL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-submit-btn">
            <span>Truy Vấn</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* 3D ISOMETRIC INTELLIGENCE GRAPH CANVAS */}
        <div className="hero-isometric-wrapper">
          <HeroIsometric 
            activeNode={activeNode} 
            onSelectNode={handleSelectNodeFromSvg} 
            nodesData={nodesData} 
          />
        </div>
      </section>

      {/* 3. TRUSTED ECOSYSTEM MARQUEE */}
      <section className="marquee-section">
        <div className="marquee-label">
          Được tin dùng bởi các hệ thống & tổ chức dẫn đầu:
        </div>
        <div className="marquee-track-container">
          <div className="marquee-track">
            <div className="partner-logo"><span>glean</span></div>
            <div className="partner-logo"><span>▲ Vercel</span></div>
            <div className="partner-logo"><span>Fivetran</span></div>
            <div className="partner-logo"><span>LaunchDarkly ↗</span></div>
            <div className="partner-logo"><span>Mistral AI</span></div>
            <div className="partner-logo"><span>Flask Python</span></div>
            <div className="partner-logo"><span>PyMySQL</span></div>
            <div className="partner-logo"><span>BigQuery</span></div>

            {/* Repeated for smooth loop */}
            <div className="partner-logo"><span>glean</span></div>
            <div className="partner-logo"><span>▲ Vercel</span></div>
            <div className="partner-logo"><span>Fivetran</span></div>
            <div className="partner-logo"><span>LaunchDarkly ↗</span></div>
            <div className="partner-logo"><span>Mistral AI</span></div>
          </div>
        </div>
      </section>

      {/* 4. LIVE METRICS & BENTO SYSTEM DASHBOARD */}
      <section className="bento-dashboard-section" id="product">
        <div className="section-header">
          <div className="section-tag">
            <Activity size={16} color="#3B82F6" />
            <span>Chỉ Số Thời Gian Thực</span>
          </div>
          <h2>Quản Trị Mạng Lưới Tri Thức Data Graph</h2>
        </div>

        <div className="bento-grid">
          {/* Card 1: Main Graph Node Explorer */}
          <div className="bento-card col-8">
            <div className="card-header">
              <div className="card-title">
                <Network size={20} color="#3B82F6" />
                <span>Knowledge Graph Nodes</span>
              </div>
              <span className="badge-pill">{nodesData.length} Nodes Active</span>
            </div>

            <p className="card-desc">
              Các nút mạng dữ liệu đang kết nối trong không gian tri thức Graph_Mind:
            </p>

            <div className="nodes-chip-grid">
              {nodesData.map((node) => (
                <div 
                  key={node.id} 
                  className={`node-card-chip ${activeNode === node.id ? 'selected' : ''}`}
                  onClick={() => {
                    setActiveNode(node.id);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="chip-top">
                    <Database size={16} color="#3B82F6" />
                    <span className="chip-name">{node.name}</span>
                  </div>
                  <div className="chip-meta">Loại: <strong>{node.category}</strong></div>
                  <div className="chip-meta">Liên kết: <strong>{node.connections} edges</strong></div>
                  <div className="chip-footer-link">
                    <span>Xem thông số</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Live Realtime Metrics */}
          <div className="bento-card col-4">
            <div className="card-header">
              <div className="card-title">
                <Zap size={20} color="#3B82F6" />
                <span>Hiệu Năng Hệ Thống</span>
              </div>
            </div>

            <div className="metrics-stack">
              <div className="metric-item">
                <span className="metric-label">TỔNG SỐ NÚT (NODES)</span>
                <span className="metric-number">{metrics.total_nodes ? metrics.total_nodes.toLocaleString() : '1,284'}</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">TỔNG SỐ CẠNH (EDGES)</span>
                <span className="metric-number blue">{metrics.total_edges ? metrics.total_edges.toLocaleString() : '4,912'}</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">ĐỘ TRỄ TRUY VẤN</span>
                <span className="metric-number green">{metrics.query_latency_ms || 12} ms</span>
              </div>
            </div>
          </div>

          {/* Card 3: Backend Python Integration */}
          <div className="bento-card col-6">
            <div className="card-header">
              <div className="card-title">
                <Cpu size={20} color="#3B82F6" />
                <span>Python Flask API Microservice</span>
              </div>
              <span className="badge-pill">Port 5000</span>
            </div>
            <p className="card-desc">
              Server backend Python sẵn sàng xử lý các truy vấn đồ thị, lưu trữ thực thể và phản hồi REST/JSON endpoints.
            </p>
            <div className="code-info-box">
              <div>Endpoint: <code>http://localhost:5000/api/health</code></div>
              <div>Trạng thái: <strong className={apiStatus.connected ? 'text-green' : 'text-amber'}>{apiStatus.connected ? 'ONLINE (ACTIVE)' : 'STANDBY MODE'}</strong></div>
            </div>
          </div>

          {/* Card 4: Stitch Design System Specs */}
          <div className="bento-card col-6">
            <div className="card-header">
              <div className="card-title">
                <Layers size={20} color="#3B82F6" />
                <span>Stitch Design System (Nexora Theme)</span>
              </div>
              <span className="badge-pill">DESIGN.md</span>
            </div>
            <p className="card-desc">
              Tự động áp dụng chuẩn thiết kế với bảng màu Charcoal Ink, Electric Blue và đồ họa 3D Isometric.
            </p>

            <div className="check-list">
              <div className="check-item">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Outfit Display & JetBrains Mono Typography</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Canvas White (#F9FAFB) & Electric Blue (#3B82F6)</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Isometric 3D Intelligence Graphic Canvas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="brand-logo">
              <GraphMindLogo variant="horizontal" size={32} />
            </div>
            <p>© 2026 Graph_Mind Intelligence System. All rights reserved.</p>
          </div>

          <div className="footer-links">
            <a href="#privacy">Chính sách bảo mật</a>
            <a href="#terms">Điều khoản sử dụng</a>
            <a href="#docs">Tài liệu API</a>
          </div>
        </div>
      </footer>

      {/* 6. INSPECTOR MODAL */}
      <NodeInspectorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedNode={activeNode} 
        nodesData={nodesData}
        apiStatus={apiStatus}
      />
    </div>
  );
}

export default App;
