import React from 'react';
import { Menu, X, Bell } from 'lucide-react';
import './DashboardHeader.css';

/**
 * Reusable DashboardHeader Component
 */
function DashboardHeader({
  title = 'Dashboard',
  userName = 'Raj Kumar',
  userRole = 'Job Seeker',
  userInitial = 'RK',
  isMobileSidebarOpen = false,
  onToggleMobileSidebar,
}) {
  const handleToggle = () => {
    if (window.innerWidth > 900) {
      const isCurrentlyCollapsed = localStorage.getItem('jobdekho_sidebar_collapsed') === 'true';
      localStorage.setItem('jobdekho_sidebar_collapsed', isCurrentlyCollapsed ? 'false' : 'true');
      window.dispatchEvent(new Event('sidebar-toggle'));
    } else if (onToggleMobileSidebar) {
      onToggleMobileSidebar();
    }
  };

  return (
    <header className="dashboard-header-bar">
      <div className="dashboard-header-left">
        <button
          type="button"
          className="dashboard-menu-toggle"
          onClick={handleToggle}
          aria-label="Toggle navigation sidebar"
          title="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        <h1 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
          {title}
        </h1>
      </div>

      <div className="dashboard-header-right">
        <button type="button" className="icon-btn-notify" aria-label="Notifications">
          <Bell size={20} />
          <span className="notify-badge-dot" />
        </button>

        <div className="header-user-profile">
          <div className="user-avatar-badge">{userInitial}</div>
          <div className="user-info-text desktop-only">
            <span className="user-name">{userName}</span>
            <span className="user-role">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
