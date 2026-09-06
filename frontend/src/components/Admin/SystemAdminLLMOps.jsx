import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Cpu, 
  DollarSign, 
  Clock, 
  Layers, 
  CheckCircle, 
  AlertCircle, 
  Key, 
  UserPlus, 
  Settings, 
  HardDrive,
  Activity,
  Zap,
  Lock
} from 'lucide-react';

export const SystemAdminLLMOps = () => {
  const [activeTab, setActiveTab] = useState('rbac');
  
  // Users & Roles State
  const [users, setUsers] = useState([
    { id: 'USR-01', name: 'Trần Kim Sanh', email: 'sanhtk@graphmind.ai', dept: 'Board of Directors', role: 'Super Admin', queryScope: 'Full System Access', status: 'Active' },
    { id: 'USR-02', name: 'Trần Thị Ngọc Anh', email: 'ngocanh@graphmind.ai', dept: 'IT & AI Engineering', role: 'AI Operations Admin', queryScope: 'LLMOps & Knowledge Graph', status: 'Active' },
    { id: 'USR-03', name: 'Nguyễn Văn Minh', email: 'minhnv@graphmind.ai', dept: 'Sales', role: 'Sales Lead', queryScope: 'Orders, Customers, Contracts', status: 'Active' },
    { id: 'USR-04', name: 'Lê Thị Thu Hà', email: 'haltt@graphmind.ai', dept: 'Accounting', role: 'Finance Admin', queryScope: 'Receivables & Financial ERP', status: 'Active' }
  ]);

  // RBAC Matrix Rules
  const [rbacRules, setRbacRules] = useState([
    { role: 'Board of Directors', erpAccess: true, legalAccess: true, llmOpsAccess: true, sopAccess: true },
    { role: 'Sales Staff', erpAccess: true, legalAccess: false, llmOpsAccess: false, sopAccess: true },
    { role: 'Finance & Accounting', erpAccess: true, legalAccess: true, llmOpsAccess: false, sopAccess: true },
    { role: 'AI Ops / Developer', erpAccess: false, legalAccess: false, llmOpsAccess: true, sopAccess: true }
  ]);

  // LLMOps Telemetry State
  const [llmTelemetry] = useState({
    modelName: 'Qwen2.5-7B-Instruct (Unsloth 4-bit Quantized)',
    totalTokens: '4,850,200 Tokens',
    avgLatency: '184 ms',
    gpuSession: 'Kaggle T4 x2 (Online)',
    hfCheckpoints: 'v1.4-unsloth-lora (HuggingFace Hub)',
    estimatedCost: '$14.20 / Month',
    fineTuneDataset: '2,850 Q&A Pairs (AdventureWorks + CUAD)'
  });

  const toggleRbacPermission = (index, field) => {
    setRbacRules(prev => prev.map((rule, i) => i === index ? { ...rule, [field]: !rule[field] } : rule));
  };

  return (
    <div className="module-container">
      {/* Header */}
      <div className="module-header">
        <div>
          <div className="module-badge">Module 6</div>
          <h2 className="module-title">Quản Trị Hệ Thống, RBAC & Giám Sát LLMOps</h2>
          <p className="module-subtitle">
            Phân quyền truy vấn tài khoản người dùng theo vai trò (RBAC) và theo dõi telemetry chi phí tính toán AI.
          </p>
        </div>
      </div>

      {/* Telemetry Header Grid */}
      <div className="telemetry-grid mb-4">
        <div className="telemetry-card">
          <div className="telemetry-label"><Cpu size={16} color="#0A6E78" /> Mô Hình LLM Phân Tải</div>
          <div className="telemetry-value" style={{ fontSize: '1.1rem' }}>{llmTelemetry.modelName}</div>
          <div className="telemetry-sub">Fine-tuned via Unsloth LoRA</div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-label"><Zap size={16} color="#F59E0B" /> Độ Trễ Truy Vấn Trung Bình</div>
          <div className="telemetry-value text-amber">{llmTelemetry.avgLatency}</div>
          <div className="telemetry-sub">GraphRAG Context Fusion Latency</div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-label"><Activity size={16} color="#3B82F6" /> Tổng Token Đã Xử Lý</div>
          <div className="telemetry-value">{llmTelemetry.totalTokens}</div>
          <div className="telemetry-sub">99.8% Success Rate</div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-label"><DollarSign size={16} color="#10B981" /> Chi Phí Compute Dự Ước</div>
          <div className="telemetry-value text-emerald">{llmTelemetry.estimatedCost}</div>
          <div className="telemetry-sub">Kaggle GPU + HuggingFace Hosted</div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="subtabs-bar">
        <button 
          className={`subtab-btn ${activeTab === 'rbac' ? 'active' : ''}`}
          onClick={() => setActiveTab('rbac')}
        >
          <Lock size={16} /> Ma Trận Phân Quyền Granular RBAC
        </button>

        <button 
          className={`subtab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={16} /> Quản Lý Người Dùng & Phòng Ban ({users.length})
        </button>

        <button 
          className={`subtab-btn ${activeTab === 'llmops' ? 'active' : ''}`}
          onClick={() => setActiveTab('llmops')}
        >
          <Cpu size={16} /> Bảng Điều Khiển LLMOps & Fine-tuning
        </button>
      </div>

      {/* TAB 1: GRANULAR RBAC MATRIX */}
      {activeTab === 'rbac' && (
        <div className="panel-box">
          <div className="panel-title-bar flex-between">
            <div>
              <h3>Ma Trận Phân Quyền Giới Hạn Phạm Vi Truy Vấn (RBAC Scope)</h3>
              <span className="sub-text">Cấu hình chi tiết danh mục dữ liệu được phép truy vấn trong GraphRAG cho từng Vai trò.</span>
            </div>
            <button className="primary-btn small">
              Lưu Cấu Hình RBAC
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Vai Trò (Role Name)</th>
                <th>Dữ Liệu Khách Hàng & Đơn Hàng (ERP)</th>
                <th>Hợp Đồng & Văn Bản Pháp Lý (CUAD)</th>
                <th>SOP & Quy Trình Nội Bộ</th>
                <th>Quyền Giám Sát LLMOps</th>
              </tr>
            </thead>
            <tbody>
              {rbacRules.map((rule, idx) => (
                <tr key={idx}>
                  <td><strong>{rule.role}</strong></td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={rule.erpAccess} 
                      onChange={() => toggleRbacPermission(idx, 'erpAccess')}
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={rule.legalAccess} 
                      onChange={() => toggleRbacPermission(idx, 'legalAccess')}
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={rule.sopAccess} 
                      onChange={() => toggleRbacPermission(idx, 'sopAccess')}
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={rule.llmOpsAccess} 
                      onChange={() => toggleRbacPermission(idx, 'llmOpsAccess')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="panel-box">
          <div className="panel-title-bar flex-between">
            <div>
              <h3>Tài Khoản Người Dùng Doanh Nghiệp (PostgreSQL Auth)</h3>
              <span className="sub-text">Quản lý định danh OAuth 2.0 và JWT Token phiên làm việc.</span>
            </div>
            <button className="secondary-btn small">
              <UserPlus size={14} /> Thêm Người Dùng Mới
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Mã User</th>
                <th>Họ Và Tên</th>
                <th>Email Đăng Nhập</th>
                <th>Phòng Ban</th>
                <th>Vai Trò</th>
                <th>Phạm Vi Truy Vấn Cho Phép</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><code>{u.id}</code></td>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td>{u.dept}</td>
                  <td><span className="edge-relation-pill">{u.role}</span></td>
                  <td>{u.queryScope}</td>
                  <td><span className="status-badge success">{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: LLMOPS DASHBOARD */}
      {activeTab === 'llmops' && (
        <div className="panel-box">
          <div className="panel-title-bar">
            <h3>Chi Tiết Fine-Tuning & Checkpoint LLMOps Pipeline</h3>
            <span className="sub-text">Theo dõi phiên huấn luyện Unsloth, checkpoint HuggingFace và hiệu năng đáp ứng câu hỏi.</span>
          </div>

          <div className="llmops-detail-grid">
            <div className="info-row-box">
              <span className="info-key">Bộ Dữ Liệu Huấn Luyện (Fine-tuning Dataset):</span>
              <span className="info-val highlight">{llmTelemetry.fineTuneDataset}</span>
            </div>

            <div className="info-row-box">
              <span className="info-key">Phiên Môi Trường GPU:</span>
              <span className="info-val">{llmTelemetry.gpuSession}</span>
            </div>

            <div className="info-row-box">
              <span className="info-key">Checkpoint Model Host:</span>
              <span className="info-val"><code>{llmTelemetry.hfCheckpoints}</code></span>
            </div>

            <div className="info-row-box">
              <span className="info-key">Cơ Chế Khóa Bảo Mật:</span>
              <span className="info-val text-emerald">HTTPS / TLS 1.3 + JWT Authorization</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemAdminLLMOps;
