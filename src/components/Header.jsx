import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, User, LogOut } from 'lucide-react';
import useStore from '../store';
import '../styles/header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header glass animate-fade-in">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">🔧</div>
            <span>PlumberConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <Link to="/plumbers" className="nav-link">Plumbers</Link>
            <Link to="/forum" className="nav-link">Forum</Link>
          </nav>

          {/* User Area */}
          <div className="user-area">
            {isAuthenticated ? (
              <>
                <button className="icon-btn" title="Messages">
                  <MessageCircle size={20} />
                  <span className="badge">2</span>
                </button>
                <button className="icon-btn" title="Notifications">
                  <Bell size={20} />
                  <span className="badge">3</span>
                </button>
                <div className="user-menu">
                  <button className="user-btn">
                    <User size={20} />
                    <span>{user?.name || 'Profile'}</span>
                  </button>
                  <button 
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="nav-mobile animate-slide-in-down">
            <Link to="/jobs" className="mobile-nav-link">Jobs</Link>
            <Link to="/plumbers" className="mobile-nav-link">Plumbers</Link>
            <Link to="/forum" className="mobile-nav-link">Forum</Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="mobile-nav-link">Login</Link>
                <Link to="/register" className="mobile-nav-link">Sign Up</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
