import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Clock,
  UserCheck,
  XCircle,
  Search,
  Filter,
  Eye,
  CheckCircle,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { ADMIN_ALL_APPLICATIONS } from '../../data/adminData';
import './AdminUsersPage.css';
import './AdminDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * Admin Applications Management Page
 * Route: /admin/applications
 */
function AdminApplicationsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [applications, setApplications] = useState(ADMIN_ALL_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateAppStatus = (appId, newStatus, newVariant) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          showToast(`Application #${appId} status updated to: ${newStatus}.`);
          return { ...a, status: newStatus, statusVariant: newVariant };
        }
        return a;
      })
    );
  };

  const filteredApps = applications.filter((a) => {
    const matchesSearch =
      a.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.appliedJob.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = applications.length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const reviewCount = applications.filter((a) => a.status === 'Under Review').length;
  const hiredCount = applications.filter((a) => a.status === 'Hired').length;

  return (
    <div className="admin-dashboard-layout">
      <DashboardSidebar
        role="admin"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        <DashboardHeader
          title="Application Management"
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

          {/* STATS SUMMARY */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Total Submissions</span>
                <div className="admin-stat-icon"><Send size={20} /></div>
              </div>
              <div className="admin-stat-val">{totalCount}</div>
              <div className="admin-stat-sub">Across all job postings</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Under Review</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}><Clock size={20} /></div>
              </div>
              <div className="admin-stat-val">{reviewCount}</div>
              <div className="admin-stat-sub">Awaiting recruiter response</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Shortlisted Candidates</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#f5f3ff', color: '#635bff' }}><UserCheck size={20} /></div>
              </div>
              <div className="admin-stat-val">{shortlistedCount}</div>
              <div className="admin-stat-sub">In interview pipelines</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Hired Talent</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}><CheckCircle2 size={20} /></div>
              </div>
              <div className="admin-stat-val">{hiredCount}</div>
              <div className="admin-stat-sub">Successful placements</div>
            </div>
          </div>

          {/* TABLE & FILTERS */}
          <div className="admin-table-card">
            <div className="admin-filter-bar">
              <div className="admin-search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search applicant name, job title, company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-filter-selectors">
                <div className="filter-select-group">
                  <Filter size={16} />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Application Statuses</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <table className="app-table">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Applied Position</th>
                  <th>Target Company</th>
                  <th>Applied Date</th>
                  <th>Match Score</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                      No applications match your filter choices.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>{a.applicantName}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>{a.appliedJob}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>{a.company}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{a.appliedDate}</td>
                      <td>
                        <span className="match-badge-pill">{a.matchScore}</span>
                      </td>
                      <td>
                        <span className={`status-badge status-${a.statusVariant}`}>
                          {a.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-icon-action"
                          title="View Application Details"
                          onClick={() => setSelectedApp(a)}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* APPLICATION MODAL */}
      {selectedApp && (
        <div className="app-modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="app-modal-card" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{selectedApp.applicantName}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{selectedApp.appliedJob} @ {selectedApp.company}</span>
              </div>
              <button type="button" className="app-modal-close" onClick={() => setSelectedApp(null)}>✕</button>
            </div>

            <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <div><strong>Application ID:</strong> {selectedApp.id}</div>
              <div><strong>AI Match Score:</strong> {selectedApp.matchScore}</div>
              <div><strong>Current Status:</strong> <span className={`status-badge status-${selectedApp.statusVariant}`}>{selectedApp.status}</span></div>
              <div><strong>Submission Date:</strong> {selectedApp.appliedDate}</div>
            </div>

            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn-nav btn-outline" onClick={() => setSelectedApp(null)}>Close</button>
              <button
                type="button"
                className="btn-nav btn-primary"
                onClick={() => {
                  updateAppStatus(selectedApp.id, 'Shortlisted', 'success');
                  setSelectedApp(null);
                }}
              >
                Shortlist Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminApplicationsPage;
