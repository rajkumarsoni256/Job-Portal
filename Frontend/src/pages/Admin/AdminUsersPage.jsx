import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { ADMIN_ALL_USERS } from '../../data/adminData';
import './AdminUsersPage.css';
import './AdminDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * Admin User Management Page
 * Route: /admin/users
 */
function AdminUsersPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [users, setUsers] = useState(ADMIN_ALL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          const newVariant = newStatus === 'Active' ? 'success' : 'danger';
          showToast(`User ${u.name} has been ${newStatus.toLowerCase()}.`);
          return { ...u, status: newStatus, statusVariant: newVariant };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsersCount = users.length;
  const seekersCount = users.filter((u) => u.role === 'Job Seeker').length;
  const recruitersCount = users.filter((u) => u.role === 'Recruiter').length;
  const activeCount = users.filter((u) => u.status === 'Active').length;

  return (
    <div className="admin-dashboard-layout">
      <DashboardSidebar
        role="admin"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        <DashboardHeader
          title="User Management"
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
                <span className="admin-stat-title">Total Registered Users</span>
                <div className="admin-stat-icon"><Users size={20} /></div>
              </div>
              <div className="admin-stat-val">{totalUsersCount}</div>
              <div className="admin-stat-sub">Across platform</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Job Seekers</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}><UserCheck size={20} /></div>
              </div>
              <div className="admin-stat-val">{seekersCount}</div>
              <div className="admin-stat-sub">Candidates</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Recruiters</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}><Shield size={20} /></div>
              </div>
              <div className="admin-stat-val">{recruitersCount}</div>
              <div className="admin-stat-sub">Employers</div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Active Accounts</span>
                <div className="admin-stat-icon" style={{ backgroundColor: '#f5f3ff', color: '#635bff' }}><UserCheck size={20} /></div>
              </div>
              <div className="admin-stat-val">{activeCount}</div>
              <div className="admin-stat-sub">Good standing</div>
            </div>
          </div>

          {/* CONTROLS BAR */}
          <div className="admin-table-card" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="admin-filter-bar">
              <div className="admin-search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-filter-selectors">
                <div className="filter-select-group">
                  <Filter size={16} />
                  <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="All">All Roles</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Recruiter">Recruiter</option>
                  </select>
                </div>

                <div className="filter-select-group">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* USERS TABLE */}
            <table className="app-table">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                      No users match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="candidate-avatar" style={{ backgroundColor: u.avatarBg }}>
                            {u.avatarInitial}
                          </div>
                          <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{u.email}</td>
                      <td>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px',
                            backgroundColor: u.role === 'Recruiter' ? 'var(--color-primary-light)' : 'var(--color-bg-app)',
                            color: u.role === 'Recruiter' ? 'var(--color-primary)' : 'var(--color-text-main)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{u.joined}</td>
                      <td>
                        <span className={`status-badge status-${u.statusVariant}`}>
                          {u.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="btn-icon-action"
                            title="View User Details"
                            onClick={() => setSelectedUser(u)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className={`btn-icon-action ${u.status === 'Active' ? 'danger' : 'success'}`}
                            title={u.status === 'Active' ? 'Suspend User' : 'Activate User'}
                            onClick={() => toggleUserStatus(u.id)}
                          >
                            {u.status === 'Active' ? <UserX size={16} /> : <UserCheck size={16} />}
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

      {/* USER MODAL */}
      {selectedUser && (
        <div className="app-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="app-modal-card" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <div className="flex items-center gap-3">
                <div className="candidate-avatar" style={{ backgroundColor: selectedUser.avatarBg, width: 42, height: 42 }}>
                  {selectedUser.avatarInitial}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{selectedUser.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{selectedUser.email}</span>
                </div>
              </div>
              <button type="button" className="app-modal-close" onClick={() => setSelectedUser(null)}>✕</button>
            </div>

            <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div><strong>User ID:</strong> {selectedUser.id}</div>
              <div><strong>Role:</strong> {selectedUser.role}</div>
              <div><strong>Account Status:</strong> <span className={`status-badge status-${selectedUser.statusVariant}`}>{selectedUser.status}</span></div>
              <div><strong>Registration Date:</strong> {selectedUser.joined}</div>
            </div>

            <div className="flex justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button type="button" className="btn-nav btn-outline" onClick={() => setSelectedUser(null)}>Close</button>
              <button
                type="button"
                className={`btn-nav ${selectedUser.status === 'Active' ? 'btn-danger' : 'btn-primary'}`}
                onClick={() => {
                  toggleUserStatus(selectedUser.id);
                  setSelectedUser(null);
                }}
              >
                {selectedUser.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsersPage;
