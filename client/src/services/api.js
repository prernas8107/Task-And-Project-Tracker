import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/tasks'
});

export const fetchTasks = (params) => API.get('/', { params });
export const fetchStats = () => API.get('/stats');
export const createTask = (taskData) => API.post('/', taskData);
export const updateTask = (id, taskData) => API.put(`/${id}`, taskData);
export const deleteTask = (id) => API.delete(`/${id}`);
