import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/ums-api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const userIdResponse = await fetch(`http://localhost:8080/ums-api/users?username=${username}`);
      if (userIdResponse.ok) {
        const userId = await userIdResponse.json();
        localStorage.setItem('userId', userId);
        
        const result = await response.text();
        alert(result);
        navigate('/home');
      } else {
        setError('Failed to retrieve user ID.');
      }
    } else {
      const errorMsg = await response.text();
      setError(errorMsg);
    }
  };

  return (
    <div className={styles.centerWrapper}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Login</button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
        <div className={styles.accountOptions}>
          <p>Don't have an account? <a href="/signup">Create your account</a></p>
        </div>
        <button className={styles.adminButton} onClick={() => window.location.href = '/admin'}>Admin</button>
      </div>
    </div>
  );
};

export default LoginPage;
