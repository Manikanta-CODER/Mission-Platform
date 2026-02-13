import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('customer');
  const [password, setPassword] = useState('password');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success !== false) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        <div className="login-box">
          <h1>🔐 Customer Login</h1>
          <p className="subtitle">High-Altitude Payload Mission Platform</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="demo-credentials">
            <h3>Demo Credentials:</h3>
            <p><strong>Username:</strong> customer</p>
            <p><strong>Password:</strong> password</p>
          </div>

          <div className="back-link">
            <a href="/">← Back to Public Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
