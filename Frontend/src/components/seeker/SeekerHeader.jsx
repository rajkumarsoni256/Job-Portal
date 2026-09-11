import React from 'react';
import { Menu, Bell } from 'lucide-react';
import '../dashboard/DashboardHeader.css';

/**
 * SeekerHeader Component
 * Top header bar for authenticated Job Seeker pages with title, toggle menu button, notifications & profile badge
 */
function SeekerHeader({
  title = 'Dashboard Overview',
  userName = 'Rahul Sharma',
  userRole = 'Job Seeker',
  userInitial = 'RS',
  isMobileSidebarOpen = false,
  onToggleMobileSidebar,
  onToggleCollapse,
}) {
  const handleToggle = () => {
    if (window.innerWidth > 900) {
      if (onToggleCollapse) {
        onToggleCollapse();
      } else {
        const isCurrentlyCollapsed = localStorage.getItem('jobdekho_sidebar_collapsed') === 'true';
        localStorage.setItem('jobdekho_sidebar_collapsed', isCurrentlyCollapsed ? 'false' : 'true');
        window.dispatchEvent(new Event('sidebar-toggle'));
      }
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

export default SeekerHeader;
