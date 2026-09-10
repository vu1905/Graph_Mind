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
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  GitMerge,
  ArrowUpRight,
  Sparkles,
  Clock,
  Target,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import HeroIsometric from './components/Landing/HeroIsometric.jsx';
import NodeInspectorModal from './components/Landing/NodeInspectorModal.jsx';
import ConsoleLayout from './components/DashboardLogged/ConsoleLayout.jsx';

import AuthPage from './components/Auth/AuthPage.jsx';
import { GraphMindLogo } from './assets/logo/GraphMindLogo.jsx';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'console' | 'register' | 'login'
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
      .catch(() => { });

    // 3. Fetch Nodes
    fetch('http://localhost:5000/api/nodes')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.data && Array.isArray(resData.data)) {
          setNodesData(resData.data);
        }
      })
      .catch(() => { });
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

  if (viewMode === 'register' || viewMode === 'login') {
    return (
      <AuthPage
        initialMode={viewMode}
        onBackToLanding={() => setViewMode('landing')}
        onSuccess={(user) => {
          setViewMode('console');
        }}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* 1. TOP NAVBAR HEADER (HARAVAN STYLE WITH ORIGINAL GRAPH_MIND CONTENT) */}
      <header className="navbar-header">
        <div className="navbar-container">
          {/* Left Group: Logo + Navigation Links */}
          <div className="nav-left-group">
            <a href="#top" className="brand-logo-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <GraphMindLogo variant="horizontal" size={34} />
            </a>

            <nav className="nav-menu">
              <a href="#product" className="nav-item-link">
                <span>Sản Phẩm</span>
                <ChevronDown size={14} color="#64748B" />
              </a>
              <a href="#solutions" className="nav-item-link">Giải Pháp</a>
              <a href="#integrations" className="nav-item-link">Tích Hợp</a>
              <a href="#resources" className="nav-item-link">Tài Nguyên</a>
              <a href="#pricing" className="nav-item-link">Bảng Giá</a>
              <a href="#contact" className="nav-pill-badge">
                <span>Hỗ Trợ</span>
                <ChevronRight size={13} color="#475569" />
              </a>
            </nav>
          </div>

          {/* Right Action Menu: Status + Login + Free Start */}
          <div className="nav-right-group">
            <div className="status-badge-compact" title={apiStatus.message}>
              <span className="dot"></span>
              <span>{apiStatus.connected ? 'Online' : 'Standby'}</span>
            </div>
            <button
              className="gm-btn-login haravan-btn-login"
              onClick={() => {
                setViewMode('login');
              }}
            >
              Đăng nhập
            </button>
            <button
              className="gm-btn-primary haravan-btn-primary"
              onClick={() => {
                setViewMode('register');
              }}
            >
              Bắt đầu miễn phí
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH ISOMETRIC VISUAL (ORIGINAL GRAPH_MIND CONTENT) */}
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
          <button
            className="btn-primary-dark"
            onClick={() => {
              setViewMode('register');
            }}
          >
            <span>Bắt Đầu Miễn Phí</span>
            <ArrowRight size={16} />
          </button>

          <button className="btn-secondary-pill" onClick={() => setIsModalOpen(true)}>
            <PlayCircle size={18} color="#2563EB" />
            <span>Xem Cách Hoạt Động</span>
          </button>
        </div>

        {/* Interactive Search Bar */}
        <form className="hero-search-wrapper" onSubmit={handleSearch}>
          <div className="search-input-box">
            <Search size={18} color="#64748B" />
            <input
              type="text"
              placeholder="Tìm kiếm nút tri thức, thực thể hoặc truy vấn SPARQL/GQL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-submit-btn">
            <span>Truy Vấn</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Quick query tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem', fontSize: '0.8rem', color: '#64748B' }}>
          <span>Gợi ý truy vấn:</span>
          {['Database Node', 'Knowledge Graph', 'Analytics Node', 'Identity & AI'].map((tag) => (
            <button
              key={tag}
              type="button"
              style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.78rem', color: '#334155', cursor: 'pointer' }}
              onClick={() => { setSearchQuery(tag); }}
            >
              {tag}
            </button>
          ))}
        </div>

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
          Hệ sinh thái công nghệ & chuẩn kết nối dữ liệu doanh nghiệp
        </div>
        <div className="marquee-track-container">
          <div className="marquee-track">
            <div className="partner-logo"><span>Neo4j Graph DB</span></div>
            <div className="partner-logo"><span>Qdrant Vector DB</span></div>
            <div className="partner-logo"><span>Python Flask API</span></div>
            <div className="partner-logo"><span>PyMySQL + GraphRAG</span></div>
            <div className="partner-logo"><span>Google Cloud BigQuery</span></div>
            <div className="partner-logo"><span>OpenAI & Mistral</span></div>
            <div className="partner-logo"><span>Vercel Enterprise</span></div>

            {/* Repeated for smooth loop */}
            <div className="partner-logo"><span>Neo4j Graph DB</span></div>
            <div className="partner-logo"><span>Qdrant Vector DB</span></div>
            <div className="partner-logo"><span>Python Flask API</span></div>
            <div className="partner-logo"><span>PyMySQL + GraphRAG</span></div>
            <div className="partner-logo"><span>Google Cloud BigQuery</span></div>
          </div>
        </div>
      </section>

      {/* 4. ENTERPRISE CORE SOLUTIONS (WEBTOP STYLE) */}
      <section className="corp-section-wrapper alt-bg" id="solutions">
        <div className="corp-section-container">
          <div className="section-header-corp">
            <span className="section-eyebrow">
              <Sparkles size={14} /> Giải Pháp Doanh Nghiệp Toàn Diện
            </span>
            <h2 className="section-title-corp">
              Đồng Hành Chuyển Đổi Số Tri Thức & Quản Trị Dữ Liệu
            </h2>
            <p className="section-desc-corp">
              Hệ thống Graph_Mind tối ưu từng mắt xích thông tin để doanh nghiệp vận hành mượt mà, ra quyết định chuẩn xác và phát triển bền vững.
            </p>
          </div>

          <div className="corp-solutions-grid">
            <div className="corp-solution-card">
              <div className="solution-icon-box blue">
                <Database size={24} />
              </div>
              <h3 className="solution-card-title">Hợp Nhất Đa Nguồn Dữ Liệu</h3>
              <p className="solution-card-text">
                Tự động kết nối và đồng bộ dữ liệu từ tệp PDF hợp đồng, tài liệu Word, cơ sở dữ liệu SQL và REST API về một kho dữ liệu duy nhất.
              </p>
              <div className="solution-card-tag">
                <span>Khả năng xử lý tự động</span>
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="corp-solution-card">
              <div className="solution-icon-box indigo">
                <GitMerge size={24} />
              </div>
              <h3 className="solution-card-title">Knowledge Graph & GraphRAG</h3>
              <p className="solution-card-text">
                Xây dựng liên kết ngữ nghĩa giữa các thực thể, loại bỏ triệt để ảo giác AI nhờ dẫn chứng chính xác từng điều khoản văn bản gốc.
              </p>
              <div className="solution-card-tag">
                <span>Chính xác 100% nguồn gốc</span>
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="corp-solution-card">
              <div className="solution-icon-box emerald">
                <Clock size={24} />
              </div>
              <h3 className="solution-card-title">Tra Cứu Tức Thì &lt; 15ms</h3>
              <p className="solution-card-text">
                Truy xuất chuỗi quan hệ phức tạp, lịch sử bảo lãnh và đối tác chiến lược ngay lập tức với chỉ số độ trễ cực thấp chuẩn doanh nghiệp.
              </p>
              <div className="solution-card-tag">
                <span>Tiết kiệm 85% thời gian tra cứu</span>
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="corp-solution-card">
              <div className="solution-icon-box purple">
                <ShieldCheck size={24} />
              </div>
              <h3 className="solution-card-title">Bảo Mật & Phân Quyền RBAC</h3>
              <p className="solution-card-text">
                Kiểm soát quyền truy cập theo từng phòng ban và cấp bậc quản lý, sẵn sàng triển khai On-Premise hoặc Private Cloud an toàn tuyệt đối.
              </p>
              <div className="solution-card-tag">
                <span>Tiêu chuẩn bảo mật cao cấp</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SYSTEMATIC 4-STEP PROCESS (QUY TRÌNH CHUẨN WEBTOP) */}
      <section className="corp-section-wrapper" id="process">
        <div className="section-header-corp">
          <span className="section-eyebrow">
            <Target size={14} /> Quy Trình Triển Khai Bài Bản
          </span>
          <h2 className="section-title-corp">
            4 Bước Đưa Dữ Liệu Vào Vận Hành Thực Tế
          </h2>
          <p className="section-desc-corp">
            Mỗi giai đoạn được quy chuẩn rõ ràng, minh bạch giúp doanh nghiệp nắm bắt tiến độ và tối ưu hiệu suất đầu tư ngay từ ngày đầu.
          </p>
        </div>

        <div className="process-grid-corp">
          <div className="process-card-corp">
            <div className="process-step-badge">01</div>
            <h3 className="process-title">Thu Thập & Nạp Dữ Liệu</h3>
            <p className="process-desc">
              Tiếp nhận hợp đồng, tài liệu kỹ thuật, cơ sở dữ liệu nội bộ qua pipeline tự động hoặc upload trực tiếp an toàn.
            </p>
            <span className="process-kpi">Hoàn tất trong 24h</span>
          </div>

          <div className="process-card-corp">
            <div className="process-step-badge">02</div>
            <h3 className="process-title">Trích Xuất Thực Thể</h3>
            <p className="process-desc">
              Áp dụng mô hình AI nhận diện thực thể (Entity Extraction), điều khoản cam kết, ngày hiệu lực và số tiền pháp lý.
            </p>
            <span className="process-kpi">Tự động hóa 100%</span>
          </div>

          <div className="process-card-corp">
            <div className="process-step-badge">03</div>
            <h3 className="process-title">Đồ Thị Hóa Tri Thức</h3>
            <p className="process-desc">
              Tạo lập các nút mạng (Nodes) và quan hệ liên kết (Edges) trên Neo4j kết hợp Vector Embeddings trên Qdrant.
            </p>
            <span className="process-kpi">Độ trễ truy xuất &lt; 15ms</span>
          </div>

          <div className="process-card-corp">
            <div className="process-step-badge">04</div>
            <h3 className="process-title">Bàn Giao & Vận Hành</h3>
            <p className="process-desc">
              Cung cấp Enterprise Console 6 Module cho ban điều hành, tích hợp trợ lý AI hỏi đáp nội bộ theo thời gian thực.
            </p>
            <span className="process-kpi">Hỗ trợ 24/7 dài lâu</span>
          </div>
        </div>

        {/* Proof Stats Strip */}
        <div className="proof-stats-strip" id="stats">
          <div className="proof-stat-item">
            <span className="proof-stat-number blue">85%</span>
            <span className="proof-stat-label">Tiết kiệm thời gian tra cứu & đối soát</span>
          </div>
          <div className="proof-stat-item">
            <span className="proof-stat-number green">100%</span>
            <span className="proof-stat-label">Dẫn chứng điều khoản văn bản gốc</span>
          </div>
          <div className="proof-stat-item">
            <span className="proof-stat-number blue">&lt; 15ms</span>
            <span className="proof-stat-label">Tốc độ truy vấn đồ thị quan hệ</span>
          </div>
          <div className="proof-stat-item">
            <span className="proof-stat-number green">99.98%</span>
            <span className="proof-stat-label">Thời gian sẵn sàng hoạt động hệ thống</span>
          </div>
        </div>
      </section>

      {/* 6. LIVE METRICS & BENTO SYSTEM DASHBOARD */}
      <section className="bento-dashboard-section" id="dashboard">
        <div className="section-header-corp">
          <span className="section-eyebrow">
            <Activity size={14} /> Giám Sát Thời Gian Thực
          </span>
          <h2 className="section-title-corp">
            Quản Trị Mạng Lưới Tri Thức Data Graph
          </h2>
          <p className="section-desc-corp">
            Hệ thống hiển thị trạng thái hoạt động thực tế của từng cụm máy chủ và các nút mạng tri thức trong thời gian thực.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Main Graph Node Explorer */}
          <div className="bento-card col-8">
            <div className="card-header">
              <div className="card-title">
                <Network size={20} color="#2563EB" />
                <span>Các Nút Tri Thức Đang Kết Nối (Nodes Explorer)</span>
              </div>
              <span className="badge-pill">{nodesData.length} Nodes Active</span>
            </div>

            <p className="card-desc">
              Nhấp vào từng nút mạng dưới đây để xem chi tiết thông số kết nối, thuộc tính và truy vấn mẫu:
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
                    <Database size={16} color="#2563EB" />
                    <span className="chip-name">{node.name}</span>
                  </div>
                  <div className="chip-meta">Phân loại: <strong>{node.category}</strong></div>
                  <div className="chip-meta">Mạng lưới: <strong>{node.connections} liên kết</strong></div>
                  <div className="chip-footer-link">
                    <span>Xem thông số chi tiết</span>
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
                <Zap size={20} color="#2563EB" />
                <span>Hiệu Năng Vận Hành</span>
              </div>
            </div>

            <div className="metrics-stack">
              <div className="metric-item">
                <span className="metric-label">TỔNG SỐ THỰC THỂ (NODES)</span>
                <span className="metric-number">{metrics.total_nodes ? metrics.total_nodes.toLocaleString() : '1,284'}</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">TỔNG SỐ LIÊN KẾT (EDGES)</span>
                <span className="metric-number blue">{metrics.total_edges ? metrics.total_edges.toLocaleString() : '4,912'}</span>
              </div>

              <div className="metric-item">
                <span className="metric-label">ĐỘ TRỄ TRUY VẤN (LATENCY)</span>
                <span className="metric-number green">{metrics.query_latency_ms || 12} ms</span>
              </div>
            </div>
          </div>

          {/* Card 3: Backend Python Integration */}
          <div className="bento-card col-6">
            <div className="card-header">
              <div className="card-title">
                <Cpu size={20} color="#2563EB" />
                <span>Dịch Vụ Backend Python Flask Microservice</span>
              </div>
              <span className="badge-pill">Cổng 5000</span>
            </div>
            <p className="card-desc">
              Máy chủ Flask xử lý trích xuất tri thức, phân tích cú pháp Cypher/SPARQL và phản hồi REST API an toàn.
            </p>
            <div className="code-info-box">
              <div>Đường dẫn: <code>http://localhost:5000/api/health</code></div>
              <div>Trạng thái: <strong className={apiStatus.connected ? 'text-green' : 'text-amber'}>{apiStatus.connected ? 'KẾT NỐI THÀNH CÔNG (ACTIVE)' : 'CHẾ ĐỘ DỰ PHÒNG (STANDBY)'}</strong></div>
            </div>
          </div>

          {/* Card 4: Enterprise Console Specs */}
          <div className="bento-card col-6">
            <div className="card-header">
              <div className="card-title">
                <Layers size={20} color="#2563EB" />
                <span>Bộ Công Cụ Quản Trị Enterprise Console</span>
              </div>
              <span className="badge-pill">6 Phân Hệ</span>
            </div>
            <p className="card-desc">
              Giao diện điều hành chuyên biệt hỗ trợ đối soát hợp đồng, tìm kiếm ngữ nghĩa và cấu hình AI:
            </p>

            <div className="check-list">
              <div className="check-item">
                <CheckCircle2 size={16} color="#059669" />
                <span>Tra Cứu Doanh Nghiệp (Enterprise Search & GraphRAG)</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={16} color="#059669" />
                <span>Quản Lý Nguồn Dữ Liệu & ETL Pipeline Tự Động</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={16} color="#059669" />
                <span>Giám Sát Vận Hành LLMOps & Độ Trễ Hệ Thống</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-CONVERTING CORPORATE CTA BANNER */}
      <section className="corp-cta-section" id="contact">
        <div className="corp-cta-card">
          <div className="corp-cta-content">
            <h2 className="corp-cta-title">
              Sẵn Sàng Nâng Tầm Dữ Liệu Doanh Nghiệp Của Bạn?
            </h2>
            <p className="corp-cta-desc">
              Trải nghiệm ngay bộ công cụ điều hành Graph_Mind hoặc đăng ký buổi tư vấn trực tiếp cùng chuyên gia giải pháp dữ liệu của chúng tôi.
            </p>
          </div>
          <div className="corp-cta-actions">
            <button
              className="corp-cta-btn-primary"
              onClick={() => {
                setViewMode('register');
              }}
            >
              <span>Bắt Đầu Miễn Phí</span>
              <ArrowRight size={16} />
            </button>
            <button
              className="corp-cta-btn-secondary"
              style={{ cursor: 'pointer' }}
              onClick={() => setViewMode('console')}
            >
              Vào Enterprise Console
            </button>
          </div>
        </div>
      </section>

      {/* 8. CORPORATE FOOTER (WEBTOP STYLE) */}
      <footer className="footer-corporate">
        <div className="footer-corp-grid">
          <div className="footer-brand-col">
            <GraphMindLogo variant="horizontal" size={32} />
            <p>
              Hệ thống quản trị mạng lưới tri thức doanh nghiệp chuẩn SEO, tích hợp AI GraphRAG và cơ sở dữ liệu đồ thị hàng đầu.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Giải Pháp</h4>
            <ul className="footer-links-list">
              <li><a href="#solutions">Knowledge Graph</a></li>
              <li><a href="#solutions">Đối soát hợp đồng</a></li>
              <li><a href="#solutions">Vector Hybrid Search</a></li>
              <li><a href="#solutions">Bảo mật RBAC</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Tài Nguyên</h4>
            <ul className="footer-links-list">
              <li><a href="#process">Quy trình triển khai</a></li>
              <li><a href="#dashboard">Tài liệu API REST</a></li>
              <li><a href="#stats">Báo cáo hiệu năng</a></li>
              <li><a href="#contact">Chính sách bảo mật</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Liên Hệ Trực Tiếp</h4>
            <div className="footer-contact-item">
              <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#2563EB' }} />
              <span>Ngũ Hành Sơn, Đà Nẵng</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} style={{ flexShrink: 0, color: '#2563EB' }} />
              <span>0931998532 (Tư vấn 24/7)</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} style={{ flexShrink: 0, color: '#2563EB' }} />
              <span>tranvietanhvu2005@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>
            © 2026 Graph_Mind Enterprise System.
          </div>
          <div className="footer-bottom-links">
            <a href="#terms">Điều khoản dịch vụ</a>
            <a href="#privacy">Chính sách bảo mật</a>
            <a href="#cookies">Cài đặt Cookie</a>
          </div>
        </div>
      </footer>

      {/* 9. INSPECTOR MODAL */}
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
