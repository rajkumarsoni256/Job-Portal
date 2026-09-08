import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  FileCheck2,
  Code,
  BarChart3,
  Palette,
  Compass,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles,
  Upload,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { MOCK_JOBS, POPULAR_CATEGORIES, PLATFORM_STATS, CAREER_TIPS } from '../../data/mockJobs';
import './HomePage.css';

/**
 * JobTrack Homepage Component
 * Complete professional landing page for job seekers and employers
 */
function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // Handle job search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (locationQuery.trim()) params.append('location', locationQuery.trim());
    navigate(`/jobs?${params.toString()}`);
  };

  // Handle popular search tag click
  const handlePopularSearch = (term) => {
    navigate(`/jobs?search=${encodeURIComponent(term)}`);
  };

  // Icon mapping for categories
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code':
        return <Code size={20} />;
      case 'BarChart3':
        return <BarChart3 size={20} />;
      case 'Palette':
        return <Palette size={20} />;
      case 'Compass':
        return <Compass size={20} />;
      case 'TrendingUp':
        return <TrendingUp size={20} />;
      case 'Users':
        return <Users size={20} />;
      default:
        return <Briefcase size={20} />;
    }
  };

  // Icon mapping for stats
  const getStatIcon = (id) => {
    switch (id) {
      case 'jobs':
        return <Briefcase size={24} />;
      case 'companies':
        return <Building2 size={24} />;
      case 'seekers':
        return <Users size={24} />;
      case 'applications':
        return <FileCheck2 size={24} />;
      default:
        return <Briefcase size={24} />;
    }
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="home-container">
          <div className="hero-grid">
            {/* Left Hero Content */}
            <div className="hero-left">
              <div className="hero-eyebrow">
                <Sparkles size={14} />
                <span>YOUR CAREER STARTS HERE</span>
              </div>

              <h1 className="hero-heading">Find Opportunities That Fit You</h1>

              <p className="hero-subtitle">
                Explore thousands of jobs, connect with top companies, and get AI-powered resume insights to accelerate your career.
              </p>

              {/* Job Search Bar */}
              <div className="search-bar-container">
                <form className="search-bar-form" onSubmit={handleSearchSubmit}>
                  <div className="search-input-group">
                    <Search size={18} />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Job title, skill, or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="search-input-group">
                    <MapPin size={18} />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="City, state, or remote..."
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-nav btn-primary search-btn">
                    Search Jobs
                  </button>
                </form>
              </div>

              {/* Popular Searches */}
              <div className="popular-searches">
                <span className="popular-label">Popular:</span>
                {['Software Engineer', 'Data Analyst', 'Machine Learning', 'Java', 'Remote'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="popular-tag"
                    onClick={() => handlePopularSearch(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Visual Area */}
            <div className="hero-right">
              <div className="hero-visual-card">
                <div className="visual-header">
                  <div className="flex items-center gap-2">
                    <div className="brand-icon" style={{ width: 28, height: 28, borderRadius: 6 }}>
                      <Briefcase size={16} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                      JobTrack Matcher
                    </span>
                  </div>
                  <span className="visual-badge">
                    <CheckCircle2 size={13} /> AI Verified
                  </span>
                </div>

                <div className="match-ring-box">
                  <div className="match-score">94%</div>
                  <div className="match-info">
                    <h4>High Profile Match</h4>
                    <p>Matches Senior Frontend & Full Stack roles</p>
                  </div>
                </div>

                <div className="status-timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot done">✓</div>
                    <span>Resume Scanned & Analyzed</span>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot done">✓</div>
                    <span>Top 10 Roles Matched</span>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot">
                      <Clock size={12} />
                    </div>
                    <span>1-Click Application Ready</span>
                  </div>
                </div>

                {/* Floating Information Cards */}
                <div className="floating-cards-group">
                  <div className="floating-card">
                    <Upload size={16} />
                    <span>Upload Resume</span>
                  </div>
                  <div className="floating-card">
                    <Search size={16} />
                    <span>Find Jobs</span>
                  </div>
                  <div className="floating-card">
                    <Sparkles size={16} />
                    <span>Match Skills</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATS */}
      <section className="stats-section">
        <div className="home-container">
          <div className="stats-grid">
            {PLATFORM_STATS.map((stat) => (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon-wrapper">{getStatIcon(stat.id)}</div>
                <div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="categories-section">
        <div className="home-container">
          <div className="section-title-wrap">
            <h2 className="section-title">Popular Categories</h2>
            <p className="section-subtitle">Explore top career paths and featured job sectors</p>
          </div>

          <div className="categories-grid">
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                <div className="category-icon">{getCategoryIcon(cat.icon)}</div>
                <div>
                  <div className="category-name">{cat.name}</div>
                  <div className="category-count">{cat.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 & 5. MAIN CONTENT & RIGHT SIDEBAR */}
      <section className="home-container main-sidebar-layout">
        {/* Left / Main Content: LATEST JOBS */}
        <div className="jobs-main-col">
          <div className="jobs-header-bar">
            <div>
              <h2 className="section-title">Latest Job Openings</h2>
              <p className="section-subtitle">Discover active opportunities posted by top companies</p>
            </div>
            <Link to="/jobs" className="btn-nav btn-outline" style={{ padding: '0.4rem 0.85rem' }}>
              View All Jobs <ArrowRight size={14} style={{ marginLeft: 4 }} />
            </Link>
          </div>

          <div className="jobs-list">
            {MOCK_JOBS.map((job) => (
              <div key={job.id} className="job-item-card">
                <div className="job-item-left">
                  <div
                    className="company-logo-badge"
                    style={{ backgroundColor: job.companyLogoBg }}
                  >
                    {job.companyInitial}
                  </div>
                  <div className="job-details">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-meta-line">
                      <span className="job-company">{job.company}</span>
                      <span>•</span>
                      <span className="meta-item">
                        <MapPin size={13} /> {job.location}
                      </span>
                      <span>•</span>
                      <span className="meta-item">
                        <Clock size={13} /> {job.postedDate || job.postedTime || 'Recently'}
                      </span>
                    </div>

                    <div className="job-tags">
                      <span className="type-badge">{job.type}</span>
                      {(job.tags || job.skills || []).slice(0, 2).map((tag) => (
                        <span key={tag} className="tag-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="job-item-right">
                  <Link to={`/jobs/${job.id}`} className="btn-nav btn-outline">
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-btn-wrap">
            <Link to="/jobs" className="btn-nav btn-primary">
              Explore All Job Listings <ArrowRight size={16} style={{ marginLeft: 6 }} />
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="sidebar-col">
          {/* Resume Analyzer Card */}
          <div className="sidebar-card sidebar-card-primary">
            <div className="flex items-center gap-2">
              <Sparkles size={22} />
              <h3 className="sidebar-card-title">Resume AI Analyzer</h3>
            </div>
            <p className="sidebar-card-desc">
              Upload your resume and get instant feedback on your skills, strengths, and areas to improve.
            </p>
            <Link to="/resume-analyzer" className="btn-cta-light" style={{ width: '100%', textAlign: 'center' }}>
              Analyze Resume
            </Link>
          </div>

          {/* Career Tips Card */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">
              <FileText size={18} color="var(--color-primary)" />
              Career & Interview Tips
            </h3>
            <ul className="tips-list">
              {CAREER_TIPS.map((tip) => (
                <li key={tip.id} className="tip-item">
                  <CheckCircle2 size={16} />
                  <div>
                    <span style={{ fontWeight: 500 }}>{tip.title}</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {tip.category} • {tip.readTime}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Employer Card */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">
              <Building2 size={18} color="var(--color-primary)" />
              Are you an employer?
            </h3>
            <p className="sidebar-card-desc">
              Post jobs, find talented candidates, and grow your engineering and business teams effortlessly.
            </p>
            <Link to="/employers" className="btn-nav btn-outline" style={{ width: '100%', textAlign: 'center' }}>
              For Employers
            </Link>
          </div>
        </aside>
      </section>

      {/* 6. FINAL CTA */}
      <section className="final-cta-section">
        <div className="home-container">
          <div className="cta-box">
            <h2 className="cta-heading">Ready to take the next step?</h2>
            <p className="cta-desc">
              Join thousands of job seekers who found their dream role with JobTrack. Search active openings or analyze your resume today.
            </p>
            <div className="cta-actions">
              <Link to="/jobs" className="btn-cta-light">
                Find Jobs
              </Link>
              <Link to="/resume-analyzer" className="btn-cta-outline">
                Analyze My Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
