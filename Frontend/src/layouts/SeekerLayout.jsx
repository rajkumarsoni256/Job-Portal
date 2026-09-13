import React, { useState, useEffect, useContext, useRef } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Bell, Sun, Moon } from 'lucide-react';
import SeekerSidebar from '../components/seeker/SeekerSidebar';
import SeekerHeader from '../components/seeker/SeekerHeader';
import { AuthContext } from '../context/AuthContext';
import { SEEKER_PROFILE } from '../data/seekerData';
import './SeekerLayout.css';

/**
 * SeekerLayout Component
 * Unified layout wrapper for all authenticated Job Seeker pages
 */
function SeekerLayout() {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  // Global theme state (persisted in localStorage & synced with documentElement attribute)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jobdekho_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jobdekho_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleThemeUpdate = () => {
      const savedTheme = localStorage.getItem('jobdekho_theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    };
    window.addEventListener('jobdekho-theme-updated', handleThemeUpdate);
    return () => window.removeEventListener('jobdekho-theme-updated', handleThemeUpdate);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jobdekho_theme', next);
      window.dispatchEvent(new Event('jobdekho-theme-updated'));
      return next;
    });
  };

  // Sidebar collapse state (persisted in localStorage)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('jobdekho_sidebar_collapsed') === 'true';
  });

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Profile photo state (synced with localStorage & custom window event)
  const [profilePhoto, setProfilePhoto] = useState(() => {
    return localStorage.getItem('jobdekho_profile_photo') || null;
  });

  useEffect(() => {
    const handlePhotoUpdate = () => {
      setProfilePhoto(localStorage.getItem('jobdekho_profile_photo') || null);
    };
    window.addEventListener('profile-photo-updated', handlePhotoUpdate);
    return () => window.removeEventListener('profile-photo-updated', handlePhotoUpdate);
  }, []);

  // Notifications bell dropdown state & click-outside listener
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New job matched',
      message: 'A Frontend Developer role matches your profile.',
      time: '10 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Resume score updated',
      message: 'Your resume ATS score is 82/100.',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Application update',
      message: 'Your application status for Senior React Engineer has changed.',
      time: '2 hours ago',
      unread: false,
    },
  ]);

  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('jobdekho_sidebar_collapsed', next ? 'true' : 'false');
      return next;
    });
  };

  const handleToggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const hasUnread = notifications.some((n) => n.unread);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Determine Page Title dynamically based on current route
  const getPageTitle = (pathname) => {
    if (pathname.includes('/seeker/profile')) return 'My Profile';
    if (pathname.includes('/seeker/jobs/')) return 'Job Details';
    if (pathname.includes('/seeker/jobs')) return 'Jobs';
    if (pathname.includes('/seeker/saved')) return 'Saved Jobs';
    if (pathname.includes('/seeker/applications')) return 'Applications';
    if (pathname.includes('/seeker/resume')) return 'Resume';
    if (pathname.includes('/seeker/settings')) return 'Settings';
    if (pathname.includes('/resume-analyzer')) return 'Resume Analyzer';
    return 'Dashboard';
  };

  const headerTitle = getPageTitle(location.pathname);
  const userName = user?.name || SEEKER_PROFILE.name;
  const userInitial = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'RS';

  return (
    <div className={`seeker-layout-wrapper ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* 1. FIXED TOP PORTAL BAR (Independent of Collapsible Sidebar) */}
      <header className="seeker-top-bar">
        <div className="top-bar-left">
          <Link to="/seeker/dashboard" className="portal-logo-link" title="JobDekho Portal Home">
            <img
              src="/assets/jobdekho-logo.png"
              alt="JobDekho — Naukri Dekho, Future Banao."
              className="jobdekho-logo"
            />
          </Link>
        </div>

        <div className="top-bar-right">
          {/* THEME TOGGLE BUTTON */}
          <button
            type="button"
            className="icon-btn-notify theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} color="#f59e0b" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* NOTIFICATION BELL & DROPDOWN */}
          <div className="notification-bell-container" ref={notificationRef}>
            <button
              type="button"
              className={`icon-btn-notify ${showNotifications ? 'active' : ''}`}
              onClick={() => setShowNotifications((prev) => !prev)}
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={20} />
              {hasUnread && <span className="notify-badge-dot" />}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown-panel" role="dialog" aria-label="Notifications Panel">
                <div className="notifications-header">
                  <div className="flex items-center gap-2">
                    <span className="notif-title">Notifications</span>
                    {hasUnread && (
                      <span className="notif-unread-count">
                        {notifications.filter((n) => n.unread).length} new
                      </span>
                    )}
                  </div>
                  {hasUnread && (
                    <button
                      type="button"
                      className="btn-mark-all-read"
                      onClick={handleMarkAllRead}
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="notifications-list">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`notification-item ${item.unread ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(item.id)}
                    >
                      <div className="notif-item-left">
                        {item.unread && <span className="notif-blue-dot" />}
                        <div>
                          <div className="notif-item-title">{item.title}</div>
                          <div className="notif-item-msg">{item.message}</div>
                          <div className="notif-item-time">{item.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="notifications-footer">
                  <span className="notif-view-all-text">Showing recent updates</span>
                </div>
              </div>
            )}
          </div>

          {/* HEADER USER AVATAR */}
          <div className="header-user-profile">
            <div className="user-avatar-badge">
              {profilePhoto ? (
                <img src={profilePhoto} alt={userName} className="header-avatar-img" />
              ) : (
                userInitial
              )}
            </div>
            <div className="user-info-text desktop-only">
              <span className="user-name">{userName}</span>
              <span className="user-role">Job Seeker</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT: COLLAPSIBLE SIDEBAR + MAIN CONTENT AREA */}
      <div className="seeker-body-layout">
        {/* Reusable Collapsible SeekerSidebar */}
        <SeekerSidebar
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Main Content Area */}
        <div className="seeker-layout-main">
          <SeekerHeader
            title={headerTitle}
            isMobileSidebarOpen={isMobileOpen}
            onToggleMobileSidebar={handleToggleMobileSidebar}
            onToggleCollapse={handleToggleCollapse}
          />

          <main className="seeker-page-body">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default SeekerLayout;
