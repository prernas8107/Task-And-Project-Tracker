import React from 'react';
import { CheckCircle2, Clock, ListTodo, AlertTriangle } from 'lucide-react';

export default function DashboardCards({ stats }) {
  const cards = [
    { title: 'Total Tasks', value: stats.total || 0, icon: <ListTodo color="#38bdf8" />, color: '#38bdf8' },
    { title: 'In Progress', value: stats.inProgress || 0, icon: <Clock color="#60a5fa" />, color: '#60a5fa' },
    { title: 'Completed', value: stats.completed || 0, icon: <CheckCircle2 color="#4ade80" />, color: '#4ade80' },
    { title: 'Overdue', value: stats.overdue || 0, icon: <AlertTriangle color="#f87171" />, color: '#f87171' },
  ];

  return (
    <div className="stats-grid">
      {cards.map((c, i) => (
        <div key={i} className="stat-card">
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{c.title}</span>
            <div className="stat-value" style={{ color: c.color }}>{c.value}</div>
          </div>
          <div>{c.icon}</div>
        </div>
      ))}
    </div>
  );
}
