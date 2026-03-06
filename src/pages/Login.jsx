import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import useStore from '../store';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Mock login - replace with actual API call
    setTimeout(() => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: email,
      };
      setUser(user, 'plumber');
      localStorage.setItem('token', 'mock-token-' + Date.now());
      navigate('/jobs');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass animate-fade-in-up">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your PlumberConnect account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={20} />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={20} className="spinner" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="demo-buttons">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setEmail('plumber@demo.com');
              setPassword('demo123');
            }}
          >
            Demo: Plumber
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setEmail('client@demo.com');
              setPassword('demo123');
            }}
          >
            Demo: Client
          </button>
        </div>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
