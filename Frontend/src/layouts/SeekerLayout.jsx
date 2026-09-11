import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SeekerSidebar from '../components/seeker/SeekerSidebar';
import SeekerHeader from '../components/seeker/SeekerHeader';
import { AuthContext } from '../context/AuthContext';
import { SEEKER_PROFILE } from '../data/seekerData';
import './SeekerLayout.css';

/**
 * SeekerLayout Component
 * Unified layout wrapper for all authenticated Job Seeker pages
 * Structure:
 * SeekerLayout
 * ├── SeekerSidebar (fixed 100vh)
 * ├── SeekerHeader (sticky header bar with hamburger collapse toggle)
 * └── Scrollable Main Content (<Outlet />)
 */
function SeekerLayout() {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  // Sidebar collapse state (persisted in localStorage)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('jobdekho_sidebar_collapsed') === 'true';
  });

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <div className={`seeker-layout-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Reusable Fixed SeekerSidebar */}
      <SeekerSidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="seeker-layout-main">
        <SeekerHeader
          title={headerTitle}
          userName={userName}
          userRole="Job Seeker"
          userInitial={userInitial}
          isMobileSidebarOpen={isMobileOpen}
          onToggleMobileSidebar={handleToggleMobileSidebar}
          onToggleCollapse={handleToggleCollapse}
        />

        <main className="seeker-page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SeekerLayout;
