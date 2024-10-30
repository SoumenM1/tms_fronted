import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ username, password });
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <>
    
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.header}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <div style={styles.registerContainer}>
        <p style={styles.registerText}>Don't have an account?</p>
        <button onClick={handleRegister} style={styles.registerButton}>Register</button>
      </div>
      
    </div>
   
          </>
    
  );
};

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      flexDirection: 'column', // Make the children stack vertically
    },
    form: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      marginBottom: '20px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    registerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center items horizontally
      marginTop: '20px', // Add some margin from the form
    },
    registerText: {
      margin: '10px 0',
      fontSize: '14px',
      color: '#555',
    },
    registerButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };
  

export default Login;
