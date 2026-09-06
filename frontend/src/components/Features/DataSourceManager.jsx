import React, { useState } from 'react';
import { 
  Database, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Cloud, 
  Server, 
  Clock, 
  FileText, 
  ShieldCheck, 
  HardDrive,
  Layers
} from 'lucide-react';

export const DataSourceManager = () => {
  const [activeTab, setActiveTab] = useState('connectors');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    lastSync: '2026-09-06 11:45:00',
    recordsIngested: 124500,
    activeAgents: 4,
    health: 'Good'
  });

  const [connectors] = useState([
    {
      id: 'gdrive',
      name: 'Google Drive / Sheets',
      type: 'Cloud Storage',
      account: 'enterprise-data@graphmind.ai',
      status: 'Connected',
      lastIngest: '10 phút trước',
      itemsCount: '482 files (Contracts, Sheets)',
      icon: Cloud,
      color: '#34A853'
    },
    {
      id: 'aegis',
      name: 'AEGIS Local Agent Panel',
      type: 'File Watcher Agent',
      account: '4 Workstations Online',
      status: 'Active Sync',
      lastIngest: 'Realtime Watcher',
      itemsCount: '1,280 files monitored',
      icon: HardDrive,
      color: '#0A6E78'
    },
    {
      id: 'adventure_works',
      name: 'AdventureWorks ERP (PyMySQL)',
      type: 'Relational DB',
      account: 'db_admin@localhost:3306',
      status: 'Connected',
      lastIngest: '30 phút trước',
      itemsCount: '128,400 Records',
      icon: Database,
      color: '#3B82F6'
    },
    {
      id: 'cuad_legal',
      name: 'CUAD Legal Contract Repository',
      type: 'Document Store',
      account: 'legal_vault_v2',
      status: 'Connected',
      lastIngest: '2 giờ trước',
      itemsCount: '510 Contract PDFs',
      icon: Server,
      color: '#8B5CF6'
    }
  ]);

  const [agents] = useState([
    { id: 'WS-01', name: 'Sales-Dept-PC1', ip: '192.168.1.104', status: 'Online', watchedFolder: 'D:/Company_Contracts/Sales', filesCount: 342, cpu: '2.4%' },
    { id: 'WS-02', name: 'Accounting-PC-Main', ip: '192.168.1.112', status: 'Online', watchedFolder: 'C:/Finance_Reports/2026', filesCount: 512, cpu: '1.8%' },
    { id: 'WS-03', name: 'Legal-Vault-Agent', ip: '192.168.1.150', status: 'Online', watchedFolder: 'E:/Legal_Archive/PDFs', filesCount: 290, cpu: '3.1%' },
    { id: 'WS-04', name: 'Logistics-Hub-Agent', ip: '192.168.1.188', status: 'Offline', watchedFolder: 'D:/Logistics/Orders', filesCount: 136, cpu: '0.0%' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-9041', timestamp: '2026-09-06 11:45:12', source: 'AEGIS Agent (WS-01)', action: 'Incremental Ingest', status: 'SUCCESS', details: 'Added 4 new Sales Orders from Sheets' },
    { id: 'LOG-9040', timestamp: '2026-09-06 11:30:05', source: 'CUAD Contract Repository', action: 'Entity Extraction', status: 'SUCCESS', details: 'Extracted 42 Entities (Customers, Termination Clauses)' },
    { id: 'LOG-9039', timestamp: '2026-09-06 11:00:00', source: 'AdventureWorks ERP', action: 'Scheduled Sync', status: 'SUCCESS', details: 'Updated 1,200 Customer Order records' },
    { id: 'LOG-9038', timestamp: '2026-09-06 10:15:22', source: 'Google Drive Sync', action: 'OAuth Token Renewal', status: 'SUCCESS', details: 'OAuth token refreshed automatically' },
    { id: 'LOG-9037', timestamp: '2026-09-06 09:40:11', source: 'AEGIS Agent (WS-04)', action: 'Heartbeat Lost', status: 'WARNING', details: 'Agent disconnected gracefully (Network timeout)' }
  ]);

  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus(prev => ({
        ...prev,
        lastSync: new Date().toLocaleString('vi-VN'),
        recordsIngested: prev.recordsIngested + 48
      }));
      setAuditLogs(prev => [
        {
          id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: new Date().toLocaleString('vi-VN'),
          source: 'Manual Trigger (Console)',
          action: 'Incremental Ingest & Graph Construction',
          status: 'SUCCESS',
          details: 'Extracted & indexed 48 new entities into Knowledge Graph'
        },
        ...prev
      ]);
    }, 2000);
  };

  return (
    <div className="module-container">
      {/* Module Header */}
      <div className="module-header">
        <div>
          <div className="module-badge">Module 1</div>
          <h2 className="module-title">Quản Lý Nguồn Dữ Liệu & Đồng Bộ (Data Source & Sync)</h2>
          <p className="module-subtitle">
            Cấu hình kênh kết nối Cloud, theo dõi AEGIS File Watcher Agent tại máy trạm và nhật ký Ingestion Log.
          </p>
        </div>

        <div className="module-actions">
          <button 
            className={`primary-btn ${isSyncing ? 'loading' : ''}`}
            onClick={triggerManualSync}
            disabled={isSyncing}
          >
            <RefreshCw className={`icon ${isSyncing ? 'spin' : ''}`} size={16} />
            {isSyncing ? 'Đang kích hoạt Sync...' : 'Kích hoạt Sync Ngay'}
          </button>
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className="telemetry-grid">
        <div className="telemetry-card">
          <div className="telemetry-label">
            <Clock size={16} color="#0A6E78" /> Lần Đồng Bộ Gần Nhất
          </div>
          <div className="telemetry-value">{syncStatus.lastSync}</div>
          <div className="telemetry-sub">Chế độ: Realtime & Periodic Incremental</div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-label">
            <Layers size={16} color="#3B82F6" /> Tổng Bản Ghi Đã Ingest
          </div>
          <div className="telemetry-value">{syncStatus.recordsIngested.toLocaleString()}</div>
          <div className="telemetry-sub">Bao gồm ERP + Contract PDFs + Sheets</div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-label">
            <HardDrive size={16} color="#10B981" /> AEGIS Local Agents
          </div>
          <div className="telemetry-value">{syncStatus.activeAgents} Trạm Hoạt Động</div>
          <div className="telemetry-sub">3 Online / 1 Offline</div>
        </div>

        <div className="telemetry-card">
          <div className="telemetry-label">
            <ShieldCheck size={16} color="#8B5CF6" /> Trạng Thái Ingestion Engine
          </div>
          <div className="telemetry-value text-emerald">100% Hoạt Động</div>
          <div className="telemetry-sub">PostgreSQL + Qdrant Vector Healthy</div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="subtabs-bar">
        <button 
          className={`subtab-btn ${activeTab === 'connectors' ? 'active' : ''}`}
          onClick={() => setActiveTab('connectors')}
        >
          <Cloud size={16} /> Kênh Kết Nối Cloud & DB ({connectors.length})
        </button>

        <button 
          className={`subtab-btn ${activeTab === 'agents' ? 'active' : ''}`}
          onClick={() => setActiveTab('agents')}
        >
          <HardDrive size={16} /> AEGIS File Watcher Panel ({agents.length})
        </button>

        <button 
          className={`subtab-btn ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          <FileText size={16} /> Ingestion & Audit Log ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: CONNECTORS */}
      {activeTab === 'connectors' && (
        <div className="grid-cards-2col">
          {connectors.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.id} className="data-connector-card">
                <div className="connector-header">
                  <div className="connector-icon-box" style={{ background: `${c.color}15`, color: c.color }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="connector-name">{c.name}</h4>
                    <span className="connector-type">{c.type}</span>
                  </div>
                  <span className="status-badge success">
                    <CheckCircle size={12} /> {c.status}
                  </span>
                </div>

                <div className="connector-body">
                  <div className="info-row">
                    <span className="info-label">Tài khoản / Endpoint:</span>
                    <span className="info-val">{c.account}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Lần trích xuất cuối:</span>
                    <span className="info-val">{c.lastIngest}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Quy mô tài nguyên:</span>
                    <span className="info-val highlight">{c.itemsCount}</span>
                  </div>
                </div>

                <div className="connector-footer">
                  <button className="secondary-btn small">Cấu hình OAuth / Key</button>
                  <button className="outline-btn small" onClick={triggerManualSync}>
                    <RefreshCw size={12} /> Ingest Ngay
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: AEGIS AGENTS */}
      {activeTab === 'agents' && (
        <div className="panel-box">
          <div className="panel-title-bar">
            <h3>Danh Sách Máy Trạm Cài Đặt AEGIS Local Agent</h3>
            <span className="sub-text">File Watcher phát hiện tự động thay đổi tài liệu tại thư mục nội bộ doanh nghiệp.</span>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>Tên Máy Trạm</th>
                <th>Địa Chỉ IP</th>
                <th>Thư Mục Theo Dõi (Watched Folder)</th>
                <th>Số File Giám Sát</th>
                <th>Tải CPU</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {agents.map(ag => (
                <tr key={ag.id}>
                  <td><strong>{ag.id}</strong></td>
                  <td>{ag.name}</td>
                  <td><code>{ag.ip}</code></td>
                  <td><code className="folder-path">{ag.watchedFolder}</code></td>
                  <td>{ag.filesCount} files</td>
                  <td>{ag.cpu}</td>
                  <td>
                    <span className={`status-badge ${ag.status === 'Online' ? 'success' : 'warning'}`}>
                      {ag.status === 'Online' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {ag.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="panel-box">
          <div className="panel-title-bar">
            <h3>Nhật Ký Ingestion Log & Lịch Sử Truy Vết</h3>
            <span className="sub-text">Mọi thao tác trích xuất, xây dựng Knowledge Graph và nạp vector database đều được lưu vết chi tiết.</span>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Mã Log</th>
                <th>Thời Gian</th>
                <th>Nguồn Dữ Liệu</th>
                <th>Hành Động Ingestion</th>
                <th>Trạng Thái</th>
                <th>Chi Tiết Tiến Trình</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id}>
                  <td><code>{log.id}</code></td>
                  <td>{log.timestamp}</td>
                  <td><strong>{log.source}</strong></td>
                  <td>{log.action}</td>
                  <td>
                    <span className={`status-badge ${log.status === 'SUCCESS' ? 'success' : 'warning'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataSourceManager;
