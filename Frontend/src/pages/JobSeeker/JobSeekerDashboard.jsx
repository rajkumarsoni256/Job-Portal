import React from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Calendar,
  Bookmark,
  Sparkles,
  ArrowRight,
  MapPin,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import {
  SEEKER_PROFILE,
  RECOMMENDED_JOBS_SEEKER,
  RECENT_APPLICATIONS,
} from '../../data/seekerData';
import './JobSeekerDashboard.css';

/**
 * JobSeekerDashboard Component
 * Complete Job Seeker Dashboard with stats, resume score card, recommended jobs, and applications table
 */
function JobSeekerDashboard() {
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
    <div className="seeker-dashboard-content">
          {/* 1. WELCOME BANNER */}
          <div className="welcome-banner-card">
            <div>
              <h2 className="welcome-title">{SEEKER_PROFILE.greeting}</h2>
              <p className="welcome-desc">
                Track your active job applications, view AI-powered resume scores, and explore top recommended roles matched to your profile.
              </p>
            </div>

            <Link to="/seeker/resume-analyzer" className="btn-analyze-prominent">
              <Sparkles size={18} />
              <span>Analyze Resume</span>
            </Link>
          </div>

          {/* 2. 4 STAT CARDS */}
          <div className="dashboard-stats-grid">
            <div className="dash-stat-card">
              <div className="dash-stat-icon">
                <Send size={22} />
              </div>
              <div>
                <div className="dash-stat-val">{SEEKER_PROFILE.stats.applications}</div>
                <div className="dash-stat-lbl">Applications</div>
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
                <div className="dash-stat-val">{SEEKER_PROFILE.stats.interviews}</div>
                <div className="dash-stat-lbl">Interviews</div>
              </div>
            </div>

            <div className="dash-stat-card">
              <div
                className="dash-stat-icon"
                style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}
              >
                <Bookmark size={22} />
              </div>
              <div>
                <div className="dash-stat-val">{SEEKER_PROFILE.stats.savedJobs}</div>
                <div className="dash-stat-lbl">Saved Jobs</div>
              </div>
            </div>

            <div className="dash-stat-card">
              <div
                className="dash-stat-icon"
                style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}
              >
                <FileCheck2 size={22} />
              </div>
              <div>
                <div className="dash-stat-val">{SEEKER_PROFILE.stats.resumeScore}</div>
                <div className="dash-stat-lbl">Resume Score</div>
              </div>
            </div>
          </div>

          {/* 3. RESUME SCORE OVERVIEW CARD */}
          <div className="resume-score-overview-card">
            <div className="score-gauge-box">
              <div className="score-circle-number">
                <div className="score-circle-inner">
                  <span className="score-big-num">
                    {SEEKER_PROFILE.resumeScoreDetails.score}
                  </span>
                  <span className="score-total-denom">/100</span>
                </div>
              </div>
              <h4 style={{ fontSize: 'var(--font-sm)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Resume Match Score
              </h4>
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                Completeness: {SEEKER_PROFILE.resumeScoreDetails.completeness}
              </span>
            </div>

            <div className="score-details-box">
              {/* Detected Skills */}
              <div className="score-detail-row">
                <span className="score-detail-label">Skills Detected in Resume</span>
                <div className="detected-skills-pills">
                  {SEEKER_PROFILE.resumeScoreDetails.detectedSkills.map((skill) => (
                    <span key={skill} className="detected-skill-tag">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Sections */}
              <div className="score-detail-row">
                <span className="score-detail-label" style={{ color: 'var(--color-warning)' }}>
                  Suggestions & Missing Sections
                </span>
                <ul className="missing-list">
                  {SEEKER_PROFILE.resumeScoreDetails.missingSections.map((item, idx) => (
                    <li key={idx} className="missing-item">
                      <AlertCircle size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  to="/seeker/resume-analyzer"
                  className="btn-nav btn-outline"
                  style={{ fontSize: 'var(--font-xs)', padding: '0.35rem 0.85rem' }}
                >
                  Analyze & Improve Resume <ArrowRight size={14} style={{ marginLeft: 4 }} />
                </Link>
              </div>
            </div>
          </div>

          {/* 4. RECOMMENDED JOBS (4 Cards) */}
          <section>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
              <div>
                <h3 className="section-title" style={{ fontSize: 'var(--font-xl)' }}>
                  Recommended Jobs for You
                </h3>
                <p className="section-subtitle">Matched based on your profile & skills</p>
              </div>
              <Link to="/seeker/jobs" className="btn-nav btn-outline" style={{ padding: '0.35rem 0.75rem' }}>
                View All Jobs <ArrowRight size={14} style={{ marginLeft: 4 }} />
              </Link>
            </div>

            <div className="rec-jobs-grid">
              {RECOMMENDED_JOBS_SEEKER.map((job) => (
                <div key={job.id} className="rec-job-card">
                  <div className="rec-card-top">
                    <div className="flex items-center gap-3">
                      <div
                        className="company-logo-badge"
                        style={{
                          backgroundColor: job.companyLogoBg,
                          width: 42,
                          height: 42,
                          fontSize: '1rem',
                        }}
                      >
                        {job.companyInitial}
                      </div>
                      <div>
                        <h4
                          style={{
                            fontSize: 'var(--font-sm)',
                            fontWeight: 700,
                            color: 'var(--color-text-heading)',
                            lineHeight: 1.25,
                          }}
                        >
                          {job.title}
                        </h4>
                        <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                          {job.company}
                        </span>
                      </div>
                    </div>

                    <span className="match-badge-pill">{job.matchPercentage}% Match</span>
                  </div>

                  <div
                    className="flex items-center gap-3"
                    style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {job.location}
                    </span>
                    <span>•</span>
                    <span>{job.salary}</span>
                  </div>

                  <div className="flex items-center justify-between" style={{ marginTop: '0.2rem' }}>
                    <span className="type-badge">{job.type}</span>
                    <Link
                      to={`/seeker/jobs/${job.id}`}
                      className="btn-nav btn-outline"
                      style={{ padding: '0.3rem 0.75rem', fontSize: 'var(--font-xs)' }}
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. RECENT APPLICATIONS TABLE */}
          <section className="applications-table-card">
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
              <div>
                <h3 className="section-title" style={{ fontSize: 'var(--font-lg)' }}>
                  Recent Applications
                </h3>
                <p className="section-subtitle">Track the status of your submitted job applications</p>
              </div>
            </div>

            <table className="app-table">
              <thead>
                <tr>
                  <th>Job Position</th>
                  <th>Company</th>
                  <th>Applied Date</th>
                  <th>Application Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_APPLICATIONS.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>
                      {app.jobTitle}
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
                    <td style={{ color: 'var(--color-text-muted)' }}>{app.appliedDate}</td>
                    <td>
                      <span className={getStatusBadgeClass(app.statusVariant)}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        to={`/seeker/jobs/${app.jobId || '1'}`}
                        className="btn-nav btn-outline"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
    </div>
  );
}

export default JobSeekerDashboard;
