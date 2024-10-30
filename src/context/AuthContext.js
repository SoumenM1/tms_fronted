// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/tasks')
        .then(res => {
          setUser(true);
          setTasks(res.data);
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      setUser(true);
    } catch (error) {
      alert('Login failed');
    }
  };

  // Register function
  const register = async (credentials) => {
    try {
      await api.post('/auth/register', credentials);
      alert('Registration successful, please log in');
    } catch (error) {
      alert('Registration failed');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTasks([]);
  };

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  // Add task
  const addTask = async (task) => {
    const res = await api.post('/tasks', task);
    setTasks([...tasks, res.data]);
  };

  // Update task
  const updateTask = async (id, updatedTask) => {
    const res = await api.put(`/tasks/${id}`, updatedTask);
    setTasks(tasks.map(task => (task._id === id ? res.data : task)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, tasks, fetchTasks, addTask, updateTask, deleteTask, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
