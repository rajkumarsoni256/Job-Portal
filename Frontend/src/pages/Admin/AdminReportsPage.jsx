import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Search,
  Filter,
  Eye,
  Check,
  X,
  CheckCircle,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { ADMIN_ALL_REPORTS } from '../../data/adminData';
import './AdminUsersPage.css';
import './AdminDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * Admin Reports & Moderation Page
 * Route: /admin/reports
 */
function AdminReportsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [reports, setReports] = useState(ADMIN_ALL_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateReportStatus = (reportId, newStatus, newVariant) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          showToast(`Report ${r.id} marked as ${newStatus.toLowerCase()}.`);
          return { ...r, status: newStatus, statusVariant: newVariant };
        }
        return r;
      })
    );
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === 'Pending').length;
  const resolvedCount = reports.filter((r) => r.status === 'Resolved').length;

  return (
    <div className="admin-dashboard-layout">
      <DashboardSidebar
        role="admin"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        <DashboardHeader
          title="Moderation & Reports"
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

          {/* STATS OVERVIEW */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Total Reports</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}><AlertTriangle size={20} /></div>
              </div>
              <div className="admin-stat-val">{totalCount}</div>
              <div className="admin-stat-sub">User flags & audits</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Pending Review</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}><Clock size={20} /></div>
              </div>
              <div className="admin-stat-val">{pendingCount}</div>
              <div className="admin-stat-sub">Action needed</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Resolved Reports</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}><CheckCircle2 size={20} /></div>
              </div>
              <div className="admin-stat-val">{resolvedCount}</div>
              <div className="admin-stat-sub">Audit completed</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Security Status</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}><ShieldAlert size={20} /></div>
              </div>
              <div className="admin-stat-val">Clean</div>
              <div className="admin-stat-sub">Zero critical breaches</div>
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
                  placeholder="Search report subject, reporter, or target..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-filter-selectors">
                <div className="filter-select-group">
                  <Filter size={16} />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            <table className="app-table">
              <thead>
                <tr>
                  <th>Report ID & Subject</th>
                  <th>Reported By</th>
                  <th>Target Object</th>
                  <th>Violation Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                      No reports match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div className="flex flex-col">
                          <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>{r.subject}</span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{r.id}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{r.reportedBy}</td>
                      <td style={{ fontSize: '0.85rem', fontWeight: 600 }}>{r.target}</td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', backgroundColor: '#fff7ed', padding: '0.15rem 0.5rem', borderRadius: 4, border: '1px solid #ffedd5' }}>
                          {r.type}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{r.date}</td>
                      <td>
                        <span className={`status-badge status-${r.statusVariant}`}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="btn-icon-action"
                            title="Inspect Report"
                            onClick={() => setSelectedReport(r)}
                          >
                            <Eye size={16} />
                          </button>
                          {r.status !== 'Resolved' && (
                            <button
                              type="button"
                              className="btn-icon-action success"
                              title="Resolve Flag"
                              onClick={() => updateReportStatus(r.id, 'Resolved', 'success')}
                            >
                              <Check size={16} />
                            </button>
                          )}
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

      {/* REPORT MODAL */}
      {selectedReport && (
        <div className="app-modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="app-modal-card" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{selectedReport.subject}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ID: {selectedReport.id}</span>
              </div>
              <button type="button" className="app-modal-close" onClick={() => setSelectedReport(null)}>✕</button>
            </div>

            <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <div><strong>Reported By:</strong> {selectedReport.reportedBy}</div>
              <div><strong>Target Object:</strong> {selectedReport.target}</div>
              <div><strong>Category:</strong> {selectedReport.type}</div>
              <div><strong>Filing Date:</strong> {selectedReport.date}</div>
              <div><strong>Status:</strong> <span className={`status-badge status-${selectedReport.statusVariant}`}>{selectedReport.status}</span></div>
            </div>

            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn-nav btn-outline" onClick={() => setSelectedReport(null)}>Close</button>
              {selectedReport.status !== 'Resolved' && (
                <button
                  type="button"
                  className="btn-nav btn-primary"
                  onClick={() => {
                    updateReportStatus(selectedReport.id, 'Resolved', 'success');
                    setSelectedReport(null);
                  }}
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminReportsPage;
