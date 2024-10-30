import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskForm from './TaskForm';

const TaskDashboard = () => {
  const { tasks, fetchTasks, addTask, updateTask, deleteTask, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    
 fetchTasks();

  }, []);

  const handleFormSubmit = (taskData) => {
    if (isEditing) {
      // Include the ID in the taskData when updating
      updateTask(isEditing._id, taskData);
      setIsEditing(null);
    } else {
      addTask(taskData);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Task Dashboard</h2>
      <button onClick={logout} style={styles.logoutButton}>Logout</button>
      
      <div style={styles.formContainer}>
        <TaskForm 
          onSubmit={handleFormSubmit} 
          initialValues={isEditing || { title: '', description: '', status: 'Pending', dueDate: '' }} 
        />
      </div>

      <ul style={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task._id} style={styles.taskItem}>
              <h3 style={styles.taskTitle}>{task.title}</h3>
              <p style={styles.taskDescription}>{task.description}</p>
              <p style={styles.taskStatus}>Status: {task.status}</p>
              <p style={styles.taskDueDate}>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
              <div style={styles.buttonGroup}>
                <button onClick={() => setIsEditing(task)} style={styles.editButton}>Edit</button>
                <button onClick={() => deleteTask(task._id)} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p style={styles.noTasksMessage}>No tasks available. Start by creating a new task!</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    marginBottom: '20px',
  },
  formContainer: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  taskList: {
    listStyleType: 'none',
    padding: 0,
  },
  taskItem: {
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  taskTitle: {
    margin: '0 0 5px 0',
    fontSize: '1.2em',
    color: '#333',
  },
  taskDescription: {
    color: '#666',
    fontSize: '0.95em',
    marginBottom: '10px',
  },
  taskStatus: {
    color: '#555',
    fontSize: '0.9em',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  taskDueDate: {
    color: '#777',
    fontSize: '0.9em',
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#ffa500',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  noTasksMessage: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
};

export default TaskDashboard;
