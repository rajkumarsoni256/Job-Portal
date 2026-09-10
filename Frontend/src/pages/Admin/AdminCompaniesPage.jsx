import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertOctagon,
  Search,
  Filter,
  Eye,
  Check,
  Ban,
  CheckCircle,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { ADMIN_ALL_COMPANIES } from '../../data/adminData';
import './AdminUsersPage.css';
import './AdminDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * Admin Company Management Page
 * Route: /admin/companies
 */
function AdminCompaniesPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [companies, setCompanies] = useState(ADMIN_ALL_COMPANIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateVerification = (companyId, newStatus, newVariant) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          showToast(`Company "${c.name}" updated to: ${newStatus}.`);
          return { ...c, verificationStatus: newStatus, statusVariant: newVariant };
        }
        return c;
      })
    );
  };

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = companies.length;
  const verifiedCount = companies.filter((c) => c.verificationStatus === 'Verified').length;
  const pendingCount = companies.filter((c) => c.verificationStatus === 'Pending').length;
  const suspendedCount = companies.filter((c) => c.verificationStatus === 'Suspended').length;

  return (
    <div className="admin-dashboard-layout">
      <DashboardSidebar
        role="admin"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        <DashboardHeader
          title="Company Management"
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
                <span className="admin-stat-title">Total Companies</span>
                <div className="admin-stat-icon"><Building2 size={20} /></div>
              </div>
              <div className="admin-stat-val">{totalCount}</div>
              <div className="admin-stat-sub">Registered accounts</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Verified Badges</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}><CheckCircle2 size={20} /></div>
              </div>
              <div className="admin-stat-val">{verifiedCount}</div>
              <div className="admin-stat-sub">Official employers</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Pending Verification</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}><Clock size={20} /></div>
              </div>
              <div className="admin-stat-val">{pendingCount}</div>
              <div className="admin-stat-sub">Action required</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Suspended Accounts</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}><AlertOctagon size={20} /></div>
              </div>
              <div className="admin-stat-val">{suspendedCount}</div>
              <div className="admin-stat-sub">Blacklisted corporate logins</div>
            </div>
          </div>

          {/* FILTER & TABLE */}
          <div className="admin-table-card">
            <div className="admin-filter-bar">
              <div className="admin-search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search company name, industry, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-filter-selectors">
                <div className="filter-select-group">
                  <Filter size={16} />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Verification Statuses</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <table className="app-table">
              <thead>
                <tr>
                  <th>Company Profile</th>
                  <th>Industry</th>
                  <th>Location</th>
                  <th>Jobs Posted</th>
                  <th>Verification</th>
                  <th>Joined Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                      No companies match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredCompanies.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="candidate-avatar" style={{ backgroundColor: c.logoBg }}>
                            {c.initials}
                          </div>
                          <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                            {c.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>{c.industry}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{c.location}</td>
                      <td style={{ fontWeight: 700 }}>{c.jobsPosted}</td>
                      <td>
                        <span className={`status-badge status-${c.statusVariant}`}>
                          {c.verificationStatus}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{c.joinedDate}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="btn-icon-action"
                            title="View Profile"
                            onClick={() => setSelectedCompany(c)}
                          >
                            <Eye size={16} />
                          </button>
                          {c.verificationStatus !== 'Verified' && (
                            <button
                              type="button"
                              className="btn-icon-action success"
                              title="Verify Company"
                              onClick={() => updateVerification(c.id, 'Verified', 'success')}
                            >
                              <Check size={16} />
                            </button>
                          )}
                          {c.verificationStatus !== 'Suspended' && (
                            <button
                              type="button"
                              className="btn-icon-action danger"
                              title="Suspend Company"
                              onClick={() => updateVerification(c.id, 'Suspended', 'danger')}
                            >
                              <Ban size={16} />
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

      {/* COMPANY MODAL */}
      {selectedCompany && (
        <div className="app-modal-overlay" onClick={() => setSelectedCompany(null)}>
          <div className="app-modal-card" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div className="flex items-center gap-3">
                <div className="candidate-avatar" style={{ backgroundColor: selectedCompany.logoBg, width: 42, height: 42 }}>
                  {selectedCompany.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{selectedCompany.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{selectedCompany.industry}</span>
                </div>
              </div>
              <button type="button" className="app-modal-close" onClick={() => setSelectedCompany(null)}>✕</button>
            </div>

            <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <div><strong>Company ID:</strong> {selectedCompany.id}</div>
              <div><strong>Location:</strong> {selectedCompany.location}</div>
              <div><strong>Jobs Published:</strong> {selectedCompany.jobsPosted}</div>
              <div><strong>Verification Status:</strong> <span className={`status-badge status-${selectedCompany.statusVariant}`}>{selectedCompany.verificationStatus}</span></div>
              <div><strong>Member Since:</strong> {selectedCompany.joinedDate}</div>
            </div>

            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn-nav btn-outline" onClick={() => setSelectedCompany(null)}>Close</button>
              {selectedCompany.verificationStatus !== 'Verified' && (
                <button
                  type="button"
                  className="btn-nav btn-primary"
                  onClick={() => {
                    updateVerification(selectedCompany.id, 'Verified', 'success');
                    setSelectedCompany(null);
                  }}
                >
                  Verify Company
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCompaniesPage;
