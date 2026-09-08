import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Sparkles,
  CheckCircle2,
  Users,
  Building2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page-container">
      {/* 1. HERO BANNER */}
      <section className="about-hero-banner">
        <div className="about-hero-content">
          <div
            style={{
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              color: '#60a5fa',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.85rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Empowering Careers with AI
          </div>
          <h1 className="about-hero-title">
            About JobTrack — Modern Job Discovery & AI Resume Analysis
          </h1>
          <p className="about-hero-desc">
            JobTrack is the intelligent career portal connecting talented professionals with top hiring teams through instant AI resume scoring, skill gap insights, and streamlined application tracking.
          </p>
        </div>
      </section>

      {/* 2. MAIN BODY CONTENT */}
      <div className="about-body-container">
        {/* OUR MISSION */}
        <section className="about-card-section">
          <div className="about-section-head">
            <Target size={24} color="var(--color-primary)" />
            <h2 className="about-section-title">Our Mission</h2>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
            Our mission is to eliminate friction from the hiring ecosystem. We empower job seekers with transparent AI resume analysis that reveals strengths and skill gaps, while providing recruiters with automated match ratios to connect with top-tier talent faster.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="about-card-section">
          <div className="about-section-head">
            <TrendingUp size={24} color="var(--color-primary)" />
            <h2 className="about-section-title">How JobTrack Works</h2>
          </div>

          <div className="steps-flow-grid">
            <div className="step-card">
              <div className="step-num-badge">1</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Create Profile & Upload Resume
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Upload your PDF or DOCX resume to build your professional profile in seconds.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num-badge">2</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                AI Analysis & Skill Gap Match
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Get an instant AI resume score (0-100), detected skills breakdown, and missing recommendations.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num-badge">3</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Explore & Apply to Jobs
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Search thousands of active postings and filter by match percentage to target ideal roles.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num-badge">4</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Recruiter Screening & Interviews
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Track application status in real-time from review to interview scheduling.
              </p>
            </div>
          </div>
        </section>

        {/* RESUME ANALYZER EXPLANATION */}
        <section
          className="about-card-section"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#ffffff',
            border: 'none',
          }}
        >
          <div className="about-section-head" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
            <Sparkles size={24} color="#60a5fa" />
            <h2 className="about-section-title" style={{ color: '#ffffff' }}>
              The Power of AI Resume Analysis
            </h2>
          </div>

          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            JobTrack AI Resume Analyzer parses your uploaded document against thousands of target job descriptions. Our algorithm evaluates four core pillars:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '0.5rem',
            }}
          >
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: 4 }}>Content Depth (85%)</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Evaluates section completeness, contact info, and clear professional summaries.</div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 4 }}>Skills Coverage (90%)</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Detects technical stack keywords and flags missing critical prerequisites.</div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontWeight: 700, color: '#facc15', marginBottom: 4 }}>Formatting Structure (78%)</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ensures clean typography, bullet structure, and ATS parser readability.</div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontWeight: 700, color: '#f472b6', marginBottom: 4 }}>Experience Relevance (75%)</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Analyzes quantifiable achievements and career trajectory match.</div>
            </div>
          </div>
        </section>

        {/* FOR JOB SEEKERS VS FOR RECRUITERS */}
        <section className="dual-features-grid">
          {/* FOR JOB SEEKERS */}
          <div className="feature-column-card">
            <div className="about-section-head">
              <Users size={22} color="var(--color-primary)" />
              <h3 className="about-section-title" style={{ fontSize: '1.15rem' }}>
                For Job Seekers
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Instant AI Resume Match score against any job posting</span>
              </div>
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Clear skill gap analysis highlighting missing requirements</span>
              </div>
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Real-time application status tracking with step timeline</span>
              </div>
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Bookmark saved jobs and customize your candidate profile</span>
              </div>
            </div>

            <Link
              to="/jobs"
              className="btn-nav btn-primary full-width"
              style={{ marginTop: 'auto', justifyContent: 'center' }}
            >
              Browse Open Positions <ArrowRight size={16} style={{ marginLeft: 4 }} />
            </Link>
          </div>

          {/* FOR RECRUITERS */}
          <div className="feature-column-card">
            <div className="about-section-head">
              <Building2 size={22} color="var(--color-primary)" />
              <h3 className="about-section-title" style={{ fontSize: '1.15rem' }}>
                For Recruiters
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Multi-section job posting creator with instant publishing</span>
              </div>
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Automated applicant ranking by AI resume match percentage</span>
              </div>
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Candidates details review with skill match vs gap breakdown</span>
              </div>
              <div className="feature-item-row">
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>1-click shortlisting, rejection, and interview scheduling</span>
              </div>
            </div>

            <Link
              to="/recruiter/dashboard"
              className="btn-nav btn-outline full-width"
              style={{ marginTop: 'auto', justifyContent: 'center' }}
            >
              Recruiter Dashboard <ArrowRight size={16} style={{ marginLeft: 4 }} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
