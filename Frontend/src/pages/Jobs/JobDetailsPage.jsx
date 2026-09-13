import React, { useState, useContext } from 'react';
import { useParams, Link, useLocation, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Bookmark,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Award,
  Gift,
  Send,
  X,
  Check,
} from 'lucide-react';
import { JOBS_DATA } from '../../data/jobs';
import JobCard from '../../components/jobs/JobCard';
import { AuthContext } from '../../context/AuthContext';
import './JobDetailsPage.css';

/**
 * JobDetailsPage Component
 * Detailed view of job posting with requirements, sidebar match score, and application modal
 */
function JobDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSeekerRole = Boolean(
    user && (user.role?.toLowerCase() === 'seeker' || user.role?.toUpperCase() === 'JOB_SEEKER')
  );
  const isSeekerPath = location.pathname.startsWith('/seeker');

  // If authenticated seeker lands on public /jobs/:id path, redirect to /seeker/jobs/:id
  if (isSeekerRole && !isSeekerPath) {
    return <Navigate to={`/seeker/jobs/${id}`} replace />;
  }

  const isSeeker = isSeekerPath || isSeekerRole;
  const backLink = isSeeker ? '/seeker/jobs' : '/jobs';

  const job = JOBS_DATA.find((j) => j.id === id) || JOBS_DATA[0];

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  const handleApplyClick = () => {
    if (isApplied) return;
    setIsModalOpen(true);
  };

  const confirmApplication = () => {
    setIsApplied(true);
    setIsModalOpen(false);
  };

  // Find similar jobs (excluding current job)
  const similarJobs = JOBS_DATA.filter((j) => j.id !== job.id).slice(0, 3);

  // Resume match fallback details
  const match = job.resumeMatch || {
    score: '85%',
    matchingSkills: job.skills || ['React', 'TypeScript'],
    missingSkills: ['System Design', 'Docker'],
  };

  return (
    <div className="job-details-page">
      <div className="details-container">
        {/* Back Link */}
        <Link to={backLink} className="back-link">
          <ArrowLeft size={16} /> Back to All Jobs
        </Link>

        {/* 1. HEADER CARD */}
        <div className="details-header-card">
          <div className="details-header-top">
            <div className="details-brand-group">
              <div
                className="details-logo-badge"
                style={{ backgroundColor: job.companyLogoBg || '#2563eb' }}
              >
                {job.companyInitial || 'J'}
              </div>
              <div className="details-title-info">
                <h1 className="details-job-title">{job.title}</h1>
                <span className="details-company-name">{job.company}</span>

                <div className="details-meta-line">
                  <span className="flex items-center gap-1">
                    <MapPin size={15} /> {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={15} /> {job.workMode} ({job.type})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={15} /> Posted {job.postedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="details-actions-group">
              <button
                type="button"
                className={`btn-nav ${isSaved ? 'btn-outline saved' : 'btn-outline'}`}
                onClick={toggleSave}
              >
                <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} style={{ marginRight: 4 }} />
                {isSaved ? 'Saved ✓' : 'Save Job'}
              </button>

              <button
                type="button"
                className={`btn-nav ${isApplied ? 'btn-applied' : 'btn-primary'}`}
                onClick={handleApplyClick}
              >
                {isApplied ? (
                  <>
                    <Check size={16} style={{ marginRight: 4 }} /> Applied
                  </>
                ) : (
                  <>
                    <Send size={16} style={{ marginRight: 4 }} /> Apply Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2 & 3. MAIN CONTENT & SIDEBAR LAYOUT */}
        <div className="details-body-layout">
          {/* Main Left Column */}
          <div className="details-main-col">
            {/* Job Description */}
            <div className="section-block">
              <h2 className="section-block-title">Job Description</h2>
              <p className="section-block-text">{job.description}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="section-block">
                <h2 className="section-block-title">Key Responsibilities</h2>
                <ul className="bullets-list">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="bullet-item">
                      <CheckCircle2 size={18} className="bullet-icon" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required & Preferred Skills */}
            <div className="section-block">
              <h2 className="section-block-title">Required Skills</h2>
              <div className="skills-pills-wrap">
                {(job.requiredSkills || job.skills).map((skill) => (
                  <span key={skill} className="skill-pill-badge">
                    {skill}
                  </span>
                ))}
              </div>

              {job.preferredSkills && job.preferredSkills.length > 0 && (
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <h3 style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                    Preferred Skills
                  </h3>
                  <div className="skills-pills-wrap">
                    {job.preferredSkills.map((skill) => (
                      <span key={skill} className="preferred-pill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Experience & Education */}
            <div className="section-block">
              <h2 className="section-block-title">Experience & Education</h2>
              <div className="bullets-list">
                <div className="bullet-item">
                  <Award size={18} className="bullet-icon" />
                  <div>
                    <strong style={{ color: 'var(--color-text-heading)' }}>Experience Required: </strong>
                    {job.experienceDetail || `${job.experience} of relevant experience in software development.`}
                  </div>
                </div>
                <div className="bullet-item">
                  <GraduationCap size={18} className="bullet-icon" />
                  <div>
                    <strong style={{ color: 'var(--color-text-heading)' }}>Education: </strong>
                    {job.education || "Bachelor's degree in Computer Science, Software Engineering, or equivalent practical experience."}
                  </div>
                </div>
              </div>
            </div>

            {/* Compensation & Benefits */}
            <div className="section-block">
              <h2 className="section-block-title">Salary & Employee Benefits</h2>
              <p className="section-block-text" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                Target Compensation: {job.salary}
              </p>

              {job.benefits && (
                <ul className="bullets-list" style={{ marginTop: 'var(--space-2)' }}>
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="bullet-item">
                      <Gift size={18} className="bullet-icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Sidebar Column */}
          <aside className="details-sidebar-col">
            {/* Job Summary Card */}
            <div className="sidebar-summary-card">
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Job Summary
              </h3>

              <div className="summary-list">
                <div className="summary-row">
                  <span className="summary-row-label">
                    <MapPin size={15} /> Location
                  </span>
                  <span className="summary-row-val">{job.location}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-row-label">
                    <Briefcase size={15} /> Job Type
                  </span>
                  <span className="summary-row-val">{job.type}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-row-label">
                    <Award size={15} /> Experience
                  </span>
                  <span className="summary-row-val">{job.experience}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-row-label">
                    <DollarSign size={15} /> Salary
                  </span>
                  <span className="summary-row-val">{job.salary}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2" style={{ marginTop: 'var(--space-2)' }}>
                <button
                  type="button"
                  className={`btn-nav ${isApplied ? 'btn-applied full-width' : 'btn-primary full-width'}`}
                  onClick={handleApplyClick}
                >
                  {isApplied ? 'Applied ✓' : 'Apply Now'}
                </button>
                <button
                  type="button"
                  className="btn-nav btn-outline full-width"
                  onClick={toggleSave}
                >
                  {isSaved ? 'Saved to Bookmarks ✓' : 'Save Job'}
                </button>
              </div>
            </div>

            {/* Your Resume Match Card */}
            <div className="resume-match-card">
              <div className="match-header-row">
                <span className="match-title">
                  <Sparkles size={18} color="var(--color-primary)" />
                  Your Resume Match
                </span>
                <span className="match-score-badge">{match.score}</span>
              </div>

              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                Based on your uploaded resume skills compared against this job specification.
              </p>

              {/* Matching Skills */}
              <div className="match-skills-section">
                <span className="match-skills-title matching-title">Matching Skills:</span>
                <ul className="match-skill-list">
                  {match.matchingSkills.map((s) => (
                    <li key={s} className="match-skill-item yes">
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="match-skills-section">
                <span className="match-skills-title missing-title">Missing Skills:</span>
                <ul className="match-skill-list">
                  {match.missingSkills.map((s) => (
                    <li key={s} className="match-skill-item no">
                      <span style={{ color: '#94a3b8' }}>○</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/seeker/resume-analyzer"
                className="btn-nav btn-outline full-width"
                style={{ marginTop: 'var(--space-2)', textAlign: 'center' }}
              >
                Analyze Resume Details
              </Link>
            </div>
          </aside>
        </div>

        {/* 4. SIMILAR JOBS SECTION */}
        <section className="similar-jobs-section">
          <h2 className="section-title">Similar Job Opportunities</h2>
          <p className="section-subtitle">Explore more open roles matching your profile</p>

          <div className="similar-jobs-grid">
            {similarJobs.map((simJob) => (
              <JobCard key={simJob.id} job={simJob} />
            ))}
          </div>
        </section>
      </div>

      {/* APPLICATION CONFIRMATION MODAL */}
      {isModalOpen && (
        <div className="app-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Submit Application
              </h3>
              <button
                type="button"
                className="app-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-body)' }}>
                You are submitting your application for <strong>{job.title}</strong> at <strong>{job.company}</strong>.
              </p>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-app)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontSize: 'var(--font-xs)', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 4 }}>
                  ATTACHED RESUME
                </div>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--color-text-heading)' }}>
                  John_Doe_Software_Engineer_Resume.pdf
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--color-success)', marginTop: 2 }}>
                  ✓ Match Score: {match.score}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                className="btn-nav btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-nav btn-primary"
                onClick={confirmApplication}
              >
                Confirm & Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetailsPage;
