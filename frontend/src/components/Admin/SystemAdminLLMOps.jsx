import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  Cpu,
  DollarSign,
  Layers,
  CheckCircle,
  AlertCircle,
  Key,
  UserPlus,
  Settings,
  Activity,
  Zap,
  Lock,
  Database,
  Server,
  RefreshCw,
  TrendingUp,
  BarChart2,
  GitBranch,
  Globe,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Network,
  ChevronRight,
  Circle,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000';

/* ─────────────────────────────────────────────
   Toggle Switch
───────────────────────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <button onClick={onChange} className={`lp-toggle ${checked ? 'on' : 'off'}`}>
    <span className="lp-toggle-thumb" />
  </button>
);

/* ─────────────────────────────────────────────
   Status Dot
───────────────────────────────────────────── */
const Dot = ({ ok }) => <span className={`lp-dot ${ok ? 'green' : 'amber'}`} />;

export const SystemAdminLLMOps = () => {
  /* ── state ─────────────────────────────── */
  const [refreshing, setRefreshing]   = useState(false);
  const [healthData, setHealthData]   = useState(null);
  const [overview,   setOverview]     = useState(null);
  const [activeSection, setActiveSection] = useState(null); // null = landing, 'infra'|'rbac'|'users'|'llmops'

  const [rbacRules, setRbacRules] = useState([
    { role: 'Ban Giám Đốc',         icon: '👑', erp: true,  legal: true,  sop: true,  llm: true  },
    { role: 'Nhân Viên Kinh Doanh', icon: '📊', erp: true,  legal: false, sop: true,  llm: false },
    { role: 'Kế Toán & Tài Chính',  icon: '💰', erp: true,  legal: true,  sop: true,  llm: false },
    { role: 'AI Ops / Developer',   icon: '🤖', erp: false, legal: false, sop: true,  llm: true  },
  ]);

  const users = [
    { id: 'USR-01', name: 'Trần Kim Sanh',     email: 'sanhtk@graphmind.ai',  dept: 'Ban Giám Đốc',      role: 'Super Admin',   avatar: 'TK', status: 'Active' },
    { id: 'USR-02', name: 'Trần Thị Ngọc Anh', email: 'ngocanh@graphmind.ai', dept: 'IT & AI Engineering',role: 'AI Ops Admin',  avatar: 'NA', status: 'Active' },
    { id: 'USR-03', name: 'Nguyễn Văn Minh',   email: 'minhnv@graphmind.ai',  dept: 'Kinh Doanh',        role: 'Sales Lead',    avatar: 'NM', status: 'Active' },
    { id: 'USR-04', name: 'Lê Thị Thu Hà',     email: 'haltt@graphmind.ai',   dept: 'Kế Toán',           role: 'Finance Admin', avatar: 'TH', status: 'Active' },
  ];

  const llm = {
    model:    'Qwen2.5-7B-Instruct (Unsloth 4-bit)',
    tokens:   '4,850,200',
    latency:  '184 ms',
    gpu:      'Kaggle T4 x2',
    ckpt:     'v1.4-unsloth-lora',
    cost:     '$14.20',
    dataset:  '2,850 Q&A Pairs',
    accuracy: '94.2%',
    loss:     '0.0312',
  };

  /* ── data fetch ────────────────────────── */
  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [h, m] = await Promise.allSettled([
        fetch(`${API_BASE}/api/health`).then(r => r.json()),
        fetch(`${API_BASE}/api/metrics`).then(r => r.json()),
      ]);
      if (h.status === 'fulfilled') setHealthData(h.value);
      const mv = m.status === 'fulfilled' ? m.value : {};
      setOverview({
        nodes:   mv.total_nodes          || 491200,
        edges:   mv.total_edges          || 884000,
        vectors: mv.vector_count         || 128400,
        latency: mv.query_latency_ms     || 12,
        qps:     mv.active_queries_per_sec|| 340,
        uptime:  mv.uptime               || '99.98%',
      });
    } catch (_) {}
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    const t = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(t);
  }, []);

  const neo4j  = healthData?.databases?.neo4j?.http_7474  === 'ONLINE';
  const qdrant = healthData?.databases?.qdrant?.rest_6333 === 'ONLINE';

  /* activity log items for hero card */
  const activityLog = [
    { time: '23:08', type: 'ok',   msg: 'Neo4j: 491,200 nodes loaded successfully' },
    { time: '23:05', type: 'ok',   msg: 'Qdrant: 128,400 vectors indexed (HNSW)' },
    { time: '22:58', type: 'warn', msg: 'Query latency spike: 184ms → monitoring' },
    { time: '22:45', type: 'ok',   msg: 'LLMOps: Fine-tune checkpoint v1.4 saved' },
    { time: '22:30', type: 'ok',   msg: 'RBAC sync: 4 roles, 4 users — JWT refreshed' },
  ];

  /* Feature cards data */
  const features = [
    {
      id: 'infra',
      icon: Server,
      color: '#3B82F6',
      bg: '#EFF6FF',
      tag: 'Docker Infrastructure',
      title: 'Hạ Tầng Database & Docker Compose',
      desc: 'Quản lý toàn bộ container Neo4j Graph DB và Qdrant Vector DB được khai báo trong docker-compose.yml. Giám sát port, volume, plugin và bộ nhớ RAM theo thời gian thực.',
      stats: [
        { label: 'Services',  value: '2' },
        { label: 'Neo4j',     value: '5.18.0' },
        { label: 'Qdrant',    value: 'v1.8.2' },
      ],
    },
    {
      id: 'rbac',
      icon: Lock,
      color: '#8B5CF6',
      bg: '#F5F3FF',
      tag: 'Access Control',
      title: 'Kiểm Soát & Quản Lý Phân Quyền RBAC',
      desc: 'Cấu hình chi tiết ma trận phân quyền granular RBAC. Kiểm soát phạm vi truy vấn dữ liệu ERP, hợp đồng pháp lý, SOP nội bộ và quyền giám sát LLMOps theo từng vai trò.',
      stats: [
        { label: 'Vai trò',   value: '4' },
        { label: 'Modules',   value: '4' },
        { label: 'Auth',      value: 'JWT' },
      ],
    },
    {
      id: 'llmops',
      icon: Cpu,
      color: '#10B981',
      bg: '#ECFDF5',
      tag: 'AI Operations',
      title: 'Tư Vấn AI Yêu Cầu Thống Nhất LLMOps',
      desc: 'Theo dõi phiên huấn luyện Unsloth, checkpoint HuggingFace và hiệu năng đáp ứng câu hỏi GraphRAG. Giám sát chi phí GPU, token throughput và độ trễ pipeline 5-bước.',
      stats: [
        { label: 'Model',     value: 'Qwen2.5' },
        { label: 'Accuracy',  value: '94.2%' },
        { label: 'Cost',      value: '$14.20' },
      ],
    },
  ];

  /* Pipeline steps */
  const pipeline = [
    { n: '01', label: 'Tiếp Nhận Truy Vấn', desc: 'NLP + Intent Classification',     color: '#3B82F6', ms: '12ms'  },
    { n: '02', label: 'Vector Search',       desc: 'Qdrant HNSW Cosine Search',       color: '#8B5CF6', ms: '28ms'  },
    { n: '03', label: 'Graph Traversal',     desc: 'Neo4j Cypher Relationship Fetch', color: '#10B981', ms: '45ms'  },
    { n: '04', label: 'LLM Generation',      desc: 'Qwen2.5 Fine-tuned Response',     color: '#F59E0B', ms: '77ms'  },
  ];

  /* ── DETAIL PANELS ─────────────────────── */
  if (activeSection === 'infra') return (
    <InfraPanel
      neo4j={neo4j} qdrant={qdrant} overview={overview}
      onBack={() => setActiveSection(null)}
    />
  );
  if (activeSection === 'rbac') return (
    <RbacPanel
      rbacRules={rbacRules} setRbacRules={setRbacRules}
      onBack={() => setActiveSection(null)}
    />
  );
  if (activeSection === 'users') return (
    <UsersPanel users={users} onBack={() => setActiveSection(null)} />
  );
  if (activeSection === 'llmops') return (
    <LlmOpsPanel llm={llm} onBack={() => setActiveSection(null)} />
  );

  /* ── LANDING VIEW ──────────────────────── */
  return (
    <div className="lp-root">

      {/* ══ 1. HERO SECTION ══════════════════ */}
      <section className="lp-hero">
        {/* LEFT — headline */}
        <div className="lp-hero-left">
          <div className="lp-module-pill">
            <span className="lp-pill-dot" />
            Module 6 · System Admin & LLMOps
          </div>
          <h1 className="lp-hero-title">
            Quản Trị Hệ Thống,<br />
            RBAC &amp; Giám Sát<br />
            <span className="lp-accent">Infrastructure</span>
          </h1>
          <p className="lp-hero-desc">
            Giám sát hạ tầng Docker Container, phân quyền RBAC granular và đo lường chi phí AI — tất cả trong một bảng điều khiển thống nhất.
          </p>

          {/* Status pills */}
          <div className="lp-status-row">
            <div className="lp-status-pill">
              <Dot ok={neo4j} />
              <span>Neo4j {neo4j ? 'Online' : 'Standby'}</span>
            </div>
            <div className="lp-status-pill">
              <Dot ok={qdrant} />
              <span>Qdrant {qdrant ? 'Online' : 'Standby'}</span>
            </div>
            <div className="lp-status-pill">
              <Dot ok={!!overview} />
              <span>Flask API Active</span>
            </div>
          </div>

          {/* CTA row */}
          <div className="lp-hero-cta">
            <button className="lp-btn-primary" onClick={() => setActiveSection('infra')}>
              Xem Hạ Tầng <ArrowRight size={15} />
            </button>
            <button className="lp-btn-ghost" onClick={() => fetchData(true)}>
              <RefreshCw size={14} className={refreshing ? 'lp-spin' : ''} />
              {refreshing ? 'Đang tải...' : 'Làm Mới'}
            </button>
          </div>
        </div>

        {/* RIGHT — activity log card */}
        <div className="lp-hero-right">
          <div className="lp-activity-card">
            <div className="lp-activity-header">
              <div className="lp-activity-title-row">
                <div className="lp-activity-icon-box">
                  <Activity size={16} color="#3B82F6" />
                </div>
                <div>
                  <div className="lp-activity-title">System Activity Log</div>
                  <div className="lp-activity-sub">Cập nhật theo thời gian thực</div>
                </div>
              </div>
              <div className="lp-live-badge">
                <span className="lp-live-dot" />
                LIVE
              </div>
            </div>

            <div className="lp-activity-list">
              {activityLog.map((a, i) => (
                <div key={i} className="lp-activity-item">
                  <div className={`lp-activity-dot ${a.type}`} />
                  <div className="lp-activity-content">
                    <span className="lp-activity-msg">{a.msg}</span>
                    <span className="lp-activity-time">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lp-activity-footer">
              <span>Độ trễ GraphRAG:</span>
              <strong className="lp-amber">{overview?.latency ?? '—'} ms</strong>
              <span className="lp-dot-sep">·</span>
              <span>Uptime:</span>
              <strong className="lp-green">{overview?.uptime ?? '99.98%'}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. FEATURE CARDS 3-COL ═══════════ */}
      <section className="lp-features-section">
        <div className="lp-section-eyebrow">
          <BarChart2 size={14} color="#3B82F6" />
          <span>Các Module Chức Năng</span>
        </div>
        <h2 className="lp-section-title">Quản Trị Toàn Diện Hệ Thống</h2>

        <div className="lp-feature-grid">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.id} className="lp-feature-card">
                <div className="lp-feature-icon-box" style={{ background: f.bg, color: f.color }}>
                  <Icon size={22} />
                </div>
                <div className="lp-feature-tag" style={{ color: f.color }}>{f.tag}</div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>

                {/* mini stats */}
                <div className="lp-feature-stats">
                  {f.stats.map((s, i) => (
                    <div key={i} className="lp-feature-stat">
                      <span className="lp-fstat-val" style={{ color: f.color }}>{s.value}</span>
                      <span className="lp-fstat-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="lp-feature-link"
                  style={{ color: f.color }}
                  onClick={() => setActiveSection(f.id)}
                >
                  Xem chi tiết <ChevronRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ 3. BENTO METRICS GRID ════════════ */}
      <section className="lp-bento-section">
        <div className="lp-section-eyebrow">
          <Activity size={14} color="#3B82F6" />
          <span>Chỉ Số Thời Gian Thực</span>
        </div>
        <h2 className="lp-section-title">Dữ Liệu Sống Từ Database</h2>

        <div className="lp-bento-grid">

          {/* Wide card — DB live metrics */}
          <div className="lp-bento-wide">
            <div className="lp-bento-wide-header">
              <div>
                <div className="lp-bento-tag">
                  <Network size={13} />
                  Docker Container Services
                </div>
                <h3 className="lp-bento-title">Hiệu Năng Graph &amp; Vector Database</h3>
                <p className="lp-bento-desc">
                  Số liệu được lấy trực tiếp từ <code>GET /api/metrics</code> — cập nhật mỗi 30 giây.
                </p>
              </div>
              <div className="lp-bento-badge-row">
                <span className={`lp-bento-badge ${neo4j ? 'green' : 'amber'}`}>
                  <Dot ok={neo4j} /> neo4j_db
                </span>
                <span className={`lp-bento-badge ${qdrant ? 'green' : 'amber'}`}>
                  <Dot ok={qdrant} /> qdrant_db
                </span>
              </div>
            </div>

            <div className="lp-metrics-row">
              <div className="lp-metric-block">
                <span className="lp-metric-lbl">NEO4J NODES</span>
                <span className="lp-metric-num blue">{overview ? overview.nodes.toLocaleString() : '—'}</span>
                <span className="lp-metric-sub">Graph Entities</span>
              </div>
              <div className="lp-metric-divider" />
              <div className="lp-metric-block">
                <span className="lp-metric-lbl">QDRANT VECTORS</span>
                <span className="lp-metric-num purple">{overview ? overview.vectors.toLocaleString() : '—'}</span>
                <span className="lp-metric-sub">1536-dim Cosine</span>
              </div>
              <div className="lp-metric-divider" />
              <div className="lp-metric-block">
                <span className="lp-metric-lbl">QUERY / GIÂY</span>
                <span className="lp-metric-num green">{overview?.qps ?? '—'}</span>
                <span className="lp-metric-sub">GraphRAG QPS</span>
              </div>
              <div className="lp-metric-divider" />
              <div className="lp-metric-block">
                <span className="lp-metric-lbl">AVG LATENCY</span>
                <span className="lp-metric-num amber">{overview?.latency ?? '—'} ms</span>
                <span className="lp-metric-sub">Context Fusion</span>
              </div>
            </div>

            <button className="lp-wide-link" onClick={() => setActiveSection('infra')}>
              Xem chi tiết hạ tầng Docker <ArrowRight size={14} />
            </button>
          </div>

          {/* Side card — RBAC quick */}
          <div className="lp-bento-side">
            <div className="lp-bento-tag" style={{ color: '#8B5CF6' }}>
              <Shield size={13} />
              Phân Quyền RBAC
            </div>
            <h3 className="lp-bento-title" style={{ fontSize: '1rem' }}>Ma Trận Truy Cập</h3>

            <div className="lp-rbac-mini">
              {rbacRules.map((r, i) => (
                <div key={i} className="lp-rbac-mini-row">
                  <span className="lp-rbac-emoji">{r.icon}</span>
                  <span className="lp-rbac-role-name">{r.role}</span>
                  <div className="lp-rbac-dots-row">
                    {[r.erp, r.legal, r.sop, r.llm].map((v, j) => (
                      <span
                        key={j}
                        className={`lp-rbac-mini-dot ${v ? 'on' : 'off'}`}
                        title={['ERP','Legal','SOP','LLMOps'][j]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="lp-rbac-legend-mini">
              <span className="lp-rbac-mini-dot on" /> ERP &nbsp;
              <span className="lp-rbac-mini-dot on" style={{ background:'#8B5CF6' }} /> Legal &nbsp;
              <span className="lp-rbac-mini-dot on" style={{ background:'#F59E0B' }} /> SOP &nbsp;
              <span className="lp-rbac-mini-dot on" style={{ background:'#EF4444' }} /> LLMOps
            </div>

            <button className="lp-feature-link" style={{ color: '#8B5CF6', marginTop: '1rem' }} onClick={() => setActiveSection('rbac')}>
              Quản lý phân quyền <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* ══ 4. PIPELINE / HOW IT WORKS ═══════ */}
      <section className="lp-pipeline-section">
        <div className="lp-section-eyebrow">
          <GitBranch size={14} color="#3B82F6" />
          <span>GraphRAG Pipeline</span>
        </div>
        <h2 className="lp-section-title">Quy Trình Xử Lý AI 4 Bước</h2>
        <p className="lp-section-sub">
          Mỗi câu hỏi được xử lý qua pipeline đa tầng — từ NLP, Vector Search, Graph Traversal đến LLM Generation.
        </p>

        <div className="lp-pipeline-grid">
          {pipeline.map((p, i) => (
            <div key={i} className="lp-pipeline-card">
              <div className="lp-pipeline-num" style={{ color: p.color, background: `${p.color}15` }}>
                {p.n}
              </div>
              <h4 className="lp-pipeline-label">{p.label}</h4>
              <p className="lp-pipeline-desc">{p.desc}</p>
              <div className="lp-pipeline-ms" style={{ color: p.color }}>
                <Zap size={13} /> {p.ms}
              </div>
            </div>
          ))}
        </div>

        <div className="lp-pipeline-total-bar">
          <span>Tổng độ trễ pipeline:</span>
          <strong style={{ color: '#3B82F6' }}>~184 ms / query</strong>
          <span className="lp-dot-sep">·</span>
          <span>Model:</span>
          <strong>{llm.model}</strong>
        </div>
      </section>

      {/* ══ 5. LLMOPS QUICK ROW ══════════════ */}
      <section className="lp-llmops-section">
        <div className="lp-llmops-row">
          <div className="lp-llmops-left">
            <div className="lp-section-eyebrow">
              <Cpu size={14} color="#10B981" />
              <span>LLMOps Telemetry</span>
            </div>
            <h2 className="lp-section-title" style={{ textAlign: 'left' }}>
              Bảng Điều Khiển<br /> Chi Phí &amp; Hiệu Năng AI
            </h2>
            <p className="lp-section-sub" style={{ textAlign: 'left' }}>
              Theo dõi checkpoint Unsloth, GPU session, token throughput và ước tính chi phí vận hành hàng tháng.
            </p>
            <div className="lp-llmops-chips">
              <div className="lp-llmops-chip">
                <Key size={13} color="#10B981" />
                <span>{llm.ckpt}</span>
              </div>
              <div className="lp-llmops-chip">
                <Zap size={13} color="#F59E0B" />
                <span>{llm.gpu}</span>
              </div>
              <div className="lp-llmops-chip">
                <DollarSign size={13} color="#3B82F6" />
                <span>{llm.cost} / tháng</span>
              </div>
            </div>
            <button className="lp-btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setActiveSection('llmops')}>
              Xem LLMOps Dashboard <ArrowRight size={15} />
            </button>
          </div>

          <div className="lp-llmops-right">
            {[
              { label: 'Tổng Tokens Đã Xử Lý',  value: llm.tokens,   color: '#3B82F6', icon: Terminal },
              { label: 'Độ Chính Xác (Eval)',     value: llm.accuracy, color: '#10B981', icon: CheckCircle2 },
              { label: 'Training Loss',           value: llm.loss,     color: '#8B5CF6', icon: TrendingUp },
              { label: 'Avg Response Latency',    value: llm.latency,  color: '#F59E0B', icon: Zap },
              { label: 'Fine-tune Dataset',       value: llm.dataset,  color: '#EF4444', icon: Database },
              { label: 'Estimated Monthly Cost',  value: llm.cost,     color: '#0A6E78', icon: DollarSign },
            ].map((m, i) => {
              const Ic = m.icon;
              return (
                <div key={i} className="lp-llm-stat-card">
                  <div className="lp-llm-stat-icon" style={{ background: `${m.color}15`, color: m.color }}>
                    <Ic size={16} />
                  </div>
                  <div>
                    <div className="lp-llm-stat-label">{m.label}</div>
                    <div className="lp-llm-stat-value" style={{ color: m.color }}>{m.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 6. USERS QUICK ═══════════════════ */}
      <section className="lp-users-section">
        <div className="lp-users-header">
          <div>
            <div className="lp-section-eyebrow">
              <Users size={14} color="#3B82F6" />
              <span>Người Dùng Doanh Nghiệp</span>
            </div>
            <h2 className="lp-section-title" style={{ textAlign: 'left', marginBottom: 0 }}>
              Tài Khoản &amp; Phân Quyền
            </h2>
          </div>
          <button className="lp-btn-secondary" onClick={() => setActiveSection('users')}>
            <UserPlus size={14} /> Quản Lý Người Dùng
          </button>
        </div>

        <div className="lp-users-grid">
          {users.map(u => (
            <div key={u.id} className="lp-user-card">
              <div className="lp-user-avatar">{u.avatar}</div>
              <div className="lp-user-info">
                <div className="lp-user-name">{u.name}</div>
                <div className="lp-user-email">{u.email}</div>
              </div>
              <div className="lp-user-right">
                <span className="lp-user-role">{u.role}</span>
                <div className="lp-user-dept">{u.dept}</div>
              </div>
              <span className="lp-user-status">
                <CheckCircle size={12} /> {u.status}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

/* ══════════════════════════════════════════════
   DETAIL PANELS
══════════════════════════════════════════════ */
const BackBtn = ({ onBack }) => (
  <button className="lp-back-btn" onClick={onBack}>
    ← Quay lại Tổng Quan
  </button>
);

/* ── Infrastructure Panel ──────────────────── */
const InfraPanel = ({ neo4j, qdrant, overview, onBack }) => (
  <div className="lp-root">
    <BackBtn onBack={onBack} />
    <div className="lp-detail-header">
      <div className="lp-detail-icon-box blue"><Server size={22} /></div>
      <div>
        <div className="module-badge">Hạ Tầng Database</div>
        <h2 className="module-title">Docker Container Services</h2>
        <p className="module-subtitle">Cơ sở hạ tầng khai báo trong <code>docker-compose.yml</code></p>
      </div>
    </div>

    <div className="lp-infra-pair">
      {/* Neo4j */}
      <div className="lp-infra-card" style={{ borderTop: '3px solid #018BFF' }}>
        <div className="lp-infra-card-top">
          <div className="lp-infra-icon" style={{ background: '#EFF6FF', color: '#018BFF' }}>
            <Database size={20} />
          </div>
          <div>
            <div className="lp-infra-name">neo4j_db</div>
            <div className="lp-infra-img">neo4j:5.18.0</div>
          </div>
          <span className={`lp-badge ${neo4j ? 'green' : 'amber'}`} style={{ marginLeft: 'auto' }}>
            {neo4j ? '● Healthy' : '● Standby'}
          </span>
        </div>
        <p className="lp-infra-role">Graph Database Engine — Knowledge Graph Storage</p>
        <div className="lp-infra-meta">
          {[
            ['HTTP Port',    '7474:7474'],
            ['Bolt Port',    '7687:7687'],
            ['Volume Data',  './neo4j_data:/data'],
            ['Import Vol',   './neo4j_import:/import'],
            ['Plugins',      'APOC (apoc_export, apoc_import)'],
            ['RAM Usage',    '1.4 GB / 8 GB'],
          ].map(([l, v]) => (
            <div key={l} className="lp-infra-meta-row">
              <span className="lp-meta-lbl">{l}</span>
              <code className="lp-meta-val">{v}</code>
            </div>
          ))}
        </div>
        <div className="lp-infra-stats">
          {[
            { n: overview?.nodes?.toLocaleString() ?? '491,200', l: 'Nodes', c: '#3B82F6' },
            { n: overview?.edges?.toLocaleString() ?? '884,000', l: 'Edges', c: '#8B5CF6' },
            { n: '5', l: 'Labels', c: '#10B981' },
          ].map(s => (
            <div key={s.l} className="lp-infra-stat">
              <span style={{ color: s.c, fontSize: '1.4rem', fontWeight: 800, fontFamily: 'monospace' }}>{s.n}</span>
              <span className="lp-infra-stat-lbl">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Qdrant */}
      <div className="lp-infra-card" style={{ borderTop: '3px solid #FF3355' }}>
        <div className="lp-infra-card-top">
          <div className="lp-infra-icon" style={{ background: '#FFF1F2', color: '#FF3355' }}>
            <Layers size={20} />
          </div>
          <div>
            <div className="lp-infra-name">qdrant_db</div>
            <div className="lp-infra-img">qdrant/qdrant:v1.8.2</div>
          </div>
          <span className={`lp-badge ${qdrant ? 'green' : 'amber'}`} style={{ marginLeft: 'auto' }}>
            {qdrant ? '● Healthy' : '● Standby'}
          </span>
        </div>
        <p className="lp-infra-role">Dense Vector Search Engine — HNSW Cosine Index</p>
        <div className="lp-infra-meta">
          {[
            ['REST Port',   '6333:6333'],
            ['gRPC Port',   '6334:6334'],
            ['Volume',      './qdrant_data:/qdrant/storage'],
            ['Index Type',  'HNSW Cosine Distance'],
            ['Vector Dim',  '1536-dim'],
            ['RAM Usage',   '840 MB / 4 GB'],
          ].map(([l, v]) => (
            <div key={l} className="lp-infra-meta-row">
              <span className="lp-meta-lbl">{l}</span>
              <code className="lp-meta-val">{v}</code>
            </div>
          ))}
        </div>
        <div className="lp-infra-stats">
          {[
            { n: overview?.vectors?.toLocaleString() ?? '128,400', l: 'Vectors', c: '#10B981' },
            { n: '3', l: 'Collections', c: '#F59E0B' },
            { n: '1536', l: 'Dimensions', c: '#3B82F6' },
          ].map(s => (
            <div key={s.l} className="lp-infra-stat">
              <span style={{ color: s.c, fontSize: '1.4rem', fontWeight: 800, fontFamily: 'monospace' }}>{s.n}</span>
              <span className="lp-infra-stat-lbl">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Collections table */}
    <div className="panel-box">
      <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Qdrant Collections</h3>
      <table className="custom-table">
        <thead><tr><th>Collection</th><th>Vectors</th><th>Dimension</th><th>Distance</th><th>Nguồn</th><th>Status</th></tr></thead>
        <tbody>
          {[
            { name: 'enterprise_knowledge', v: 48200, src: 'AdventureWorks ERP + SOP' },
            { name: 'cuad_contracts',       v: 52100, src: 'CUAD Legal Contracts' },
            { name: 'sales_embeddings',     v: 28100, src: 'Sales Q&A Fine-tune' },
          ].map(c => (
            <tr key={c.name}>
              <td><code>{c.name}</code></td>
              <td><strong>{c.v.toLocaleString()}</strong></td>
              <td>1536</td><td>Cosine</td><td>{c.src}</td>
              <td><span className="status-badge success"><CheckCircle size={12} /> Active</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ── RBAC Panel ────────────────────────────── */
const RbacPanel = ({ rbacRules, setRbacRules, onBack }) => {
  const toggle = (i, f) => setRbacRules(prev => prev.map((r, idx) => idx === i ? { ...r, [f]: !r[f] } : r));
  return (
    <div className="lp-root">
      <BackBtn onBack={onBack} />
      <div className="lp-detail-header">
        <div className="lp-detail-icon-box purple"><Lock size={22} /></div>
        <div>
          <div className="module-badge">Phân Quyền</div>
          <h2 className="module-title">Ma Trận RBAC Granular</h2>
          <p className="module-subtitle">Cấu hình phạm vi truy vấn dữ liệu GraphRAG theo từng Vai Trò</p>
        </div>
        <button className="lp-btn-primary" style={{ marginLeft: 'auto' }}>Lưu Cấu Hình</button>
      </div>
      <div className="panel-box">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: 200 }}>Vai Trò</th>
              <th><div className="lp-col-h"><BarChart2 size={13} color="#3B82F6" /> Dữ Liệu ERP</div></th>
              <th><div className="lp-col-h"><Lock size={13} color="#8B5CF6" /> Pháp Lý</div></th>
              <th><div className="lp-col-h"><Settings size={13} color="#F59E0B" /> SOP</div></th>
              <th><div className="lp-col-h"><Cpu size={13} color="#EF4444" /> LLMOps</div></th>
            </tr>
          </thead>
          <tbody>
            {rbacRules.map((r, i) => (
              <tr key={i}>
                <td><span className="lp-role-cell">{r.icon} <strong>{r.role}</strong></span></td>
                <td className="lp-tc"><Toggle checked={r.erp}   onChange={() => toggle(i, 'erp')}   /></td>
                <td className="lp-tc"><Toggle checked={r.legal} onChange={() => toggle(i, 'legal')} /></td>
                <td className="lp-tc"><Toggle checked={r.sop}   onChange={() => toggle(i, 'sop')}   /></td>
                <td className="lp-tc"><Toggle checked={r.llm}   onChange={() => toggle(i, 'llm')}   /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lp-warn-bar">
          <AlertTriangle size={14} color="#D97706" />
          Thay đổi sẽ áp dụng ngay — JWT token được refresh tự động cho tất cả phiên đang hoạt động.
        </div>
      </div>
    </div>
  );
};

/* ── Users Panel ───────────────────────────── */
const UsersPanel = ({ users, onBack }) => (
  <div className="lp-root">
    <BackBtn onBack={onBack} />
    <div className="lp-detail-header">
      <div className="lp-detail-icon-box teal"><Users size={22} /></div>
      <div>
        <div className="module-badge">Người Dùng</div>
        <h2 className="module-title">Tài Khoản Doanh Nghiệp</h2>
        <p className="module-subtitle">Quản lý định danh OAuth 2.0 và JWT Token</p>
      </div>
      <button className="lp-btn-secondary" style={{ marginLeft: 'auto' }}>
        <UserPlus size={14} /> Thêm Người Dùng
      </button>
    </div>
    <div className="panel-box">
      <table className="custom-table">
        <thead>
          <tr><th>Người Dùng</th><th>Email</th><th>Phòng Ban</th><th>Vai Trò</th><th>Trạng Thái</th><th></th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="lp-user-avatar sm">{u.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{u.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontFamily: 'monospace' }}>{u.id}</div>
                  </div>
                </div>
              </td>
              <td><code style={{ fontSize: '0.8rem' }}>{u.email}</code></td>
              <td>{u.dept}</td>
              <td><span className="lp-user-role">{u.role}</span></td>
              <td><span className="status-badge success"><CheckCircle size={11} /> {u.status}</span></td>
              <td><button className="outline-btn small"><Settings size={13} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
        {[['Key','OAuth 2.0 Authentication','#0A6E78'], ['Lock','JWT Bearer Token (exp: 8h)','#8B5CF6'], ['Globe','HTTPS / TLS 1.3','#3B82F6']].map(([, label, color]) => (
          <span key={label} style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', padding:'0.3rem 0.8rem', border:'1px solid #E2E8F0', borderRadius:'2rem', fontSize:'0.78rem', fontWeight:600, color, background:'#F8FAFC' }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ── LLMOps Panel ──────────────────────────── */
const LlmOpsPanel = ({ llm, onBack }) => (
  <div className="lp-root">
    <BackBtn onBack={onBack} />
    <div className="lp-detail-header">
      <div className="lp-detail-icon-box green"><Cpu size={22} /></div>
      <div>
        <div className="module-badge">LLMOps</div>
        <h2 className="module-title">Fine-Tuning & Checkpoint Pipeline</h2>
        <p className="module-subtitle">Theo dõi phiên huấn luyện Unsloth và hiệu năng đáp ứng câu hỏi GraphRAG</p>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
      <div className="panel-box">
        <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>Model & Checkpoint</h3>
        <code style={{ display: 'block', padding: '0.85rem', background: '#18181B', color: '#E2E8F0', borderRadius: '0.75rem', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.6 }}>
          {llm.model}
        </code>
        {[['Checkpoint', llm.ckpt], ['GPU Session', llm.gpu], ['Dataset', llm.dataset], ['Security', 'HTTPS / TLS 1.3 + JWT']].map(([k, v]) => (
          <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.6rem 0', borderBottom:'1px solid #F1F5F9', fontSize:'0.88rem' }}>
            <span style={{ color: '#71717A', fontWeight: 600 }}>{k}</span>
            <span style={{ fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="panel-box">
        <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>Telemetry Metrics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {[
            ['Tổng Tokens',  llm.tokens,   '#3B82F6'],
            ['Accuracy',     llm.accuracy, '#10B981'],
            ['Training Loss',llm.loss,     '#8B5CF6'],
            ['Avg Latency',  llm.latency,  '#F59E0B'],
            ['Cost / Month', llm.cost,     '#EF4444'],
            ['GPU',          llm.gpu,      '#0A6E78'],
          ].map(([l, v, c]) => (
            <div key={l} style={{ background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:'0.75rem', padding:'0.85rem' }}>
              <div style={{ fontSize:'0.7rem', fontWeight:700, color:'#94A3B8', textTransform:'uppercase', marginBottom:'0.2rem' }}>{l}</div>
              <div style={{ fontSize:'1.1rem', fontWeight:800, color: c, fontFamily:'monospace' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="panel-box">
      <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>Chi Phí Vận Hành Hàng Tháng</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {[
          { l: 'Kaggle GPU T4 x2',       c: '$0',    n: 'Free (30h/tuần quota)',     col: '#10B981' },
          { l: 'HuggingFace Hub',         c: '$0',    n: 'Free tier checkpoint',      col: '#10B981' },
          { l: 'Docker Local Runtime',    c: '$8.20', n: 'Điện năng + Hosting infra', col: '#F59E0B' },
          { l: 'Qdrant Cloud (Dự Phòng)', c: '$6.00', n: 'Scale-out vector storage',  col: '#3B82F6' },
        ].map(m => (
          <div key={m.l} style={{ background:'#F8FAFC', border:'1px solid #E2E8F0', borderRadius:'1rem', padding:'1.25rem' }}>
            <div style={{ fontSize:'0.82rem', fontWeight:700, marginBottom:'0.35rem' }}>{m.l}</div>
            <div style={{ fontSize:'1.75rem', fontWeight:800, color:m.col, fontFamily:'monospace', letterSpacing:'-0.03em' }}>{m.c}</div>
            <div style={{ fontSize:'0.72rem', color:'#94A3B8', lineHeight:1.4, marginTop:'0.25rem' }}>{m.n}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SystemAdminLLMOps;
