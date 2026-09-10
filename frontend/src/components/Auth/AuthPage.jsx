import React from 'react';
import { ArrowLeft } from 'lucide-react';
import GraphMindAuthCard from './GraphMindAuthCard.jsx';

export default function AuthPage({ initialMode = 'register', onBackToLanding, onSuccess }) {
  return (
    <div className="gm-auth-page-screen haravan-auth-page-screen">
      {/* Top back navigation */}
      <div className="gm-auth-page-topbar haravan-auth-page-topbar">
        <button 
          onClick={onBackToLanding} 
          className="gm-back-to-home haravan-back-to-home"
          title="Quay lại trang chủ"
        >
          <ArrowLeft size={16} />
          <span>Quay lại Graph_Mind</span>
        </button>
      </div>

      {/* Centered Registration / Login Card */}
      <div className="gm-auth-page-container haravan-auth-page-container">
        <GraphMindAuthCard
          initialMode={initialMode}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
