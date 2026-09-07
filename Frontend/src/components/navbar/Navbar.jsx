import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Briefcase, FileText, LogIn, ChevronDown } from 'lucide-react';
import { Button } from '../common';
import './Navbar.css';

/**
 * Navbar Component
 */
function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <Briefcase size={20} />
          </div>
          <span className="brand-text">Job<span className="brand-highlight">Track</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Home
          </NavLink>

          <NavLink to="/jobs" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Find Jobs
          </NavLink>

          <NavLink to="/resume-analyzer" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <FileText size={16} />
            <span>Resume Analyzer</span>
          </NavLink>

          <div className="nav-dropdown">
            <span className="nav-item">
              Dashboards <ChevronDown size={14} />
            </span>
            <div className="dropdown-menu">
              <Link to="/seeker/dashboard" className="dropdown-item">Job Seeker</Link>
              <Link to="/recruiter/dashboard" className="dropdown-item">Recruiter</Link>
              <Link to="/admin/dashboard" className="dropdown-item">Admin Panel</Link>
            </div>
          </div>
        </nav>

        {/* Auth Actions */}
        <div className="navbar-actions">
          <Link to="/login">
            <Button variant="outline" size="sm" iconLeft={<LogIn size={15} />}>
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
