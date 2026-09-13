import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Upload,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import { Container, Button, Card, Badge } from '../../components/common';
import ResumeUploader from '../../components/resume/ResumeUploader';
import './ResumeManagementPage.css';

/**
 * Job Seeker Resume Management Page Component
 * Module — Full resume management portal with preview, actions, detailed info & AI analyzer CTA
 */
function ResumeManagementPage() {
  const navigate = useNavigate();
  const [showUploaderModal, setShowUploaderModal] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  // Mock Resume State Data
  const [resumeData, setResumeData] = useState({
    fileName: 'Rahul_Sharma_FullStack_Resume.pdf',
    fileSize: '1.4 MB',
    lastUpdated: 'September 8, 2026',
    completionScore: 85,
    personalInfo: {
      fullName: 'Rahul Sharma',
      headline: 'Senior Full Stack Developer | React, Node.js & Cloud Architecture',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, Karnataka, India',
      portfolio: 'https://rahulsharma.dev',
    },
    education: [
      {
        degree: 'Bachelor of Technology in Computer Science',
        institution: 'Indian Institute of Technology (IIT), Bombay',
        period: '2019 - 2023',
        grade: 'CGPA: 8.8/10',
      },
    ],
    skills: [
      'React.js',
      'Node.js',
      'JavaScript (ES6+)',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'AWS',
      'REST APIs',
      'GraphQL',
      'Git & GitHub',
    ],
    experience: [
      {
        role: 'Full Stack Engineer',
        company: 'TechCorp Solutions India',
        period: 'Jun 2023 - Present',
        location: 'Bengaluru',
        description: 'Developed scalable microservices using Node.js and React, improving application render times by 35%. Spearheaded CI/CD pipelines.',
      },
      {
        role: 'Frontend Developer Intern',
        company: 'Innovate Labs',
        period: 'Jan 2023 - May 2023',
        location: 'Remote',
        description: 'Built responsive UI component libraries and integrated state management for real-time analytics dashboards.',
      },
    ],
    projects: [
      {
        name: 'JobDekho Portal',
        tech: 'React, Node.js, Express, PostgreSQL',
        desc: 'Built full-stack recruitment portal featuring automated AI resume parsing and application tracking.',
      },
      {
        name: 'Smart Resume Analyzer',
        tech: 'Python, Natural Language Processing, React',
        desc: 'Created natural language resume matcher comparing candidate skills against job descriptions.',
      },
    ],
    certifications: [
      {
        name: 'AWS Certified Developer – Associate',
        issuer: 'Amazon Web Services',
        date: 'Issued Nov 2023',
      },
      {
        name: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Coursera / Meta',
        date: 'Issued Aug 2023',
      },
    ],
  });

  const triggerNotice = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleDownload = () => {
    triggerNotice('Downloading your resume PDF document...');
  };

  const handleView = () => {
    triggerNotice('Opening resume document preview modal...');
  };

  return (
    <div style={{ padding: 'var(--space-6, 1.5rem)' }}>
      <Container size="xl" className="resume-page-container">
          {actionNotice && (
            <div className="resume-notice-banner">
              <CheckCircle2 size={18} className="text-success" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* 1. RESUME HEADER */}
          <div className="resume-header-card">
            <div className="resume-header-info">
              <Badge variant="primary" className="header-pill">Active Resume Profile</Badge>
              <h1 className="resume-title">My Resume</h1>
              <p className="resume-updated-text">
                <Calendar size={14} /> Last updated: {resumeData.lastUpdated}
              </p>
            </div>

            <div className="resume-score-block">
              <div className="score-circle-wrapper">
                <div className="score-number">{resumeData.completionScore}%</div>
                <div className="score-label">Completion</div>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${resumeData.completionScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* 2. RESUME PREVIEW & ACTIONS TOOLBAR */}
          <div className="resume-action-preview-grid">
            {/* Resume Preview Card */}
            <Card variant="default" padding="lg" className="preview-card">
              <Card.Header
                title="Current Uploaded Resume"
                action={<Badge variant="success">Parsed & Verified</Badge>}
              />
              <Card.Body>
                <div className="preview-file-box">
                  <div className="file-icon-box">
                    <FileText size={32} />
                  </div>
                  <div className="file-details">
                    <h4 className="file-name">{resumeData.fileName}</h4>
                    <p className="file-size">{resumeData.fileSize} • PDF Document</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Resume Actions Bar */}
            <Card variant="default" padding="lg" className="actions-card">
              <Card.Header title="Resume Actions" />
              <Card.Body className="actions-btn-grid">
                <Button
                  variant="primary"
                  iconLeft={<Upload size={18} />}
                  onClick={() => setShowUploaderModal(true)}
                >
                  Upload Resume
                </Button>
                <Button
                  variant="outline"
                  iconLeft={<Eye size={18} />}
                  onClick={handleView}
                >
                  View Resume
                </Button>
                <Button
                  variant="outline"
                  iconLeft={<Download size={18} />}
                  onClick={handleDownload}
                >
                  Download Resume
                </Button>
                <Button
                  variant="ghost"
                  iconLeft={<RefreshCw size={18} />}
                  onClick={() => setShowUploaderModal(true)}
                >
                  Replace Resume
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* UPLOAD MODAL IF TRIGGERED */}
          {showUploaderModal && (
            <div className="uploader-modal-overlay" onClick={() => setShowUploaderModal(false)}>
              <div className="uploader-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="uploader-modal-header">
                  <h3>Upload New Resume</h3>
                  <button type="button" className="close-btn" onClick={() => setShowUploaderModal(false)}>×</button>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <ResumeUploader />
                  <Button
                    variant="primary"
                    fullWidth
                    style={{ marginTop: 'var(--space-4)' }}
                    onClick={() => {
                      setShowUploaderModal(false);
                      triggerNotice('Resume successfully updated and parsed!');
                    }}
                  >
                    Confirm Upload
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 3. RESUME INFORMATION SECTIONS GRID */}
          <div className="resume-info-sections-grid">
            {/* Personal Info Card */}
            <Card variant="default" padding="lg" className="info-section-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <User size={20} className="text-primary" /> Personal Information
                  </span>
                }
              />
              <Card.Body className="personal-info-body">
                <div className="info-row-item">
                  <span className="label">Full Name:</span>
                  <span className="val font-semibold">{resumeData.personalInfo.fullName}</span>
                </div>
                <div className="info-row-item">
                  <span className="label">Headline:</span>
                  <span className="val">{resumeData.personalInfo.headline}</span>
                </div>
                <div className="info-row-item">
                  <span className="label"><Mail size={14} /> Email:</span>
                  <span className="val">{resumeData.personalInfo.email}</span>
                </div>
                <div className="info-row-item">
                  <span className="label"><Phone size={14} /> Phone:</span>
                  <span className="val">{resumeData.personalInfo.phone}</span>
                </div>
                <div className="info-row-item">
                  <span className="label"><MapPin size={14} /> Location:</span>
                  <span className="val">{resumeData.personalInfo.location}</span>
                </div>
              </Card.Body>
            </Card>

            {/* Skills Card */}
            <Card variant="default" padding="lg" className="info-section-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Code2 size={20} className="text-info" /> Skills & Technical Stack
                  </span>
                }
              />
              <Card.Body>
                <div className="skills-badge-list">
                  {resumeData.skills.map((skill, idx) => (
                    <Badge key={idx} variant="info" className="skill-pill-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Education Card */}
            <Card variant="default" padding="lg" className="info-section-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <GraduationCap size={20} className="text-warning" /> Education
                  </span>
                }
              />
              <Card.Body className="timeline-body">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="timeline-item">
                    <h4 className="timeline-title">{edu.degree}</h4>
                    <p className="timeline-sub">{edu.institution} • {edu.period}</p>
                    <span className="timeline-grade">{edu.grade}</span>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Experience Card */}
            <Card variant="default" padding="lg" className="info-section-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Briefcase size={20} className="text-success" /> Work Experience
                  </span>
                }
              />
              <Card.Body className="timeline-body">
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="timeline-item">
                    <h4 className="timeline-title">{exp.role}</h4>
                    <p className="timeline-sub">{exp.company} • {exp.period} ({exp.location})</p>
                    <p className="timeline-desc">{exp.description}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Projects Card */}
            <Card variant="default" padding="lg" className="info-section-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Code2 size={20} className="text-primary" /> Key Projects
                  </span>
                }
              />
              <Card.Body className="timeline-body">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="timeline-item">
                    <h4 className="timeline-title">{proj.name}</h4>
                    <span className="project-tech-badge">{proj.tech}</span>
                    <p className="timeline-desc" style={{ marginTop: '4px' }}>{proj.desc}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Certifications Card */}
            <Card variant="default" padding="lg" className="info-section-card">
              <Card.Header
                title={
                  <span className="section-title-with-icon">
                    <Award size={20} className="text-warning" /> Certifications & Licenses
                  </span>
                }
              />
              <Card.Body className="timeline-body">
                {resumeData.certifications.map((cert, idx) => (
                  <div key={idx} className="timeline-item">
                    <h4 className="timeline-title">{cert.name}</h4>
                    <p className="timeline-sub">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>

          {/* 4. RESUME ANALYZER CTA BANNER */}
          <div className="resume-analyzer-cta-banner">
            <div className="cta-banner-left">
              <Sparkles size={36} className="text-warning" />
              <div>
                <h3 className="cta-banner-title">Want AI feedback on your resume?</h3>
                <p className="cta-banner-sub">
                  Run your resume through our AI Analyzer to view key ATS score breakdowns, keyword recommendations, and role matches.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight size={18} />}
              onClick={() => navigate('/seeker/resume-analyzer')}
            >
              Analyze My Resume
            </Button>
          </div>
        </Container>
    </div>
  );
}

export default ResumeManagementPage;
