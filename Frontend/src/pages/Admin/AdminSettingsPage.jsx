import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Bell,
  Sliders,
  CheckCircle,
  Save,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import './AdminUsersPage.css';
import './AdminDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * Admin System Settings Page
 * Route: /admin/settings
 */
function AdminSettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [toastMessage, setToastMessage] = useState('');

  const [settings, setSettings] = useState({
    siteName: 'JobDekho',
    supportEmail: 'admin@jobdekho.com',
    allowRegistrations: true,
    maintenanceMode: false,
    autoApproveJobs: false,
    aiMatchThreshold: '75',
    maxJobsPerRecruiter: '50',
    emailNotifications: true,
    weeklyReportEmail: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage('Platform settings saved successfully.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="admin-dashboard-layout">
      <DashboardSidebar
        role="admin"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        <DashboardHeader
          title="Platform Settings"
          userName="System Admin"
          userRole="Platform Administrator"
          userInitial="AD"
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="admin-dashboard-content">
          {toastMessage && (
            <div className="admin-toast-banner">
              <CheckCircle size={18} /> {toastMessage}
            </div>
          )}

          {/* SETTINGS TABS */}
          <div className="category-tabs-row" style={{ marginBottom: 'var(--space-4)' }}>
            <button
              type="button"
              className={`cat-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <Settings size={18} /> General Controls
            </button>
            <button
              type="button"
              className={`cat-tab ${activeTab === 'moderation' ? 'active' : ''}`}
              onClick={() => setActiveTab('moderation')}
            >
              <Sliders size={18} /> Moderation & AI
            </button>
            <button
              type="button"
              className={`cat-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Email & Alerts
            </button>
          </div>

          <form onSubmit={handleSave} className="admin-table-card">
            {activeTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>General Platform Configuration</h3>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>Platform Branding Name</label>
                  <input
                    type="text"
                    name="siteName"
                    className="admin-search-input"
                    value={settings.siteName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>System Support Email</label>
                  <input
                    type="email"
                    name="supportEmail"
                    className="admin-search-input"
                    value={settings.supportEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center justify-between" style={{ padding: '0.75rem 0', borderTop: '1px solid var(--color-border)' }}>
                  <div>
                    <strong style={{ display: 'block' }}>Allow User Registrations</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Enable new candidates and recruiters to sign up.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowRegistrations}
                    onChange={() => handleToggle('allowRegistrations')}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                </div>

                <div className="flex items-center justify-between" style={{ padding: '0.75rem 0', borderTop: '1px solid var(--color-border)' }}>
                  <div>
                    <strong style={{ display: 'block', color: settings.maintenanceMode ? '#dc2626' : 'inherit' }}>Maintenance Mode</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Temporarily restrict non-admin logins.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={() => handleToggle('maintenanceMode')}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'moderation' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>Moderation & AI Engine Rules</h3>

                <div className="flex items-center justify-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div>
                    <strong style={{ display: 'block' }}>Auto-Approve Job Postings</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Bypass admin moderation queue for verified recruiters.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoApproveJobs}
                    onChange={() => handleToggle('autoApproveJobs')}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>AI Resume Match Minimum Score Threshold (%)</label>
                  <input
                    type="number"
                    name="aiMatchThreshold"
                    className="admin-search-input"
                    value={settings.aiMatchThreshold}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600 }}>Max Active Jobs Per Recruiter Account</label>
                  <input
                    type="number"
                    name="maxJobsPerRecruiter"
                    className="admin-search-input"
                    value={settings.maxJobsPerRecruiter}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>System Notifications & Audit Trail</h3>

                <div className="flex items-center justify-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div>
                    <strong style={{ display: 'block' }}>Email Security Alerts</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Send instant emails when high-risk content or user reports are filed.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                </div>

                <div className="flex items-center justify-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div>
                    <strong style={{ display: 'block' }}>Weekly System Digest</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Receive automated performance summary metrics every Monday.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.weeklyReportEmail}
                    onChange={() => handleToggle('weeklyReportEmail')}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                </div>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                className="btn-nav btn-primary"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}
              >
                <Save size={18} style={{ marginRight: 6 }} /> Save System Settings
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default AdminSettingsPage;
