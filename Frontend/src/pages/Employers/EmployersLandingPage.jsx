import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Sparkles,
  Send,
  Target,
  BarChart3,
  Building2,
  PlusCircle,
  CheckCircle2,
  Clock,
  Search,
  Check,
  ArrowRight,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { Container, SectionHeader, Button, Card, Badge } from '../../components/common';
import './EmployersLandingPage.css';

/**
 * Employers Landing Page Component
 * Module 20 — Dedicated landing page for employers and recruiters on JobDekho
 */
function EmployersLandingPage() {
  const navigate = useNavigate();

  const handlePostJob = () => {
    navigate('/recruiter/jobs/new');
  };

  const handleDashboard = () => {
    navigate('/recruiter/dashboard');
  };

  // Why JobDekho Feature Cards Data
  const features = [
    {
      icon: <PlusCircle size={24} className="feature-icon-svg text-primary" />,
      title: 'Post Jobs',
      description: 'Create and publish job opportunities quickly.',
    },
    {
      icon: <Search size={24} className="feature-icon-svg text-info" />,
      title: 'Find Qualified Candidates',
      description: 'Discover candidates based on skills and experience.',
    },
    {
      icon: <Sparkles size={24} className="feature-icon-svg text-warning" />,
      title: 'Resume Insights',
      description: 'Use resume information to understand candidate profiles.',
    },
    {
      icon: <Send size={24} className="feature-icon-svg text-success" />,
      title: 'Manage Applications',
      description: 'Track and manage applications from one place.',
    },
    {
      icon: <Target size={24} className="feature-icon-svg text-primary" />,
      title: 'Candidate Matching',
      description: 'Compare candidate skills with your job requirements.',
    },
    {
      icon: <BarChart3 size={24} className="feature-icon-svg text-info" />,
      title: 'Hiring Analytics',
      description: 'Understand your recruitment activity with useful insights.',
    },
  ];

  // How It Works Steps Data
  const steps = [
    {
      number: '01',
      title: 'Create Your Company Profile',
      description: 'Set up your company brand, details, and workspace in minutes.',
      icon: <Building2 size={24} />,
    },
    {
      number: '02',
      title: 'Post Your Job',
      description: 'Fill out key details, skills required, and location to publish.',
      icon: <Briefcase size={24} />,
    },
    {
      number: '03',
      title: 'Review Candidates',
      description: 'Browse applicant profiles, resume analysis scores, and credentials.',
      icon: <Users size={24} />,
    },
    {
      number: '04',
      title: 'Hire the Right Talent',
      description: 'Connect directly with top candidates and complete your hiring.',
      icon: <CheckCircle2 size={24} />,
    },
  ];

  // Recruiter Benefits Data
  const benefits = [
    {
      title: 'Faster Hiring',
      description: 'Streamline job posting and shortlist candidate applications in record time.',
      icon: <Clock size={20} className="benefit-icon" />,
    },
    {
      title: 'Better Candidate Discovery',
      description: 'Reach high-performing talent across tech, product, design, and operations.',
      icon: <Search size={20} className="benefit-icon" />,
    },
    {
      title: 'Centralized Applications',
      description: 'Manage status transitions, notes, and applicant progress from one clean dashboard.',
      icon: <Send size={20} className="benefit-icon" />,
    },
    {
      title: 'Resume-Based Insights',
      description: 'Leverage smart AI analysis to match applicant skills with job requirements accurately.',
      icon: <Sparkles size={20} className="benefit-icon" />,
    },
    {
      title: 'Easy Job Management',
      description: 'Seamlessly update, pause, or repost openings whenever your team scales.',
      icon: <Briefcase size={20} className="benefit-icon" />,
    },
  ];

  return (
    <div className="employers-page-wrapper">
      {/* HERO SECTION */}
      <section className="employers-hero-section">
        <Container size="xl">
          <div className="employers-hero-grid">
            <div className="employers-hero-content">
              <Badge variant="info" className="hero-pill-badge">
                <Zap size={14} className="hero-pill-icon" /> For Employers & Recruiters
              </Badge>

              <h1 className="employers-hero-title">
                Hire the Right Talent with <span className="highlight-text">JobDekho</span>
              </h1>

              <p className="employers-hero-subtitle">
                Connect with skilled candidates, post jobs, and simplify your hiring process.
              </p>

              <div className="employers-hero-actions">
                <Button
                  variant="primary"
                  size="lg"
                  iconLeft={<PlusCircle size={20} />}
                  onClick={handlePostJob}
                >
                  Post a Job
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconRight={<ArrowRight size={18} />}
                  onClick={handleDashboard}
                >
                  Explore Recruiter Dashboard
                </Button>
              </div>

              <div className="hero-trust-metrics">
                <div className="metric-item">
                  <span className="metric-num">10k+</span>
                  <span className="metric-label">Active Job Seekers</span>
                </div>
                <div className="metric-divider" />
                <div className="metric-item">
                  <span className="metric-num">95%</span>
                  <span className="metric-label">Hire Satisfaction</span>
                </div>
                <div className="metric-divider" />
                <div className="metric-item">
                  <span className="metric-num">24h</span>
                  <span className="metric-label">Avg. First Applicant</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card matching JobDekho aesthetic */}
            <div className="employers-hero-visual">
              <div className="hero-visual-card">
                <div className="visual-card-header">
                  <div className="company-meta">
                    <div className="company-logo-ph">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h4 className="visual-company-name">TechCorp Global</h4>
                      <p className="visual-company-sub">Recruiter Suite Active</p>
                    </div>
                  </div>
                  <Badge variant="success">Active Hiring</Badge>
                </div>

                <div className="visual-stats-row">
                  <div className="visual-stat-box">
                    <span className="visual-stat-title">Open Jobs</span>
                    <span className="visual-stat-val">12</span>
                  </div>
                  <div className="visual-stat-box">
                    <span className="visual-stat-title">Applicants</span>
                    <span className="visual-stat-val">148</span>
                  </div>
                  <div className="visual-stat-box">
                    <span className="visual-stat-title">AI Match</span>
                    <span className="visual-stat-val text-primary">94%</span>
                  </div>
                </div>

                <div className="visual-applicant-preview">
                  <div className="preview-label">Top Candidate Match</div>
                  <div className="applicant-mini-card">
                    <div className="avatar-ph">RS</div>
                    <div className="applicant-info">
                      <div className="applicant-name">Rahul Sharma</div>
                      <div className="applicant-role">Senior Full Stack Engineer</div>
                    </div>
                    <Badge variant="info">98% Match</Badge>
                  </div>
                </div>

                <div className="visual-card-footer">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Resume analysis & skill verification ready</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY JOBDEKHO (FEATURES) SECTION */}
      <section className="employers-features-section">
        <Container size="xl">
          <SectionHeader
            title="Everything You Need to Hire Better"
            description="Empowering your recruiting team with powerful, easy-to-use tools designed for modern hiring."
            className="text-center-header"
          />

          <div className="features-grid">
            {features.map((feature, idx) => (
              <Card key={idx} variant="default" interactive padding="lg" className="feature-card">
                <Card.Body>
                  <div className="feature-icon-wrapper">{feature.icon}</div>
                  <h3 className="feature-card-title">{feature.title}</h3>
                  <p className="feature-card-desc">{feature.description}</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="employers-steps-section">
        <Container size="xl">
          <SectionHeader
            title="How It Works"
            description="Four simple steps to find, evaluate, and hire top candidates for your open roles."
            className="text-center-header"
          />

          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number-badge">{step.number}</div>
                <div className="step-icon-circle">{step.icon}</div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* RECRUITER BENEFITS SECTION */}
      <section className="employers-benefits-section">
        <Container size="xl">
          <div className="benefits-layout">
            <div className="benefits-info-col">
              <Badge variant="primary" className="benefits-badge">Recruiter Benefits</Badge>
              <h2 className="benefits-section-title">Why Top Employers Choose JobDekho</h2>
              <p className="benefits-section-desc">
                From startups to enterprise hiring teams, JobDekho provides end-to-end recruitment tools to streamline candidate discovery and evaluation.
              </p>

              <div className="benefits-list">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="benefit-item">
                    <div className="benefit-icon-box">{benefit.icon}</div>
                    <div className="benefit-content">
                      <h4 className="benefit-item-title">{benefit.title}</h4>
                      <p className="benefit-item-desc">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="benefits-card-col">
              <div className="benefits-highlight-card">
                <div className="highlight-header">
                  <ShieldCheck size={28} className="highlight-icon" />
                  <div>
                    <h3 className="highlight-title">Built for Modern Recruiters</h3>
                    <p className="highlight-sub">Save time on candidate shortlisting</p>
                  </div>
                </div>

                <div className="highlight-metrics-grid">
                  <div className="highlight-box">
                    <span className="box-val">3x</span>
                    <span className="box-lbl">Faster Shortlisting</span>
                  </div>
                  <div className="highlight-box">
                    <span className="box-val">80%</span>
                    <span className="box-lbl">Time Saved</span>
                  </div>
                </div>

                <ul className="highlight-checklist">
                  <li><Check size={16} className="text-success" /> Unlimited job post drafting</li>
                  <li><Check size={16} className="text-success" /> Applicant resume profile breakdown</li>
                  <li><Check size={16} className="text-success" /> Role-based recruiter workspace</li>
                  <li><Check size={16} className="text-success" /> Direct candidate status updates</li>
                </ul>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={handlePostJob}
                  iconLeft={<PlusCircle size={18} />}
                  style={{ marginTop: 'var(--space-6)' }}
                >
                  Start Hiring Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="employers-cta-section">
        <Container size="xl">
          <div className="cta-banner-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Find Your Next Great Hire?</h2>
              <p className="cta-subtitle">
                Join thousands of recruiters already finding top-tier candidates on JobDekho.
              </p>
            </div>
            <div className="cta-actions">
              <Button
                variant="primary"
                size="lg"
                iconLeft={<PlusCircle size={20} />}
                onClick={handlePostJob}
              >
                Post a Job
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-cta-secondary"
                iconRight={<ArrowRight size={18} />}
                onClick={handleDashboard}
              >
                Go to Recruiter Dashboard
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default EmployersLandingPage;
