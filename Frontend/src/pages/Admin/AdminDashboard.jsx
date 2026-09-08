import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Building2,
  Send,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import {
  ADMIN_STATS,
  MONTHLY_CHARTS_DATA,
  ADMIN_RECENT_USERS,
  ADMIN_RECENT_JOBS,
  ADMIN_RECENT_REPORTS,
} from '../../data/adminData';
import './AdminDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

function AdminDashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Status Badge Class Helper
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

  // Max values for bar charts scaling
  const maxJobs = Math.max(...MONTHLY_CHARTS_DATA.map((d) => d.jobs));
  const maxApps = Math.max(...MONTHLY_CHARTS_DATA.map((d) => d.applications));
  const maxUsers = Math.max(...MONTHLY_CHARTS_DATA.map((d) => d.users));

  return (
    <div className="admin-dashboard-layout">
      {/* Integrated Admin Sidebar */}
      <DashboardSidebar
        role="admin"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="admin-main-wrapper">
        {/* Integrated Admin Header */}
        <DashboardHeader
          title="Admin Command Center"
          userName="System Admin"
          userRole="Platform Administrator"
          userInitial="AD"
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="admin-dashboard-content">
          {/* 1. WELCOME BANNER CARD */}
          <div className="admin-welcome-card">
            <div>
              <h2 className="admin-welcome-title">Platform Overview & Management Controls</h2>
              <p className="admin-welcome-desc">
                Monitor live user registrations, job posting volumes, application traffic, and pending moderation reports.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#4ade80',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <ShieldCheck size={16} /> All Systems Operational
              </span>
            </div>
          </div>

          {/* 2. SIX STATISTICS CARDS */}
          <section className="admin-stats-grid">
            {ADMIN_STATS.map((stat, idx) => {
              const icons = [
                <Users size={20} key="1" />,
                <UserCheck size={20} key="2" />,
                <Building2 size={20} key="3" />,
                <Briefcase size={20} key="4" />,
                <Send size={20} key="5" />,
                <ShieldCheck size={20} key="6" />,
              ];
              return (
                <div key={idx} className="admin-stat-card">
                  <div className="admin-stat-header">
                    <span className="admin-stat-title">{stat.title}</span>
                    <div className="admin-stat-icon">{icons[idx]}</div>
                  </div>
                  <div className="admin-stat-val">{stat.value}</div>
                  <div className="admin-stat-sub">{stat.subtitle}</div>
                </div>
              );
            })}
          </section>

          {/* 3. THREE READABLE BAR CHARTS */}
          <section className="admin-charts-grid">
            {/* Chart 1: Jobs Posted Over Time */}
            <div className="admin-chart-card">
              <div className="chart-card-head">
                <h3 className="chart-card-title flex items-center gap-2">
                  <Briefcase size={18} color="var(--color-primary)" /> Jobs Posted Over Time
                </h3>
                <span className="chart-badge">Monthly Growth</span>
              </div>

              <div className="bar-chart-container">
                {MONTHLY_CHARTS_DATA.map((d) => {
                  const pct = Math.round((d.jobs / maxJobs) * 100);
                  return (
                    <div key={d.month} className="bar-col">
                      <div
                        className="bar-fill jobs"
                        style={{ height: `${pct}%` }}
                        title={`${d.month}: ${d.jobs} jobs posted`}
                      />
                      <span className="bar-label">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Applications Over Time */}
            <div className="admin-chart-card">
              <div className="chart-card-head">
                <h3 className="chart-card-title flex items-center gap-2">
                  <Send size={18} color="#16a34a" /> Applications Over Time
                </h3>
                <span className="chart-badge" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                  Volume Trend
                </span>
              </div>

              <div className="bar-chart-container">
                {MONTHLY_CHARTS_DATA.map((d) => {
                  const pct = Math.round((d.applications / maxApps) * 100);
                  return (
                    <div key={d.month} className="bar-col">
                      <div
                        className="bar-fill apps"
                        style={{ height: `${pct}%` }}
                        title={`${d.month}: ${d.applications.toLocaleString()} applications`}
                      />
                      <span className="bar-label">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 3: User Growth */}
            <div className="admin-chart-card">
              <div className="chart-card-head">
                <h3 className="chart-card-title flex items-center gap-2">
                  <TrendingUp size={18} color="#635bff" /> User Growth Rate
                </h3>
                <span className="chart-badge" style={{ backgroundColor: '#f5f3ff', color: '#635bff' }}>
                  New Registrations
                </span>
              </div>

              <div className="bar-chart-container">
                {MONTHLY_CHARTS_DATA.map((d) => {
                  const pct = Math.round((d.users / maxUsers) * 100);
                  return (
                    <div key={d.month} className="bar-col">
                      <div
                        className="bar-fill users"
                        style={{ height: `${pct}%` }}
                        title={`${d.month}: ${d.users.toLocaleString()} new users`}
                      />
                      <span className="bar-label">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 4. THREE TABLES STACK */}
          <section className="admin-tables-stack">
            {/* Table 1: Recent Users */}
            <div className="admin-table-card">
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                    Recent Registered Users
                  </h3>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                    Latest job seeker and recruiter account signups
                  </p>
                </div>
              </div>

              <table className="app-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email Address</th>
                    <th>Account Role</th>
                    <th>Joined Date</th>
                    <th style={{ textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ADMIN_RECENT_USERS.map((usr) => (
                    <tr key={usr.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className="candidate-avatar"
                            style={{ backgroundColor: usr.avatarBg }}
                          >
                            {usr.avatarInitial}
                          </div>
                          <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                            {usr.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        {usr.email}
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px',
                            backgroundColor: usr.role === 'Recruiter' ? 'var(--color-primary-light)' : 'var(--color-bg-app)',
                            color: usr.role === 'Recruiter' ? 'var(--color-primary)' : 'var(--color-text-main)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {usr.role}
                        </span>
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        {usr.joined}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={getStatusBadgeClass(usr.statusVariant)}>
                          {usr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table 2: Recent Jobs */}
            <div className="admin-table-card">
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                    Recent Job Postings
                  </h3>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                    Listings requiring audit or system compliance verification
                  </p>
                </div>
              </div>

              <table className="app-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Posted Date</th>
                    <th style={{ textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ADMIN_RECENT_JOBS.map((job) => (
                    <tr key={job.id}>
                      <td style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                        {job.title}
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                        {job.company}
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        {job.location}
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        {job.posted}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={getStatusBadgeClass(job.statusVariant)}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table 3: Recent Reports */}
            <div className="admin-table-card">
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)' }} className="flex items-center gap-2">
                    <AlertTriangle size={18} color="#ea580c" /> Recent Moderation Reports
                  </h3>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                    Flagged content and user reporting audit queue
                  </p>
                </div>
              </div>

              <table className="app-table">
                <thead>
                  <tr>
                    <th>Report ID / Subject</th>
                    <th>Reported By</th>
                    <th>Target Object</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ADMIN_RECENT_REPORTS.map((rep) => (
                    <tr key={rep.id}>
                      <td>
                        <div className="flex flex-col">
                          <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                            {rep.subject}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                            {rep.id}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        {rep.reportedBy}
                      </td>
                      <td style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        {rep.target}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', backgroundColor: '#fff7ed', padding: '0.15rem 0.5rem', borderRadius: 4, border: '1px solid #ffedd5' }}>
                          {rep.type}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        {rep.date}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={getStatusBadgeClass(rep.statusVariant)}>
                          {rep.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
