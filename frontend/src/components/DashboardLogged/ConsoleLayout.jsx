import React, { useState } from 'react';
import { 
  Database, 
  Edit3, 
  Bot, 
  BarChart2, 
  Search, 
  Shield, 
  Home, 
  Layers, 
  Activity, 
  ChevronRight,
  User,
  LogOut,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { GraphMindLogo } from '../../assets/logo/GraphMindLogo.jsx';
import DataSourceManager from '../Features/DataSourceManager.jsx';
import KnowledgeEditor from '../Features/KnowledgeEditor.jsx';
import HybridCopilot from '../Features/HybridCopilot.jsx';
import DecisionSupport from '../Features/DecisionSupport.jsx';
import EnterpriseSearch from '../Features/EnterpriseSearch.jsx';
import SystemAdminLLMOps from '../Admin/SystemAdminLLMOps.jsx';

export const ConsoleLayout = ({ onBackToLanding, apiStatus }) => {
  const [activeModule, setActiveModule] = useState('module3'); // Default to AI Copilot
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const modules = [
    { id: 'module1', name: 'Nguồn Dữ Liệu & Sync', icon: Database, badge: 'M1', component: DataSourceManager },
    { id: 'module2', name: 'Quản Lý & Chỉnh Sửa Tri Thức', icon: Edit3, badge: 'M2', component: KnowledgeEditor },
    { id: 'module3', name: 'Hybrid AI Copilot', icon: Bot, badge: 'M3', component: HybridCopilot },
    { id: 'module4', name: 'Hỗ Trợ Quyết Định Executive', icon: BarChart2, badge: 'M4', component: DecisionSupport },
    { id: 'module5', name: 'Tìm Kiếm Đa Chiều', icon: Search, badge: 'M5', component: EnterpriseSearch },
    { id: 'module6', name: 'System Admin & LLMOps', icon: Shield, badge: 'M6', component: SystemAdminLLMOps }
  ];

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || HybridCopilot;

  return (
    <div className="console-layout-wrapper">
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className={`console-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <GraphMindLogo variant="horizontal" size={32} />
          <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="sidebar-section-label">Enterprise Console</div>

        <nav className="sidebar-nav-menu">
          <button 
            className="sidebar-nav-item back-landing-btn"
            onClick={onBackToLanding}
          >
            <Home size={18} />
            {sidebarOpen && <span>Trang Chủ Overview</span>}
          </button>

          <div className="sidebar-divider" />

          {modules.map(mod => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button 
                key={mod.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveModule(mod.id)}
              >
                <div className="nav-item-icon-box">
                  <Icon size={18} />
                </div>
                {sidebarOpen && (
                  <div className="nav-item-text">
                    <span className="nav-title">{mod.name}</span>
                    <span className="nav-badge">{mod.badge}</span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer-card">
            <div className="flex-align-gap mb-1">
              <Activity size={14} color="#10B981" />
              <span className="footer-status-title">System Status</span>
            </div>
            <p className="footer-status-desc">{apiStatus?.message || 'Flask Backend Active'}</p>
          </div>
        )}
      </aside>

      {/* 2. MAIN CONTENT CONTAINER */}
      <main className="console-main-content">
        {/* Top Header */}
        <header className="console-top-header">
          <div className="header-left">
            <h1 className="active-module-title">
              {modules.find(m => m.id === activeModule)?.name}
            </h1>
          </div>

          <div className="header-right">
            <div className="api-status-pill">
              <span className={`status-dot-indicator ${apiStatus?.connected ? 'online' : 'standby'}`} />
              <span>{apiStatus?.connected ? 'GraphRAG Engine Online' : 'Standby Mode'}</span>
            </div>

            <div className="user-profile-badge">
              <div className="avatar-box">
                <User size={16} />
              </div>
              <span className="user-name">Executive (Admin)</span>
            </div>
          </div>
        </header>

        {/* Module Content View */}
        <div className="console-body-view">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default ConsoleLayout;
