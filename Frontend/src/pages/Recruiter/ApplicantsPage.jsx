import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  Calendar,
  ExternalLink,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Mail,
  Phone,
  MapPin,
  X,
  ChevronRight,
  Filter,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import {
  RECRUITER_PROFILE,
  RECRUITER_ACTIVE_JOBS,
  RECRUITER_ALL_APPLICANTS,
} from '../../data/recruiterData';
import './ApplicantsPage.css';
import '../JobSeeker/JobSeekerDashboard.css';

function ApplicantsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Applicants State (allows live status mutation for Shortlist, Reject, Schedule Interview)
  const [applicants, setApplicants] = useState(RECRUITER_ALL_APPLICANTS);

  // Filter & Sort State
  const [selectedJob, setSelectedJob] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedExp, setSelectedExp] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedMatchMin, setSelectedMatchMin] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  // Modal State
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2026-09-12');
  const [interviewTime, setInterviewTime] = useState('10:00');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Job options list
  const jobOptions = [
    { value: 'all', label: 'All Posted Jobs (6)' },
    ...RECRUITER_ACTIVE_JOBS.map((j) => ({ value: j.title, label: j.title })),
  ];

  // Extracted skills list for filtering
  const allAvailableSkills = Array.from(
    new Set(applicants.flatMap((cand) => cand.skills || []))
  );

  // Filter & Sort Logic
  const filteredApplicants = useMemo(() => {
    return applicants
      .filter((cand) => {
        // Job Selector
        if (selectedJob !== 'all' && cand.appliedFor !== selectedJob) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const nameMatch = cand.name.toLowerCase().includes(q);
          const emailMatch = cand.email.toLowerCase().includes(q);
          const jobMatch = cand.appliedFor.toLowerCase().includes(q);
          const skillMatch = cand.skills.some((s) => s.toLowerCase().includes(q));
          if (!nameMatch && !emailMatch && !jobMatch && !skillMatch) return false;
        }

        // Status Filter
        if (selectedStatus !== 'all' && cand.status !== selectedStatus) {
          return false;
        }

        // Experience Filter
        if (selectedExp !== 'all' && cand.experience !== selectedExp) {
          return false;
        }

        // Skills Filter
        if (selectedSkill !== 'all' && !cand.skills.includes(selectedSkill)) {
          return false;
        }

        // Match Percentage Filter
        if (selectedMatchMin !== 'all') {
          const min = Number(selectedMatchMin);
          if (cand.matchPercentage < min) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.resumeScore - a.resumeScore;
        if (sortBy === 'match') return b.matchPercentage - a.matchPercentage;
        if (sortBy === 'newest') return b.appliedTimestamp - a.appliedTimestamp;
        return 0;
      });
  }, [
    applicants,
    selectedJob,
    searchQuery,
    selectedStatus,
    selectedExp,
    selectedSkill,
    selectedMatchMin,
    sortBy,
  ]);

  // Status Action Handlers
  const handleUpdateStatus = (candidateId, newStatus, variant) => {
    setApplicants((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, status: newStatus, statusVariant: variant } : c
      )
    );

    if (activeCandidate && activeCandidate.id === candidateId) {
      setActiveCandidate((prev) => ({
        ...prev,
        status: newStatus,
        statusVariant: variant,
      }));
    }
  };

  const handleShortlist = (cand) => {
    handleUpdateStatus(cand.id, 'Shortlisted', 'success');
    showToast(`${cand.name} has been marked as Shortlisted!`);
  };

  const handleReject = (cand) => {
    handleUpdateStatus(cand.id, 'Rejected', 'danger');
    showToast(`${cand.name}'s application status updated to Rejected.`);
  };

  const handleConfirmSchedule = () => {
    if (!activeCandidate) return;
    handleUpdateStatus(activeCandidate.id, 'Scheduled Interview', 'primary');
    setIsScheduleModalOpen(false);
    showToast(
      `Interview scheduled with ${activeCandidate.name} on ${interviewDate} at ${interviewTime}.`
    );
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
      case 'primary':
        return 'status-badge status-info';
      default:
        return 'status-badge status-info';
    }
  };

  return (
    <div className="recruiter-dashboard-layout">
      {/* Integrated Sidebar */}
      <DashboardSidebar
        role="recruiter"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="recruiter-main-wrapper">
        {/* Integrated Header */}
        <DashboardHeader
          title="Candidate Applications"
          userName={RECRUITER_PROFILE.name}
          userRole={RECRUITER_PROFILE.title}
          userInitial={RECRUITER_PROFILE.avatarInitial}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="applicants-page-content">
          {/* Toast Notification */}
          {toastMessage && (
            <div
              style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <span>{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* 1. TOP JOB SELECTOR BAR */}
          <div className="applicants-top-header">
            <div className="job-select-group">
              <span className="job-select-label flex items-center gap-2">
                <Briefcase size={18} color="var(--color-primary)" /> Select Job Posting:
              </span>
              <select
                className="job-select-dropdown"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                {jobOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <span>Showing <strong>{filteredApplicants.length}</strong> applicant records</span>
            </div>
          </div>

          {/* AI RESUME ANALYSIS HIGHLIGHT BANNER */}
          <div className="ai-banner-card">
            <div className="ai-banner-left">
              <div className="ai-icon-pulse">
                <Sparkles size={22} />
              </div>
              <div>
                <div className="ai-banner-title">
                  AI Resume Analysis Active
                </div>
                <div className="ai-banner-desc">
                  JobTrack AI automatically scores candidate resumes, identifies skill match ratios, and highlights top talent.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4" style={{ flexShrink: 0 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60a5fa' }}>
                  {Math.round(
                    applicants.reduce((acc, c) => acc + c.resumeScore, 0) / (applicants.length || 1)
                  )}
                  /100
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Avg Resume Score</div>
              </div>
            </div>
          </div>

          {/* 2. FILTER & SEARCH CONTROL TOOLBAR */}
          <div className="applicants-toolbar">
            <div className="toolbar-row-top">
              {/* Search Bar */}
              <div className="search-applicant-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search candidate name, email, or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filters Dropdowns */}
              <div className="filter-selects-group">
                {/* Experience Filter */}
                <select
                  className="app-filter-select"
                  value={selectedExp}
                  onChange={(e) => setSelectedExp(e.target.value)}
                >
                  <option value="all">Exp: All Levels</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>

                {/* Skills Filter */}
                <select
                  className="app-filter-select"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="all">Skills: All Tech</option>
                  {allAvailableSkills.map((sk) => (
                    <option key={sk} value={sk}>
                      {sk}
                    </option>
                  ))}
                </select>

                {/* Match % Filter */}
                <select
                  className="app-filter-select"
                  value={selectedMatchMin}
                  onChange={(e) => setSelectedMatchMin(e.target.value)}
                >
                  <option value="all">Match: Any %</option>
                  <option value="90">90%+ Match</option>
                  <option value="80">80%+ Match</option>
                  <option value="70">70%+ Match</option>
                </select>

                {/* Sort Selector */}
                <select
                  className="app-filter-select"
                  style={{ fontWeight: 700, backgroundColor: 'var(--color-bg-app)' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="score">Sort: Highest Resume Score</option>
                  <option value="match">Sort: Highest Match %</option>
                  <option value="newest">Sort: Newest Application</option>
                </select>
              </div>
            </div>

            {/* Status Tabs Row */}
            <div className="status-tabs-row">
              <span className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginRight: 4 }}>
                <Filter size={13} /> Status:
              </span>
              {[
                { id: 'all', label: 'All Candidates' },
                { id: 'Applied', label: 'Applied' },
                { id: 'Under Review', label: 'Under Review' },
                { id: 'Shortlisted', label: 'Shortlisted' },
                { id: 'Scheduled Interview', label: 'Scheduled Interview' },
                { id: 'Rejected', label: 'Rejected' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`status-tab-btn ${selectedStatus === tab.id ? 'active' : ''}`}
                  onClick={() => setSelectedStatus(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. CANDIDATE APPLICANTS TABLE */}
          <div className="applicants-table-card">
            {filteredApplicants.length > 0 ? (
              <table className="app-table">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Applied For Job</th>
                    <th>Resume Score</th>
                    <th>Job Match %</th>
                    <th>Experience</th>
                    <th>Key Skills</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants.map((cand) => (
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
                      <td style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                        {cand.appliedFor}
                      </td>
                      <td>
                        <span
                          className={`score-pill-badge ${
                            cand.resumeScore >= 85
                              ? 'score-pill-high'
                              : cand.resumeScore >= 75
                              ? 'score-pill-mid'
                              : 'score-pill-low'
                          }`}
                        >
                          <Sparkles size={12} /> {cand.resumeScore}/100
                        </span>
                      </td>
                      <td>
                        <span className="match-badge-pill">{cand.matchPercentage}% Match</span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {cand.experience}
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {cand.skills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              style={{
                                fontSize: '0.7rem',
                                backgroundColor: 'var(--color-bg-app)',
                                border: '1px solid var(--color-border)',
                                padding: '0.1rem 0.4rem',
                                borderRadius: 4,
                              }}
                            >
                              {sk}
                            </span>
                          ))}
                          {cand.skills.length > 3 && (
                            <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                              +{cand.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        {cand.appliedDate}
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
                          onClick={() => setActiveCandidate(cand)}
                        >
                          Review <ChevronRight size={14} style={{ marginLeft: 2 }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '3rem 1.5rem', textCenter: 'center', textAlign: 'center' }}>
                <Users size={32} color="var(--color-text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                  No applicant records found
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                  No candidates match the selected filters or search criteria. Try adjusting your filter parameters.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 4. CANDIDATE DETAILS MODAL */}
      {activeCandidate && (
        <div className="app-modal-overlay" onClick={() => setActiveCandidate(null)}>
          <div
            className="app-modal-card"
            style={{ maxWidth: 760, maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="app-modal-header">
              <div className="flex items-center gap-3">
                <div
                  className="candidate-avatar"
                  style={{
                    backgroundColor: activeCandidate.avatarBg,
                    width: 48,
                    height: 48,
                    fontSize: '1.1rem',
                  }}
                >
                  {activeCandidate.avatarInitial}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, color: 'var(--color-text-heading)' }}>
                    {activeCandidate.name}
                  </h3>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>
                    Applied for: {activeCandidate.appliedFor}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={getStatusBadgeClass(activeCandidate.statusVariant)}>
                  {activeCandidate.status}
                </span>
                <button
                  type="button"
                  className="app-modal-close"
                  onClick={() => setActiveCandidate(null)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="cand-modal-grid">
              {/* Left Column: AI Resume Analysis Details */}
              <div className="flex flex-col gap-4">
                {/* Contact Profile Row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    backgroundColor: 'var(--color-bg-app)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                  }}
                >
                  <span className="flex items-center gap-1"><Mail size={14} /> {activeCandidate.email}</span>
                  <span className="flex items-center gap-1"><Phone size={14} /> {activeCandidate.phone}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {activeCandidate.location}</span>
                  {activeCandidate.portfolio && (
                    <a
                      href={activeCandidate.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1"
                      style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <ExternalLink size={14} /> Portfolio
                    </a>
                  )}
                </div>

                {/* Score Category Breakdown */}
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 6 }}>
                    AI Score Category Breakdown
                  </h4>
                  <div className="score-bar-group">
                    {activeCandidate.scoreBreakdown &&
                      Object.entries(activeCandidate.scoreBreakdown).map(([cat, val]) => (
                        <div key={cat}>
                          <div className="score-bar-row">
                            <span style={{ textTransform: 'capitalize' }}>{cat}</span>
                            <strong>{val}%</strong>
                          </div>
                          <div className="score-progress-track">
                            <div className="score-progress-fill" style={{ width: `${val}%` }} />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Detected Skills */}
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 6 }}>
                    Detected Skills ({activeCandidate.detectedSkills?.length || 0})
                  </h4>
                  <div className="skills-pills-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {(activeCandidate.detectedSkills || activeCandidate.skills).map((sk) => (
                      <span
                        key={sk}
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: '#f0fdf4',
                          color: '#15803d',
                          border: '1px solid #bbf7d0',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontWeight: 600,
                        }}
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {activeCandidate.missingSkills && activeCandidate.missingSkills.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 6 }}>
                      Skill Gap / Missing Requirements ({activeCandidate.missingSkills.length})
                    </h4>
                    <div className="skills-pills-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {activeCandidate.missingSkills.map((sk) => (
                        <span
                          key={sk}
                          style={{
                            fontSize: '0.75rem',
                            backgroundColor: '#fef2f2',
                            color: '#991b1b',
                            border: '1px solid #fecaca',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontWeight: 600,
                          }}
                        >
                          ○ {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education & Experience */}
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 6 }}>
                    Education & Work History
                  </h4>
                  <div className="flex flex-col gap-2" style={{ fontSize: '0.825rem', color: 'var(--color-text-body)' }}>
                    {activeCandidate.education && (
                      <div className="flex items-start gap-2">
                        <GraduationCap size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <strong>{activeCandidate.education.degree}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            {activeCandidate.education.institution} ({activeCandidate.education.year})
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCandidate.workHistory && activeCandidate.workHistory.map((wh, idx) => (
                      <div key={idx} className="flex items-start gap-2" style={{ marginTop: 4 }}>
                        <Briefcase size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <strong>{wh.role}</strong> - {wh.company}
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{wh.duration}</div>
                          <div style={{ fontSize: '0.78rem', marginTop: 2 }}>{wh.highlights}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {activeCandidate.projects && activeCandidate.projects.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 6 }}>
                      Featured Projects
                    </h4>
                    {activeCandidate.projects.map((proj, idx) => (
                      <div key={idx} className="flex items-start gap-2" style={{ fontSize: '0.8rem', color: 'var(--color-text-body)' }}>
                        <FolderGit2 size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <strong>{proj.name}</strong> ({proj.tech})
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{proj.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: AI Score Summary & Action Buttons */}
              <div className="flex flex-col gap-4">
                {/* Score Card Callout */}
                <div
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    border: '1px solid var(--color-primary-border)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    AI Resume Match Score
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1, margin: '0.5rem 0' }}>
                    {activeCandidate.resumeScore}
                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>/100</span>
                  </div>
                  <div className="match-badge-pill" style={{ fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>
                    {activeCandidate.matchPercentage}% Job Match
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2" style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    className="btn-nav btn-primary full-width"
                    style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                    onClick={() => handleShortlist(activeCandidate)}
                  >
                    <CheckCircle2 size={16} style={{ marginRight: 6 }} /> Shortlist Candidate
                  </button>

                  <button
                    type="button"
                    className="btn-nav btn-primary full-width"
                    onClick={() => setIsScheduleModalOpen(true)}
                  >
                    <Calendar size={16} style={{ marginRight: 6 }} /> Schedule Interview
                  </button>

                  <button
                    type="button"
                    className="btn-nav btn-outline full-width"
                    style={{ color: '#dc2626', borderColor: '#fecaca' }}
                    onClick={() => handleReject(activeCandidate)}
                  >
                    <XCircle size={16} style={{ marginRight: 6 }} /> Reject Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SCHEDULE INTERVIEW SUB-MODAL */}
      {isScheduleModalOpen && activeCandidate && (
        <div className="app-modal-overlay" onClick={() => setIsScheduleModalOpen(false)}>
          <div
            className="app-modal-card"
            style={{ maxWidth: 440 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="app-modal-header">
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Schedule Interview with {activeCandidate.name}
              </h3>
              <button
                type="button"
                className="app-modal-close"
                onClick={() => setIsScheduleModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3" style={{ fontSize: '0.875rem' }}>
              <div>
                <label className="form-label required">Select Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label required">Select Time Slot</label>
                <input
                  type="time"
                  className="form-input"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                />
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-app)',
                  padding: '0.75rem',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                An automated Google Meet calendar invitation will be dispatched to <strong>{activeCandidate.email}</strong>.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2" style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="btn-nav btn-outline"
                onClick={() => setIsScheduleModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-nav btn-primary"
                onClick={handleConfirmSchedule}
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicantsPage;
