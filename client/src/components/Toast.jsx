import React, { useEffect } from 'react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const configs = {
    success: {
      border: '#10b981',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    },
    error: {
      border: '#ef4444',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )
    },
    info: {
      border: '#6366f1',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    }
  };

  const config = configs[toast.type] || configs.info;

  return (
    <div className="toast-item" style={{
      background: '#1e293b',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderLeft: `4px solid ${config.border}`,
    }}>
      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{config.icon}</span>
      <span style={{ flex: 1, fontWeight: 500, color: '#f8fafc' }}>{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: '1.25rem',
          lineHeight: '1',
          padding: '0 4px',
          marginLeft: '8px',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => (e.target.style.color = '#fff')}
        onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}
      >
        &times;
      </button>
    </div>
  );
}
