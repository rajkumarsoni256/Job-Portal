import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { ADMIN_ALL_JOBS } from '../../data/adminData';
import './AdminUsersPage.css';
import './AdminDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * Admin Job Management Page
 * Route: /admin/jobs
 */
function AdminJobsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState(ADMIN_ALL_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateJobStatus = (jobId, newStatus, newVariant) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          showToast(`Job "${j.title}" updated to status: ${newStatus}.`);
          return { ...j, status: newStatus, statusVariant: newVariant };
        }
        return j;
      })
    );
  };

  const deleteJob = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    showToast(`Job listing removed permanently.`);
    setSelectedJob(null);
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.recruiter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || j.status === statusFilter;
    const matchesType = jobTypeFilter === 'All' || j.jobType === jobTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalCount = jobs.length;
  const activeCount = jobs.filter((j) => j.status === 'Active').length;
  const pendingCount = jobs.filter((j) => j.status === 'Pending').length;
  const closedCount = jobs.filter((j) => j.status === 'Closed' || j.status === 'Flagged').length;

  return (
    <div className="admin-dashboard-layout">
      <DashboardSidebar
        role="admin"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        <DashboardHeader
          title="Job Management"
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

          {/* SUMMARY CARDS */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Total Listings</span>
                <div className="admin-stat-icon"><Briefcase size={20} /></div>
              </div>
              <div className="admin-stat-val">{totalCount}</div>
              <div className="admin-stat-sub">Platform wide</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Active Postings</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}><CheckCircle2 size={20} /></div>
              </div>
              <div className="admin-stat-val">{activeCount}</div>
              <div className="admin-stat-sub">Live & accepting applications</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Pending Moderation</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}><Clock size={20} /></div>
              </div>
              <div className="admin-stat-val">{pendingCount}</div>
              <div className="admin-stat-sub">Awaiting verification</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Closed / Flagged</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}><XCircle size={20} /></div>
              </div>
              <div className="admin-stat-val">{closedCount}</div>
              <div className="admin-stat-sub">Inactive or flagged</div>
            </div>
          </div>

          {/* CONTROLS & TABLE */}
          <div className="admin-table-card">
            <div className="admin-filter-bar">
              <div className="admin-search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search by job title, company, or recruiter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-filter-selectors">
                <div className="filter-select-group">
                  <Filter size={16} />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                    <option value="Flagged">Flagged</option>
                  </select>
                </div>

                <div className="filter-select-group">
                  <select value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)}>
                    <option value="All">All Job Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
            </div>

            <table className="app-table">
              <thead>
                <tr>
                  <th>Job Title & Company</th>
                  <th>Recruiter</th>
                  <th>Location</th>
                  <th>Posted Date</th>
                  <th>Applicants</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                      No job postings match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((j) => (
                    <tr key={j.id}>
                      <td>
                        <div className="flex flex-col">
                          <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>{j.title}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>{j.company} • {j.jobType}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>{j.recruiter}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{j.location}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{j.posted}</td>
                      <td style={{ fontWeight: 700 }}>{j.applicants}</td>
                      <td>
                        <span className={`status-badge status-${j.statusVariant}`}>
                          {j.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="btn-icon-action"
                            title="View Job Details"
                            onClick={() => setSelectedJob(j)}
                          >
                            <Eye size={16} />
                          </button>
                          {j.status !== 'Active' && (
                            <button
                              type="button"
                              className="btn-icon-action success"
                              title="Approve Job"
                              onClick={() => updateJobStatus(j.id, 'Active', 'success')}
                            >
                              <Check size={16} />
                            </button>
                          )}
                          {j.status === 'Active' && (
                            <button
                              type="button"
                              className="btn-icon-action danger"
                              title="Close Job"
                              onClick={() => updateJobStatus(j.id, 'Closed', 'info')}
                            >
                              <X size={16} />
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn-icon-action danger"
                            title="Delete Job"
                            onClick={() => deleteJob(j.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* JOB MODAL */}
      {selectedJob && (
        <div className="app-modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="app-modal-card" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{selectedJob.title}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>{selectedJob.company}</span>
              </div>
              <button type="button" className="app-modal-close" onClick={() => setSelectedJob(null)}>✕</button>
            </div>

            <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <div><strong>Job ID:</strong> {selectedJob.id}</div>
              <div><strong>Recruiter Contact:</strong> {selectedJob.recruiter}</div>
              <div><strong>Location:</strong> {selectedJob.location} ({selectedJob.jobType})</div>
              <div><strong>Total Submissions:</strong> {selectedJob.applicants} candidates</div>
              <div><strong>Status:</strong> <span className={`status-badge status-${selectedJob.statusVariant}`}>{selectedJob.status}</span></div>
              <div><strong>Posted Date:</strong> {selectedJob.posted}</div>
            </div>

            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn-nav btn-outline" onClick={() => setSelectedJob(null)}>Close</button>
              <button
                type="button"
                className="btn-nav btn-danger"
                onClick={() => deleteJob(selectedJob.id)}
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJobsPage;
