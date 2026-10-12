import React from 'react';
import { Calendar, Edit, Trash2, FolderKanban } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const isOverdue =
    new Date(task.deadline) < new Date() && task.status !== 'Completed';

  return (
    <div className="task-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className={`badge badge-${task.priority.toLowerCase()}`}>
            {task.priority} Priority
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FolderKanban size={13} /> {task.project || 'General'}
          </span>
        </div>

        <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{task.title}</h4>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '16px' }}>
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span
            style={{
              fontSize: '0.8rem',
              color: isOverdue ? '#f87171' : '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Calendar size={14} />
            {new Date(task.deadline).toLocaleDateString()} {isOverdue && '(Overdue)'}
          </span>

          <select
            className={`badge badge-${task.status.toLowerCase().replace(' ', '')}`}
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #334155', paddingTop: '10px' }}>
          <button
            onClick={() => onEdit(task)}
            style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer' }}
            title="Edit Task"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
