import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader } from 'lucide-react';
import useStore from '../store';
import '../styles/auth.css';

export default function Register() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStep1 = () => {
    if (!userType) {
      setError('Please select an account type');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    // Mock registration - replace with actual API call
    setTimeout(() => {
      const user = {
        id: Math.random(),
        name: formData.name,
        email: formData.email,
        userType: userType,
      };
      setUser(user, userType);
      localStorage.setItem('token', 'mock-token-' + Date.now());
      navigate('/jobs');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      {step === 1 ? (
        <div className="auth-card glass animate-fade-in-up">
          <div className="auth-header">
            <h1>Join PlumberConnect</h1>
            <p>Choose your account type to get started</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="user-type-selector">
            <button
              className={`type-option ${userType === 'plumber' ? 'selected' : ''}`}
              onClick={() => setUserType('plumber')}
            >
              <div className="type-icon">🔧</div>
              <h3>I'm a Plumber</h3>
              <p>Find jobs and grow your business</p>
            </button>

            <button
              className={`type-option ${userType === 'client' ? 'selected' : ''}`}
              onClick={() => setUserType('client')}
            >
              <div className="type-icon">👤</div>
              <h3>I'm a Client</h3>
              <p>Find trusted plumbers</p>
            </button>
          </div>

          <button
            onClick={handleStep1}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Continue
          </button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      ) : (
        <div className="auth-card glass animate-fade-in-up">
          <div className="auth-header">
            <button
              className="back-button"
              onClick={() => setStep(1)}
              type="button"
            >
              ← Back
            </button>
            <h1>Create Your Account</h1>
            <p>As a {userType === 'plumber' ? 'Plumber' : 'Client'}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      )}
    </div>
  );
}
