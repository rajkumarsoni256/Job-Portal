import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Bell,
  Briefcase,
  Lock,
  AlertTriangle,
  Save,
  LogOut,
  Trash2,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  X,
} from 'lucide-react';
import { Container, Button, Card, Input, Badge } from '../../components/common';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { AuthContext } from '../../context/AuthContext';
import './RecruiterSettingsPage.css';

/**
 * Recruiter Settings Page Component
 * Module — Account, notifications, hiring preferences, security & danger zone for recruiters
 */
function RecruiterSettingsPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [saveBanner, setSaveBanner] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form State
  const [account, setAccount] = useState({
    name: 'Vikram Mehta',
    email: 'vikram.mehta@techcorp.com',
    phone: '+91 98123 45678',
  });

  const [notifications, setNotifications] = useState({
    newApplications: true,
    candidateMessages: true,
    hiringAlerts: true,
    productUpdates: false,
  });

  const [hiringPrefs, setHiringPrefs] = useState({
    defaultType: 'Full-time',
    candidateNotif: 'immediate', // 'immediate' | 'daily' | 'never'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setSaveBanner('Recruiter settings updated successfully!');
    setTimeout(() => setSaveBanner(''), 4000);
  };

  const handleLogout = () => {
    if (authContext && authContext.logout) {
      authContext.logout();
    }
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Recruiter Sidebar */}
      <DashboardSidebar role="recruiter" />

      <main className="dashboard-main-content">
        <DashboardHeader
          title="Recruiter Settings"
          subtitle="Manage your personal recruiter account, notification alerts, hiring preferences, and security"
        />

        <Container size="xl" className="recruiter-settings-container">
          {saveBanner && (
            <div className="settings-success-banner">
              <CheckCircle2 size={18} className="text-success" />
              <span>{saveBanner}</span>
            </div>
          )}

          <form onSubmit={handleSaveAll} className="settings-form-layout">
            {/* 1. ACCOUNT */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <User size={20} className="text-primary" /> Recruiter Account Info
                  </span>
                }
                subtitle="Your name and contact details associated with company hiring"
              />
              <Card.Body className="settings-card-body">
                <div className="form-row-3">
                  <Input
                    label="Recruiter Name"
                    name="name"
                    value={account.name}
                    onChange={handleAccountChange}
                    iconLeft={<User size={16} className="text-muted" />}
                    required
                  />
                  <Input
                    label="Corporate Email"
                    name="email"
                    type="email"
                    value={account.email}
                    onChange={handleAccountChange}
                    iconLeft={<Mail size={16} className="text-muted" />}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={account.phone}
                    onChange={handleAccountChange}
                    iconLeft={<Phone size={16} className="text-muted" />}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* 2. NOTIFICATIONS */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Bell size={20} className="text-warning" /> Notification Preferences
                  </span>
                }
                subtitle="Stay updated on applicant activity and candidate messages"
              />
              <Card.Body className="toggles-grid">
                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">New Applications</h4>
                    <p className="toggle-desc">Receive instant email alerts when a candidate applies to your jobs.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.newApplications}
                    onChange={() => handleNotificationToggle('newApplications')}
                  />
                </div>

                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">Candidate Messages</h4>
                    <p className="toggle-desc">Get notified when shortlisted candidates reply to your messages.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.candidateMessages}
                    onChange={() => handleNotificationToggle('candidateMessages')}
                  />
                </div>

                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">Hiring & Interview Alerts</h4>
                    <p className="toggle-desc">Reminders for scheduled candidate interviews and task reviews.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.hiringAlerts}
                    onChange={() => handleNotificationToggle('hiringAlerts')}
                  />
                </div>

                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">Product & Feature Updates</h4>
                    <p className="toggle-desc">News about JobDekho recruiter tools and platform enhancements.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.productUpdates}
                    onChange={() => handleNotificationToggle('productUpdates')}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* 3. HIRING PREFERENCES */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Briefcase size={20} className="text-info" /> Hiring Preferences
                  </span>
                }
                subtitle="Configure default job posting defaults and applicant communication settings"
              />
              <Card.Body className="settings-card-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="input-label">Default Job Type for Postings</label>
                    <select
                      value={hiringPrefs.defaultType}
                      onChange={(e) => setHiringPrefs((prev) => ({ ...prev, defaultType: e.target.value }))}
                      className="custom-select"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract / Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="input-label">Candidate Status Notification Preference</label>
                    <select
                      value={hiringPrefs.candidateNotif}
                      onChange={(e) => setHiringPrefs((prev) => ({ ...prev, candidateNotif: e.target.value }))}
                      className="custom-select"
                    >
                      <option value="immediate">Send immediate confirmation emails to applicants</option>
                      <option value="daily">Send daily digest to applicants</option>
                      <option value="never">Do not send automated emails</option>
                    </select>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* 4. SECURITY */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Lock size={20} className="text-primary" /> Security & Password
                  </span>
                }
                subtitle="Change your password to keep your recruiter workspace secure"
              />
              <Card.Body className="settings-card-body">
                <div className="form-row-2">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    iconLeft={<Lock size={16} className="text-muted" />}
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity((prev) => ({ ...prev, newPassword: e.target.value }))}
                    iconLeft={<Lock size={16} className="text-muted" />}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* SAVE BUTTON TOOLBAR */}
            <div className="settings-save-toolbar">
              <Button type="submit" variant="primary" size="lg" iconLeft={<Save size={18} />}>
                Save Changes
              </Button>
            </div>
          </form>

          {/* 5. DANGER ZONE */}
          <Card variant="default" padding="lg" className="danger-zone-card">
            <Card.Header
              title={
                <span className="section-title-with-icon text-error">
                  <AlertTriangle size={20} /> Danger Zone
                </span>
              }
              subtitle="Irreversible recruiter account options"
            />
            <Card.Body className="danger-zone-body">
              <div className="danger-action-row">
                <div>
                  <h4 className="danger-action-title">Log Out</h4>
                  <p className="danger-action-desc">Sign out of your active recruiter workspace session.</p>
                </div>
                <Button variant="outline" iconLeft={<LogOut size={16} />} onClick={handleLogout}>
                  Logout
                </Button>
              </div>

              <div className="danger-action-row" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-error-border)' }}>
                <div>
                  <h4 className="danger-action-title text-error">Delete Recruiter Account</h4>
                  <p className="danger-action-desc">Permanently remove your recruiter account and active job postings.</p>
                </div>
                <Button variant="danger" iconLeft={<Trash2 size={16} />} onClick={() => setShowDeleteModal(true)}>
                  Delete Account
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* DELETE ACCOUNT MODAL */}
          {showDeleteModal && (
            <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3 className="text-error flex items-center gap-2">
                    <AlertTriangle size={20} /> Confirm Account Deletion
                  </h3>
                  <button type="button" className="close-btn" onClick={() => setShowDeleteModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete your recruiter account? Active job postings and candidate lists will be unlinked (Demo Only).</p>
                </div>
                <div className="modal-footer">
                  <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSaveBanner('Account deletion request acknowledged (Demo Only).');
                    }}
                  >
                    Yes, Delete Recruiter Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}

export default RecruiterSettingsPage;
