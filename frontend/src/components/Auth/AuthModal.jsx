import React from 'react';
import { X } from 'lucide-react';
import GraphMindAuthCard from './GraphMindAuthCard.jsx';

export default function AuthModal({ isOpen, onClose, initialMode = 'register', onSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="gm-auth-overlay haravan-auth-overlay" onClick={onClose}>
      <div className="gm-auth-modal-wrapper haravan-auth-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="gm-auth-modal-close haravan-auth-modal-close" onClick={onClose} aria-label="Đóng">
          <X size={18} />
        </button>

        <GraphMindAuthCard
          initialMode={initialMode}
          onSuccess={(userData) => {
            if (onSuccess) onSuccess(userData);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
