import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  FileCheck2,
  AlertTriangle,
  Award,
  Briefcase,
  UploadCloud,
  ChevronRight,
  TrendingUp,
  FileText,
  Sliders,
} from 'lucide-react';
import { MOCK_RESUME_ANALYSIS } from '../../data/mockAnalysis';
import { AuthContext } from '../../context/AuthContext';
import './ResumeResultPage.css';

/**
 * ResumeResultPage Component
 * Comprehensive AI Resume Analysis Dashboard powered by extensible mock data
 */
function ResumeResultPage() {
  const data = MOCK_RESUME_ANALYSIS;
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const isSeeker = Boolean(
    user && (user.role?.toLowerCase() === 'seeker' || user.role?.toUpperCase() === 'JOB_SEEKER')
  );
  const jobsListPath = isSeeker ? '/seeker/jobs' : '/jobs';

  const getPriorityTagClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-tag priority-high';
      case 'medium':
        return 'priority-tag priority-medium';
      case 'low':
        return 'priority-tag priority-low';
      default:
        return 'priority-tag priority-medium';
    }
  };

  return (
    <div className="result-page">
      <div className="result-container">
        {/* Back Navigation Link */}
        <Link to="/seeker/resume-analyzer" className="back-link">
          <ArrowLeft size={16} /> Upload Another Resume
        </Link>

        {/* 1. TOP HEADER BANNER */}
        <div className="result-header-card">
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
              <Sparkles size={18} color="var(--color-primary)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                AI Resume Analysis Result
              </span>
            </div>

            <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800, color: 'var(--color-text-heading)' }}>
              Resume Analysis
            </h1>

            <div className="result-file-badge">
              <FileText size={14} />
              <span>Uploaded: {data.fileName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/seeker/resume-analyzer" className="btn-nav btn-outline">
              <UploadCloud size={16} style={{ marginRight: 4 }} /> Upload New Resume
            </Link>
            <Link to={jobsListPath} className="btn-nav btn-primary">
              <Briefcase size={16} style={{ marginRight: 4 }} /> View Matched Jobs
            </Link>
          </div>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="result-grid-layout">
          {/* LEFT / MAIN COLUMN */}
          <div className="result-main-col">
            {/* 2. MAIN SCORE & SCORE CATEGORIES */}
            <div className="result-card-block">
              <h2 className="result-card-title">
                <FileCheck2 size={20} color="var(--color-primary)" />
                Overall Resume Score
              </h2>

              <div className="score-overview-box">
                {/* Score Gauge */}
                <div className="main-score-gauge">
                  <div className="big-score-ring">
                    <div className="big-score-inner">
                      <span className="big-score-value">{data.overallScore}</span>
                      <span className="big-score-max">/ {data.maxScore}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 'var(--font-xs)', fontWeight: 700, color: '#16a34a', marginTop: 4 }}>
                    {data.scoreLabel}
                  </span>
                </div>

                {/* Score Categories Progress Bars */}
                <div className="category-scores-list">
                  <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 'var(--font-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                      Category Breakdown
                    </span>
                  </div>

                  {data.categoryScores.map((cat) => (
                    <div key={cat.name} className="category-score-row">
                      <div className="category-score-head">
                        <span>{cat.name}</span>
                        <span>{cat.score}%</span>
                      </div>
                      <div className="category-progress-track">
                        <div
                          className="category-progress-fill"
                          style={{
                            width: `${cat.score}%`,
                            backgroundColor: cat.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. SKILLS SECTION (Detected Skills Badges) */}
            <div className="result-card-block">
              <h2 className="result-card-title">
                <Award size={20} color="var(--color-primary)" />
                Detected Skills
              </h2>

              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                Skills automatically parsed from your work experience, education, and project sections:
              </p>

              <div className="skills-badges-wrap">
                {data.detectedSkills.map((skill) => (
                  <span key={skill} className="detected-skill-badge">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. SKILL GAP (Missing / Recommended Skills with Priority) */}
            <div className="result-card-block">
              <h2 className="result-card-title">
                <AlertTriangle size={20} color="var(--color-warning)" />
                Skill Gap & Recommended Skills
              </h2>

              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                Top missing keywords for target engineering roles. Adding these skills can increase ATS compliance:
              </p>

              <div className="skill-gap-list">
                {data.skillGaps.map((item) => (
                  <div key={item.skill} className="skill-gap-item">
                    <div className="flex items-center gap-2">
                      <span style={{ color: 'var(--color-warning)', fontWeight: 700 }}>○</span>
                      <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--color-text-heading)' }}>
                        {item.skill}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-subtle)' }}>Priority:</span>
                      <span className={getPriorityTagClass(item.priority)}>{item.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. RESUME SECTIONS CHECKLIST (Detected vs Missing) */}
            <div className="result-card-block">
              <h2 className="result-card-title">
                <Sliders size={20} color="var(--color-primary)" />
                Resume Sections Checklist
              </h2>

              <div className="sections-checklist-grid">
                {/* Detected Sections */}
                <div className="checklist-group">
                  <span className="checklist-group-title" style={{ color: '#16a34a' }}>
                    Detected Sections ({data.sectionChecklist.detected.length})
                  </span>
                  {data.sectionChecklist.detected.map((sec) => (
                    <div key={sec} className="checklist-item detected">
                      <span>✓</span>
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>

                {/* Missing Sections */}
                <div className="checklist-group">
                  <span className="checklist-group-title" style={{ color: '#dc2626' }}>
                    Missing Sections ({data.sectionChecklist.missing.length})
                  </span>
                  {data.sectionChecklist.missing.map((sec) => (
                    <div key={sec} className="checklist-item missing">
                      <span>⚠</span>
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. IMPROVEMENT SUGGESTIONS */}
            <div className="result-card-block">
              <h2 className="result-card-title">
                <TrendingUp size={20} color="var(--color-primary)" />
                Improvement Suggestions
              </h2>

              <div className="suggestions-grid">
                {data.suggestions.map((sug) => (
                  <div key={sug.id} className="suggestion-card">
                    <h4 className="suggestion-card-title">{sug.title}</h4>
                    <p className="suggestion-card-desc">{sug.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: JOB MATCHES */}
          <aside className="result-sidebar-col">
            <div className="sidebar-summary-card">
              <h3 className="result-card-title" style={{ paddingBottom: '0.5rem', marginBottom: '0.25rem' }}>
                <Briefcase size={18} color="var(--color-primary)" />
                Recommended Job Matches
              </h3>

              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                Target roles matched against your detected skills and experience profile:
              </p>

              <div className="job-matches-list">
                {data.jobMatches.map((job) => (
                  <div key={job.id} className="job-match-card-item">
                    <div>
                      <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                        <h4 className="match-job-title">{job.title}</h4>
                      </div>
                      <span className="match-job-company">{job.company}</span>

                      {/* Matching Skills list */}
                      <div className="match-skill-mini-line">
                        <span style={{ color: '#16a34a', fontWeight: 600 }}>Matching:</span>
                        {job.matchingSkills.map((sk) => (
                          <span key={sk} style={{ color: '#16a34a' }}>✓ {sk}</span>
                        ))}
                      </div>

                      {/* Missing Skills list */}
                      <div className="match-skill-mini-line">
                        <span style={{ color: '#ea580c', fontWeight: 600 }}>Missing:</span>
                        {job.missingSkills.map((sk) => (
                          <span key={sk} style={{ color: '#64748b' }}>○ {sk}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="match-badge-pill">{job.matchPercentage}%</span>
                      <Link
                        to={isSeeker ? `/seeker/jobs/${job.id}` : `/jobs/${job.id}`}
                        className="btn-nav btn-outline"
                        style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem' }}
                      >
                        View Job <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <Link to={jobsListPath} className="btn-nav btn-primary full-width" style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
                Browse All Open Jobs
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ResumeResultPage;
