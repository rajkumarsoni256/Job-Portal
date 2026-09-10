import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Users,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  BookOpen,
  ArrowRight,
  HelpCircle,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Container, SectionHeader, Button, Card, Badge } from '../../components/common';
import './EmployerResourcesPage.css';

/**
 * Employer Resources Page Component
 * Dedicated resources & recruitment guides hub for employers
 */
function EmployerResourcesPage() {
  const navigate = useNavigate();
  const [activeModalGuide, setActiveModalGuide] = useState(null);

  const guides = [
    {
      id: 'hiring-guide',
      title: 'Hiring Guide',
      description: 'Learn how to create effective job postings and attract qualified candidates.',
      icon: <FileText size={28} className="guide-icon text-primary" />,
      content: {
        subtitle: 'Mastering Job Postings & Candidate Attraction',
        tips: [
          'Use clear, industry-standard job titles rather than internal acronyms.',
          'Highlight key responsibilities and essential vs. preferred qualifications.',
          'Define salary transparency to increase application rates by up to 45%.',
          'Include company culture highlights and key growth opportunities.',
        ],
      },
    },
    {
      id: 'interview-guide',
      title: 'Interview Guide',
      description: 'Improve your interview process and evaluate candidates effectively.',
      icon: <Users size={28} className="guide-icon text-info" />,
      content: {
        subtitle: 'Structured Interviewing Techniques',
        tips: [
          'Implement STAR method (Situation, Task, Action, Result) behavior questions.',
          'Standardize questions across all candidates for unbiased assessment.',
          'Incorporate practical work sample tests or live case studies.',
          'Provide transparent feedback loops to enhance candidate experience.',
        ],
      },
    },
    {
      id: 'resume-screening-guide',
      title: 'Resume Screening Guide',
      description: 'Learn how to identify relevant skills and experience quickly.',
      icon: <Sparkles size={28} className="guide-icon text-warning" />,
      content: {
        subtitle: 'Fast & Accurate Profile Evaluation',
        tips: [
          'Leverage JobDekho AI resume parsing to score candidate skills.',
          'Focus on demonstrated achievements rather than passive task lists.',
          'Identify transferable skill sets across related technology stacks.',
          'Check candidate longevity and consistent career progression.',
        ],
      },
    },
    {
      id: 'recruitment-best-practices',
      title: 'Recruitment Best Practices',
      description: 'Practical strategies for improving your hiring workflow.',
      icon: <Zap size={28} className="guide-icon text-success" />,
      content: {
        subtitle: 'Streamlining Time-to-Hire & Acceptance Rates',
        tips: [
          'Keep your entire interview process under 3 stages to prevent candidate drop-off.',
          'Maintain active communication updates within 48 hours of each stage.',
          'Align internal hiring managers on candidate profile requirements early.',
          'Build talent pipelines for future hiring cycles.',
        ],
      },
    },
    {
      id: 'candidate-evaluation',
      title: 'Candidate Evaluation',
      description: 'Understand how to compare candidates consistently.',
      icon: <Target size={28} className="guide-icon text-primary" />,
      content: {
        subtitle: 'Objective Scorecards & Skill Metrics',
        tips: [
          'Use unified scorecard templates for technical and soft-skill ratings.',
          'Distinguish core must-haves from secondary skill preferences.',
          'Debrief with the hiring committee immediately following interviews.',
          'Minimize cognitive bias through anonymized initial screenings.',
        ],
      },
    },
    {
      id: 'hiring-analytics',
      title: 'Hiring Analytics',
      description: 'Use recruitment data to improve hiring decisions.',
      icon: <BarChart3 size={28} className="guide-icon text-info" />,
      content: {
        subtitle: 'Data-Driven Recruitment Optimization',
        tips: [
          'Track applicant conversion rates by job posting channel.',
          'Measure average time-to-fill for technical vs. non-technical roles.',
          'Analyze candidate drop-off points in your hiring funnel.',
          'Utilize feedback data to continuously refine job descriptions.',
        ],
      },
    },
  ];

  const handleOpenGuide = (guide) => {
    setActiveModalGuide(guide);
  };

  const handleCloseModal = () => {
    setActiveModalGuide(null);
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <div className="resources-page-wrapper">
      {/* HERO SECTION */}
      <section className="resources-hero-section">
        <Container size="xl">
          <div className="resources-hero-content text-center">
            <Badge variant="info" className="hero-badge">
              <BookOpen size={14} /> Employer Resource Center
            </Badge>

            <h1 className="resources-hero-title">
              Employer Resources
            </h1>

            <p className="resources-hero-subtitle">
              Guides and resources to help you hire smarter.
            </p>
          </div>
        </Container>
      </section>

      {/* RESOURCE CARDS GRID */}
      <section className="resources-grid-section">
        <Container size="xl">
          <div className="resources-grid">
            {guides.map((guide) => (
              <Card
                key={guide.id}
                variant="default"
                interactive
                padding="lg"
                className="resource-card"
              >
                <Card.Body>
                  <div className="guide-icon-wrapper">
                    {guide.icon}
                  </div>
                  <h3 className="resource-card-title">{guide.title}</h3>
                  <p className="resource-card-desc">{guide.description}</p>
                </Card.Body>

                <Card.Footer>
                  <Button
                    variant="outline"
                    fullWidth
                    iconRight={<ArrowRight size={16} />}
                    onClick={() => handleOpenGuide(guide)}
                  >
                    Read Guide
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* GUIDE READ MODAL */}
      {activeModalGuide && (
        <div className="guide-modal-overlay" onClick={handleCloseModal}>
          <div className="guide-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="guide-modal-header">
              <div className="flex items-center gap-3">
                {activeModalGuide.icon}
                <div>
                  <h3 className="modal-title">{activeModalGuide.title}</h3>
                  <p className="modal-sub">{activeModalGuide.content.subtitle}</p>
                </div>
              </div>
              <button type="button" className="close-btn" onClick={handleCloseModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <div className="guide-modal-body">
              <p className="modal-intro">{activeModalGuide.description}</p>

              <h4 className="tips-heading">Key Strategies & Actionable Advice:</h4>
              <ul className="guide-tips-list">
                {activeModalGuide.content.tips.map((tip, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="guide-modal-footer">
              <Button variant="primary" onClick={handleCloseModal}>
                Got It, Thanks!
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FINAL CALL TO ACTION (CTA) */}
      <section className="resources-cta-section">
        <Container size="xl">
          <div className="resources-cta-card">
            <div className="cta-left">
              <HelpCircle size={40} className="cta-icon text-primary" />
              <div>
                <h2 className="resources-cta-title">Need help with hiring?</h2>
                <p className="resources-cta-sub">
                  Our talent acquisition team is available to help you set up jobs and optimize candidate evaluation.
                </p>
              </div>
            </div>
            <div className="cta-right">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
                onClick={handleContactSupport}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default EmployerResourcesPage;
