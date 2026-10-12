import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Toast from './components/Toast';
import { fetchTasks, fetchStats, createTask, updateTask, deleteTask } from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, inProgress: 0, overdue: 0 });
  const [filters, setFilters] = useState({ search: '', status: 'All', priority: 'All', sortBy: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksRes, statsRes] = await Promise.all([
        fetchTasks(filters),
        fetchStats()
      ]);
      setTasks(tasksRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Unable to connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        addToast('Task updated successfully!', 'success');
      } else {
        await createTask(formData);
        addToast('Task created successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      loadData();
    } catch (err) {
      console.error('Save failed:', err);
      addToast('Failed to save task. Please try again.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        addToast('Task deleted successfully!', 'success');
        loadData();
      } catch (err) {
        console.error('Delete failed:', err);
        addToast('Failed to delete task. Please try again.', 'error');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      addToast(`Status updated to "${newStatus}"`, 'info');
      loadData();
    } catch (err) {
      console.error('Status update failed:', err);
      addToast('Failed to update status.', 'error');
    }
  };

  return (
    <div>
      <Navbar
        onAddTask={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      />

      <div className="container">
        <DashboardCards stats={stats} />
        <FilterBar filters={filters} setFilters={setFilters} />

        {error && (
          <div style={{
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid #f87171',
            color: '#f87171',
            padding: '12px 20px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.9rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner"></div>
            <p style={{ color: '#64748b', marginTop: '16px', fontSize: '0.95rem' }}>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={(task) => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleCreateOrUpdate}
        editingTask={editingTask}
      />

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
