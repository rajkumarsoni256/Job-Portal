import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  X,
  Inbox,
  ExternalLink,
} from 'lucide-react';
import { SEEKER_PROFILE, RECENT_APPLICATIONS } from '../../data/seekerData';
import './ApplicationsPage.css';
import './JobSeekerDashboard.css';

/**
 * ApplicationsPage Component
 * My Applications dashboard page with tabs, filter by status, detail modal, and application timeline
 */
function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  const TABS = ['All', 'Applied', 'Under Review', 'Shortlisted', 'Rejected'];

  const getStatusBadgeClass = (variant) => {
    switch (variant) {
      case 'success':
        return 'status-badge status-success';
      case 'warning':
        return 'status-badge status-warning';
      case 'info':
        return 'status-badge status-info';
      case 'danger':
        return 'status-badge status-danger';
      default:
        return 'status-badge status-info';
    }
  };

  // Filter applications by tab
  const filteredApps = RECENT_APPLICATIONS.filter((app) => {
    if (activeTab === 'All') return true;
    return app.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Calculate count per tab
  const getTabCount = (tabName) => {
    if (tabName === 'All') return RECENT_APPLICATIONS.length;
    return RECENT_APPLICATIONS.filter(
      (app) => app.status.toLowerCase() === tabName.toLowerCase()
    ).length;
  };

  return (
    <div className="applications-page-content">
          {/* Heading */}
          <div className="page-title-group">
            <h2 className="section-title">My Applications</h2>
            <p className="section-subtitle">
              Monitor application statuses, screening updates, and interview schedules
            </p>
          </div>

          {/* Status Tabs Bar */}
          <div className="app-tabs-bar">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`app-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span>{tab}</span>
                <span className="tab-count-badge">{getTabCount(tab)}</span>
              </button>
            ))}
          </div>

          {/* Applications Table / Empty State */}
          <div className="applications-table-box">
            {filteredApps.length > 0 ? (
              <table className="app-table">
                <thead>
                  <tr>
                    <th>Job Position</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Applied Date</th>
                    <th>Resume Match</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app.id}>
                      <td style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                        <div className="flex flex-col">
                          <span>{app.jobTitle}</span>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center gap-2">
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 4,
                              backgroundColor: app.companyLogoBg,
                              color: '#fff',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {app.companyInitial}
                          </div>
                          <span>{app.company}</span>
                        </div>
                      </td>

                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {app.location}
                        </span>
                      </td>

                      <td style={{ color: 'var(--color-text-muted)' }}>{app.appliedDate}</td>

                      <td>
                        <span className="match-badge-pill" style={{ fontSize: '0.75rem' }}>
                          {app.resumeMatch}
                        </span>
                      </td>

                      <td>
                        <span className={getStatusBadgeClass(app.statusVariant)}>
                          {app.status}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-nav btn-outline"
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                          onClick={() => setSelectedApp(app)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              /* Empty State */
              <div className="jobs-empty-state">
                <div className="empty-icon-wrap">
                  <Inbox size={32} />
                </div>
                <h3 className="empty-title">No applications found</h3>
                <p className="empty-desc">
                  There are no job applications listed under <strong>"{activeTab}"</strong> status.
                </p>
                <Link to="/seeker/jobs" className="btn-nav btn-primary">
                  Browse Open Jobs
                </Link>
              </div>
            )}
          </div>

      {/* DETAILED APPLICATION MODAL */}
      {selectedApp && (
        <div className="app-modal-overlay" onClick={() => setSelectedApp(null)}>
          <div
            className="app-modal-card"
            style={{ maxWidth: 600 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="app-modal-header">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    backgroundColor: selectedApp.companyLogoBg,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedApp.companyInitial}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                    {selectedApp.jobTitle}
                  </h3>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                    {selectedApp.company} • {selectedApp.location}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="app-modal-close"
                onClick={() => setSelectedApp(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Application Info Chips */}
            <div
              className="flex items-center justify-between"
              style={{
                backgroundColor: 'var(--color-bg-app)',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-xs)',
              }}
            >
              <span>
                Applied: <strong>{selectedApp.appliedDate}</strong>
              </span>
              <span>
                Match Score:{' '}
                <strong style={{ color: 'var(--color-primary)' }}>{selectedApp.resumeMatch}</strong>
              </span>
              <span className={getStatusBadgeClass(selectedApp.statusVariant)}>
                {selectedApp.status}
              </span>
            </div>

            {/* Application Timeline Progress Stepper */}
            <div>
              <h4 style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '0.5rem' }}>
                Application Status Timeline
              </h4>

              <div className="timeline-stepper">
                {selectedApp.timeline.map((step, idx) => (
                  <div
                    key={step.step}
                    className={`timeline-stepper-row ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}
                  >
                    {idx < selectedApp.timeline.length - 1 && (
                      <div className="timeline-stepper-line" />
                    )}

                    <div className="timeline-stepper-node">
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="timeline-step-info">
                      <span className="timeline-step-name">{step.step}</span>
                      <span className="timeline-step-date">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Notes Banner */}
            {selectedApp.notes && (
              <div
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary-border)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-xs)',
                  color: 'var(--color-text-main)',
                }}
              >
                <strong>Status Update Note: </strong>
                {selectedApp.notes}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between" style={{ marginTop: 'var(--space-2)' }}>
              <Link
                to={`/seeker/jobs/${selectedApp.jobId}`}
                className="btn-nav btn-outline"
                style={{ fontSize: 'var(--font-xs)' }}
              >
                View Job Posting <ExternalLink size={13} style={{ marginLeft: 4 }} />
              </Link>
              <button
                type="button"
                className="btn-nav btn-primary"
                onClick={() => setSelectedApp(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;
