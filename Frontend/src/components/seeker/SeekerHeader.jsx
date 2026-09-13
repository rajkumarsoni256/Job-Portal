import React from 'react';
import { Menu } from 'lucide-react';
import '../dashboard/DashboardHeader.css';

/**
 * SeekerHeader Component
 * Sub-header bar for authenticated Job Seeker pages with hamburger toggle button beside the current page title
 */
function SeekerHeader({
  title = 'Dashboard Overview',
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
    <header className="dashboard-header-bar seeker-sub-header">
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
    </header>
  );
}

export default SeekerHeader;
