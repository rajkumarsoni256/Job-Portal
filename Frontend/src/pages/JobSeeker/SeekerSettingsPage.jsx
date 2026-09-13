import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Bell,
  Shield,
  Briefcase,
  AlertTriangle,
  Save,
  LogOut,
  Trash2,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Eye,
  MapPin,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { Container, Button, Card, Input, Badge } from '../../components/common';
import { AuthContext } from '../../context/AuthContext';
import './SeekerSettingsPage.css';

/**
 * Job Seeker Settings Page Component
 * Module — Comprehensive account, notification, privacy, and preference settings
 */
function SeekerSettingsPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [saveBanner, setSaveBanner] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Theme state synced with localStorage and event
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jobdekho_theme') || 'light';
  });

  useEffect(() => {
    const handleThemeUpdate = () => {
      setTheme(localStorage.getItem('jobdekho_theme') || 'light');
    };
    window.addEventListener('jobdekho-theme-updated', handleThemeUpdate);
    return () => window.removeEventListener('jobdekho-theme-updated', handleThemeUpdate);
  }, []);

  const handleSelectTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jobdekho_theme', newTheme);
    window.dispatchEvent(new Event('jobdekho-theme-updated'));
  };

  // Form State
  const [accountSettings, setAccountSettings] = useState({
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    currentPassword: '',
    newPassword: '',
  });

  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    recruiterMessages: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public', // 'public' | 'recruiters' | 'private'
    resumeVisibility: 'recruiters', // 'public' | 'recruiters' | 'private'
  });

  const [jobPrefs, setJobPrefs] = useState({
    preferredLocation: 'Bengaluru / Remote',
    preferredType: 'Full-time',
    preferredRole: 'Senior Full Stack Developer',
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setSaveBanner('Settings saved successfully!');
    setTimeout(() => setSaveBanner(''), 4000);
  };

  const handleLogout = () => {
    if (authContext && authContext.logout) {
      authContext.logout();
    }
    navigate('/login');
  };

  return (
    <div style={{ padding: 'var(--space-6, 1.5rem)' }}>
      <Container size="xl" className="settings-page-container">
          {saveBanner && (
            <div className="settings-success-banner">
              <CheckCircle2 size={18} className="text-success" />
              <span>{saveBanner}</span>
            </div>
          )}

          <form onSubmit={handleSaveAll} className="settings-form-layout">
            {/* 0. APPEARANCE & THEME SETTINGS */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Sun size={20} className="text-warning" /> Appearance & Theme
                  </span>
                }
                subtitle="Choose your preferred interface theme for the JobDekho portal"
              />
              <Card.Body className="settings-card-body">
                <div className="theme-options-grid flex gap-4">
                  <label
                    className={`theme-option-card ${theme === 'light' ? 'selected' : ''}`}
                    onClick={() => handleSelectTheme('light')}
                  >
                    <input
                      type="radio"
                      name="themePref"
                      value="light"
                      checked={theme === 'light'}
                      onChange={() => handleSelectTheme('light')}
                    />
                    <Sun size={20} className="theme-option-icon text-warning" />
                    <div>
                      <div className="theme-option-title">Light Mode</div>
                      <div className="theme-option-desc">Clean, classic bright interface</div>
                    </div>
                  </label>

                  <label
                    className={`theme-option-card ${theme === 'dark' ? 'selected' : ''}`}
                    onClick={() => handleSelectTheme('dark')}
                  >
                    <input
                      type="radio"
                      name="themePref"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={() => handleSelectTheme('dark')}
                    />
                    <Moon size={20} className="theme-option-icon text-primary" />
                    <div>
                      <div className="theme-option-title">Dark Mode</div>
                      <div className="theme-option-desc">Sleek, low-light dark slate interface</div>
                    </div>
                  </label>
                </div>
              </Card.Body>
            </Card>

            {/* 1. ACCOUNT SETTINGS */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <User size={20} className="text-primary" /> Account Settings
                  </span>
                }
                subtitle="Update your contact email, phone number, and security password"
              />
              <Card.Body className="settings-card-body">
                <div className="form-row-2">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={accountSettings.email}
                    onChange={handleAccountChange}
                    iconLeft={<Mail size={18} className="text-muted" />}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={accountSettings.phone}
                    onChange={handleAccountChange}
                    iconLeft={<Phone size={18} className="text-muted" />}
                  />
                </div>

                <div className="form-row-2" style={{ marginTop: 'var(--space-4)' }}>
                  <Input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    placeholder="Enter current password to change"
                    value={accountSettings.currentPassword}
                    onChange={handleAccountChange}
                    iconLeft={<Lock size={18} className="text-muted" />}
                  />
                  <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={accountSettings.newPassword}
                    onChange={handleAccountChange}
                    iconLeft={<Lock size={18} className="text-muted" />}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* 2. NOTIFICATION PREFERENCES */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Bell size={20} className="text-warning" /> Notification Preferences
                  </span>
                }
                subtitle="Choose what notifications and email updates you want to receive"
              />
              <Card.Body className="toggles-grid">
                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">Job Alerts</h4>
                    <p className="toggle-desc">Get notified when new jobs matching your profile are posted.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.jobAlerts}
                    onChange={() => handleNotificationToggle('jobAlerts')}
                  />
                </div>

                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">Application Updates</h4>
                    <p className="toggle-desc">Receive real-time status updates when recruiters view or update your applications.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.applicationUpdates}
                    onChange={() => handleNotificationToggle('applicationUpdates')}
                  />
                </div>

                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">Recruiter Messages</h4>
                    <p className="toggle-desc">Allow recruiters to contact you directly with job invitations.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.recruiterMessages}
                    onChange={() => handleNotificationToggle('recruiterMessages')}
                  />
                </div>

                <div className="toggle-item">
                  <div>
                    <h4 className="toggle-title">Marketing & Newsletters</h4>
                    <p className="toggle-desc">Receive career tips, market trends, and JobDekho product updates.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={notifications.marketingEmails}
                    onChange={() => handleNotificationToggle('marketingEmails')}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* 3. PRIVACY SETTINGS */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Shield size={20} className="text-info" /> Privacy Settings
                  </span>
                }
                subtitle="Control who can view your profile and resume details"
              />
              <Card.Body className="settings-card-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="input-label">Profile Visibility</label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy((prev) => ({ ...prev, profileVisibility: e.target.value }))}
                      className="custom-select"
                    >
                      <option value="public">Public (Visible to everyone)</option>
                      <option value="recruiters">Verified Recruiters Only</option>
                      <option value="private">Private (Hidden from search)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="input-label">Resume Visibility</label>
                    <select
                      value={privacy.resumeVisibility}
                      onChange={(e) => setPrivacy((prev) => ({ ...prev, resumeVisibility: e.target.value }))}
                      className="custom-select"
                    >
                      <option value="public">Public Searchable</option>
                      <option value="recruiters">Only Employers I Apply To</option>
                      <option value="private">Private Only</option>
                    </select>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* 4. JOB PREFERENCES */}
            <Card variant="default" padding="lg" className="settings-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Briefcase size={20} className="text-success" /> Job Preferences
                  </span>
                }
                subtitle="Help us recommend the most relevant job opportunities for you"
              />
              <Card.Body className="settings-card-body">
                <div className="form-row-3">
                  <Input
                    label="Preferred Target Role"
                    value={jobPrefs.preferredRole}
                    onChange={(e) => setJobPrefs((prev) => ({ ...prev, preferredRole: e.target.value }))}
                    iconLeft={<Briefcase size={16} className="text-muted" />}
                  />
                  <Input
                    label="Preferred Location"
                    value={jobPrefs.preferredLocation}
                    onChange={(e) => setJobPrefs((prev) => ({ ...prev, preferredLocation: e.target.value }))}
                    iconLeft={<MapPin size={16} className="text-muted" />}
                  />
                  <div className="form-group">
                    <label className="input-label">Preferred Job Type</label>
                    <select
                      value={jobPrefs.preferredType}
                      onChange={(e) => setJobPrefs((prev) => ({ ...prev, preferredType: e.target.value }))}
                      className="custom-select"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract / Freelance</option>
                      <option value="Remote">Remote Only</option>
                    </select>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* SAVE BUTTON TOOLBAR */}
            <div className="settings-save-toolbar">
              <Button type="submit" variant="primary" size="lg" iconLeft={<Save size={18} />}>
                Save All Changes
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
              subtitle="Irreversible actions regarding your account"
            />
            <Card.Body className="danger-zone-body">
              <div className="danger-action-row">
                <div>
                  <h4 className="danger-action-title">Log Out of Account</h4>
                  <p className="danger-action-desc">Sign out of your active session on this device.</p>
                </div>
                <Button variant="outline" iconLeft={<LogOut size={16} />} onClick={handleLogout}>
                  Logout
                </Button>
              </div>

              <div className="danger-action-row" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-error-border)' }}>
                <div>
                  <h4 className="danger-action-title text-error">Delete Account</h4>
                  <p className="danger-action-desc">Permanently remove your account, profile, resume, and application history.</p>
                </div>
                <Button variant="danger" iconLeft={<Trash2 size={16} />} onClick={() => setShowDeleteModal(true)}>
                  Delete Account
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* DELETE ACCOUNT CONFIRMATION MODAL */}
          {showDeleteModal && (
            <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3 className="text-error flex items-center gap-2">
                    <AlertTriangle size={20} /> Delete Account Confirmation
                  </h3>
                  <button type="button" className="close-btn" onClick={() => setShowDeleteModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete your account? This action is permanent and cannot be undone.</p>
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
                    Yes, Delete My Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
    </div>
  );
}

export default SeekerSettingsPage;
