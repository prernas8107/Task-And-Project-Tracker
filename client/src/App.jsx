import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { fetchTasks, fetchStats, createTask, updateTask, deleteTask } from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, inProgress: 0, overdue: 0 });
  const [filters, setFilters] = useState({ search: '', status: 'All', priority: 'All', sortBy: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadData = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        fetchTasks(filters),
        fetchStats()
      ]);
      setTasks(tasksRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      loadData();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        loadData();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      loadData();
    } catch (err) {
      console.error('Status update failed:', err);
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
        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setEditingTask(task);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
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
    </div>
  );
}
