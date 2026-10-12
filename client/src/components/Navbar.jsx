import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';

export default function Navbar({ onAddTask }) {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo-icon">
          <CheckSquare size={22} color="#ffffff" />
        </div>
        <div>
          <h1 className="logo-text">Task & Project Tracker</h1>
        </div>
      </div>
      <button className="btn-primary" onClick={onAddTask} id="add-task-btn">
        <Plus size={18} /> Add Task
      </button>
    </nav>
  );
}
