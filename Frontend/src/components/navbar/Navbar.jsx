import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import './Navbar.css';

/**
 * Global Navbar Component
 * Reusable navigation header for JobDekho public pages
 */
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  // Automatically close mobile menu when route changes
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  // Close mobile menu on screen resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 880) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Left: JobDekho Logo */}
        <Link to="/" className="navbar-brand" aria-label="JobDekho Home">
          <img
            src="/assets/jobdekho-logo.png"
            alt="JobDekho — Naukri Dekho, Future Banao."
            className="navbar-logo-img"
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="navbar-nav desktop-only" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Jobs
          </NavLink>
          <NavLink
            to="/companies"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Companies
          </NavLink>
          <NavLink
            to="/resume-analyzer"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Resume Analyzer
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            About
          </NavLink>
        </nav>

        {/* Right: Desktop Actions */}
        <div className="navbar-actions desktop-only">
          <NavLink
            to="/employers"
            className={({ isActive }) => `employer-link ${isActive ? 'active' : ''}`}
          >
            For Employers
          </NavLink>
          <Link to="/login" className="btn-nav btn-outline">
            Login
          </Link>
          <Link to="/register" className="btn-nav btn-primary">
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <nav className="mobile-nav-links" aria-label="Mobile Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Jobs
          </NavLink>
          <NavLink
            to="/companies"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Companies
          </NavLink>
          <NavLink
            to="/resume-analyzer"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Resume Analyzer
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </NavLink>
        </nav>

        <div className="mobile-menu-divider" />

        <div className="mobile-nav-actions">
          <NavLink
            to="/employers"
            className={({ isActive }) => `mobile-employer-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            For Employers
          </NavLink>
          <div className="mobile-btn-group">
            <Link
              to="/login"
              className="btn-nav btn-outline full-width"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn-nav btn-primary full-width"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
