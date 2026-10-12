import React from 'react';
import { CheckCircle2, Clock, ListTodo, AlertTriangle, Hourglass } from 'lucide-react';

export default function DashboardCards({ stats }) {
  const cards = [
    { 
      title: 'Total Tasks', 
      value: stats.total || 0, 
      icon: <ListTodo size={22} color="#38bdf8" />, 
      color: '#38bdf8', 
      bg: 'rgba(56, 189, 248, 0.1)',
      border: 'rgba(56, 189, 248, 0.25)'
    },
    { 
      title: 'Pending', 
      value: stats.pending || 0, 
      icon: <Hourglass size={22} color="#fbbf24" />, 
      color: '#fbbf24', 
      bg: 'rgba(251, 191, 36, 0.1)',
      border: 'rgba(251, 191, 36, 0.25)'
    },
    { 
      title: 'In Progress', 
      value: stats.inProgress || 0, 
      icon: <Clock size={22} color="#818cf8" />, 
      color: '#818cf8', 
      bg: 'rgba(129, 140, 248, 0.1)',
      border: 'rgba(129, 140, 248, 0.25)'
    },
    { 
      title: 'Completed', 
      value: stats.completed || 0, 
      icon: <CheckCircle2 size={22} color="#34d399" />, 
      color: '#34d399', 
      bg: 'rgba(52, 211, 153, 0.1)',
      border: 'rgba(52, 211, 153, 0.25)'
    },
    { 
      title: 'Overdue Tasks', 
      value: stats.overdue || 0, 
      icon: <AlertTriangle size={22} color="#f87171" />, 
      color: '#f87171', 
      bg: 'rgba(248, 113, 113, 0.1)',
      border: 'rgba(248, 113, 113, 0.25)'
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((c, i) => (
        <div key={i} className="stat-card" style={{ borderColor: c.border }}>
          <div>
            <span className="stat-title">{c.title}</span>
            <div className="stat-value" style={{ color: c.color }}>{c.value}</div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
            {c.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
