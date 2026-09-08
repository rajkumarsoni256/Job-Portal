import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  Building2,
  PlusCircle,
  Users,
  BarChart3,
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './DashboardSidebar.css';

/**
 * Reusable DashboardSidebar Component
 * Dynamically renders navigation links for Job Seeker or Recruiter role based on route
 */
function DashboardSidebar({ isMobileOpen = false, onCloseMobile, role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const isAdmin = role === 'admin' || location.pathname.startsWith('/admin');
  const isRecruiter = role === 'recruiter' || location.pathname.startsWith('/recruiter');

  const handleLogout = () => {
    if (authContext && authContext.logout) {
      authContext.logout();
    }
    navigate('/login');
  };

  const seekerNavItems = [
    { label: 'Dashboard', path: '/seeker/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'My Profile', path: '/seeker/profile', icon: <User size={18} /> },
    { label: 'My Resume', path: '/seeker/resume', icon: <FileText size={18} /> },
    { label: 'Resume Analyzer', path: '/resume-analyzer', icon: <Sparkles size={18} /> },
    { label: 'Recommended Jobs', path: '/jobs?recommended=true', icon: <Briefcase size={18} /> },
    { label: 'Saved Jobs', path: '/seeker/saved', icon: <Bookmark size={18} /> },
    { label: 'Applications', path: '/seeker/applications', icon: <Send size={18} /> },
    { label: 'Settings', path: '/seeker/settings', icon: <Settings size={18} /> },
  ];

  const recruiterNavItems = [
    { label: 'Dashboard', path: '/recruiter/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'My Company', path: '/recruiter/company', icon: <Building2 size={18} /> },
    { label: 'Post a Job', path: '/recruiter/post-job', icon: <PlusCircle size={18} /> },
    { label: 'Manage Jobs', path: '/recruiter/jobs', icon: <Briefcase size={18} /> },
    { label: 'Applicants', path: '/recruiter/applicants', icon: <Users size={18} /> },
    { label: 'Analytics', path: '/recruiter/analytics', icon: <BarChart3 size={18} /> },
    { label: 'Settings', path: '/recruiter/settings', icon: <Settings size={18} /> },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Users', path: '/admin/users', icon: <Users size={18} /> },
    { label: 'Jobs', path: '/admin/jobs', icon: <Briefcase size={18} /> },
    { label: 'Companies', path: '/admin/companies', icon: <Building2 size={18} /> },
    { label: 'Applications', path: '/admin/applications', icon: <Send size={18} /> },
    { label: 'Reports', path: '/admin/reports', icon: <FileText size={18} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  const navItems = isAdmin ? adminNavItems : isRecruiter ? recruiterNavItems : seekerNavItems;

  return (
    <aside className={`dashboard-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-nav-group">
        <div className="sidebar-group-label">
          {isAdmin ? 'Admin Console' : isRecruiter ? 'Recruiter Suite' : 'Navigation'}
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
            onClick={onCloseMobile}
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
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
