import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  PlusCircle,
  Eye,
  ArrowRight,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import {
  RECRUITER_PROFILE,
  RECRUITER_ACTIVE_JOBS,
  RECRUITER_RECENT_APPLICANTS,
} from '../../data/recruiterData';
import './RecruiterDashboard.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * RecruiterDashboard Component
 * Complete Recruiter Dashboard with posting stats, active jobs table, and recent candidate submissions
 */
function RecruiterDashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

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

  return (
    <div className="recruiter-dashboard-layout">
      {/* Integrated Sidebar Navigation for Recruiter Role */}
      <DashboardSidebar
        role="recruiter"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="recruiter-main-wrapper">
        {/* Integrated Header */}
        <DashboardHeader
          title="Recruiter Overview"
          userName={RECRUITER_PROFILE.name}
          userRole={RECRUITER_PROFILE.title}
          userInitial={RECRUITER_PROFILE.avatarInitial}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={toggleMobileSidebar}
        />

        {/* Dashboard Main Content Area */}
        <main className="recruiter-dashboard-content">
          {/* 1. WELCOME BANNER */}
          <div className="recruiter-welcome-card">
            <div>
              <h2 className="recruiter-welcome-title">{RECRUITER_PROFILE.greeting}</h2>
              <p className="recruiter-welcome-desc">
                Manage your active job postings, evaluate candidate resume match scores, and streamline your interview scheduling.
              </p>
            </div>

            <Link to="/recruiter/jobs/new" className="btn-post-job-prominent">
              <PlusCircle size={18} />
              <span>Post New Job</span>
            </Link>
          </div>

          {/* 2. 4 STATISTICS CARDS */}
          <div className="recruiter-stats-grid">
            <div className="dash-stat-card">
              <div className="dash-stat-icon">
                <Briefcase size={22} />
              </div>
              <div>
                <div className="dash-stat-val">{RECRUITER_PROFILE.stats.activeJobs}</div>
                <div className="dash-stat-lbl">Active Jobs</div>
              </div>
            </div>

            <div className="dash-stat-card">
              <div
                className="dash-stat-icon"
                style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}
              >
                <Users size={22} />
              </div>
              <div>
                <div className="dash-stat-val">{RECRUITER_PROFILE.stats.totalApplicants}</div>
                <div className="dash-stat-lbl">Total Applicants</div>
              </div>
            </div>

            <div className="dash-stat-card">
              <div
                className="dash-stat-icon"
                style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}
              >
                <CheckCircle2 size={22} />
              </div>
              <div>
                <div className="dash-stat-val">{RECRUITER_PROFILE.stats.shortlisted}</div>
                <div className="dash-stat-lbl">Shortlisted</div>
              </div>
            </div>

            <div className="dash-stat-card">
              <div
                className="dash-stat-icon"
                style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}
              >
                <Calendar size={22} />
              </div>
              <div>
                <div className="dash-stat-val">{RECRUITER_PROFILE.stats.interviews}</div>
                <div className="dash-stat-lbl">Interviews</div>
              </div>
            </div>
          </div>

          {/* 3. ACTIVE JOBS TABLE */}
          <section className="recruiter-table-card">
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
              <div>
                <h3 className="section-title" style={{ fontSize: 'var(--font-lg)' }}>
                  Active Job Postings
                </h3>
                <p className="section-subtitle">Monitor view counts and application volumes</p>
              </div>

              <Link to="/recruiter/jobs/new" className="btn-nav btn-primary" style={{ fontSize: 'var(--font-xs)', padding: '0.35rem 0.85rem' }}>
                <PlusCircle size={14} style={{ marginRight: 4 }} /> Post New Job
              </Link>
            </div>

            <table className="app-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Applications</th>
                  <th>Views</th>
                  <th>Posted Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {RECRUITER_ACTIVE_JOBS.map((job) => (
                  <tr key={job.id}>
                    <td style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                      <div className="flex flex-col">
                        <span>{job.title}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>
                          {job.department}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <span className="flex items-center gap-1">
                        <Users size={14} color="var(--color-primary)" /> {job.applications}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {job.views}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{job.postedDate}</td>
                    <td>
                      <span className={getStatusBadgeClass(job.statusVariant)}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        to="/recruiter/applicants"
                        className="btn-nav btn-outline"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      >
                        Manage Applicants
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 4. RECENT APPLICANTS TABLE */}
          <section className="recruiter-table-card">
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
              <div>
                <h3 className="section-title" style={{ fontSize: 'var(--font-lg)' }}>
                  Recent Applicants
                </h3>
                <p className="section-subtitle">Candidates sorted by resume AI match percentage</p>
              </div>

              <Link to="/recruiter/applicants" className="btn-nav btn-outline" style={{ fontSize: 'var(--font-xs)', padding: '0.35rem 0.85rem' }}>
                View All Applicants <ArrowRight size={14} style={{ marginLeft: 4 }} />
              </Link>
            </div>

            <table className="app-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Applied For</th>
                  <th>Resume Score</th>
                  <th>Match %</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {RECRUITER_RECENT_APPLICANTS.map((cand) => (
                  <tr key={cand.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="candidate-avatar"
                          style={{ backgroundColor: cand.avatarBg }}
                        >
                          {cand.avatarInitial}
                        </div>
                        <div className="flex flex-col">
                          <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                            {cand.name}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            {cand.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500, color: 'var(--color-text-main)' }}>
                      {cand.appliedFor}
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>
                        {cand.resumeScore}
                      </span>
                    </td>
                    <td>
                      <span className="match-badge-pill">{cand.matchPercentage}%</span>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(cand.statusVariant)}>
                        {cand.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn-nav btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
                        onClick={() => setSelectedCandidate(cand)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* CANDIDATE REVIEW MODAL */}
      {selectedCandidate && (
        <div className="app-modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div
            className="app-modal-card"
            style={{ maxWidth: 540 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="app-modal-header">
              <div className="flex items-center gap-3">
                <div
                  className="candidate-avatar"
                  style={{ backgroundColor: selectedCandidate.avatarBg, width: 42, height: 42, fontSize: '1rem' }}
                >
                  {selectedCandidate.avatarInitial}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                    {selectedCandidate.name}
                  </h3>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                    Applied for: {selectedCandidate.appliedFor}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="app-modal-close"
                onClick={() => setSelectedCandidate(null)}
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between" style={{ backgroundColor: 'var(--color-bg-app)', padding: '0.75rem', borderRadius: 6, fontSize: '0.85rem' }}>
              <span>Resume Score: <strong>{selectedCandidate.resumeScore}</strong></span>
              <span>Match Ratio: <strong style={{ color: 'var(--color-primary)' }}>{selectedCandidate.matchPercentage}% Match</strong></span>
              <span className={getStatusBadgeClass(selectedCandidate.statusVariant)}>{selectedCandidate.status}</span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
              <p style={{ fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 4 }}>
                Candidate Summary:
              </p>
              Strong engineering candidate with 4+ years of relevant experience matching target stack prerequisites. Highly recommended for technical phone screening.
            </div>

            <div className="flex items-center justify-end gap-2" style={{ marginTop: 8 }}>
              <button
                type="button"
                className="btn-nav btn-outline"
                onClick={() => setSelectedCandidate(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-nav btn-primary"
                onClick={() => setSelectedCandidate(null)}
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

export default RecruiterDashboard;
