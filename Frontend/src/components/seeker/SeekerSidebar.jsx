import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Sparkles,
  Briefcase,
  Bookmark,
  Send,
  Settings,
  LogOut,
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import '../dashboard/DashboardSidebar.css';

/**
 * SeekerSidebar Component
 * Dedicated navigation sidebar for authenticated Job Seeker pages
 * Supports 260px expanded state, 72px icons-only collapsed state, and mobile drawer
 */
function SeekerSidebar({ isMobileOpen = false, onCloseMobile, isCollapsed: isCollapsedProp }) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [isCollapsedState, setIsCollapsedState] = useState(() => {
    return localStorage.getItem('jobdekho_sidebar_collapsed') === 'true';
  });

  useEffect(() => {
    const handleToggle = () => {
      setIsCollapsedState(localStorage.getItem('jobdekho_sidebar_collapsed') === 'true');
    };
    window.addEventListener('sidebar-toggle', handleToggle);
    return () => window.removeEventListener('sidebar-toggle', handleToggle);
  }, []);

  const isCollapsed = isCollapsedProp !== undefined ? isCollapsedProp : isCollapsedState;

  const handleLogout = () => {
    if (authContext && authContext.logout) {
      authContext.logout();
    }
    navigate('/login', { replace: true });
  };

  const seekerNavItems = [
    { label: 'Dashboard', path: '/seeker/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Profile', path: '/seeker/profile', icon: <User size={18} /> },
    { label: 'Jobs', path: '/seeker/jobs', icon: <Briefcase size={18} /> },
    { label: 'Saved Jobs', path: '/seeker/saved-jobs', icon: <Bookmark size={18} /> },
    { label: 'Applications', path: '/seeker/applications', icon: <Send size={18} /> },
    { label: 'Resume', path: '/seeker/resume', icon: <FileText size={18} /> },
    { label: 'Resume Analyzer', path: '/seeker/resume-analyzer', icon: <Sparkles size={18} /> },
    { label: 'Settings', path: '/seeker/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-nav-group">
        <div className="sidebar-group-label">Job Seeker</div>
        {seekerNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={onCloseMobile}
            title={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-nav-group" style={{ marginTop: 'auto' }}>
        <button
          type="button"
          className="sidebar-nav-item sidebar-logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SeekerSidebar;
