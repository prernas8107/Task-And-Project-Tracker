import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
        <p style={{ fontSize: '1.1rem' }}>No tasks found. Click "+ Add Task" to create one!</p>
      </div>
    );
  }

  return (
    <div className="tasks-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
