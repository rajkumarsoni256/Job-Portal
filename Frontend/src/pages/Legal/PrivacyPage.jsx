import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, ArrowRight, Mail, FileText, Lock, Eye, Server, Cookie, Scale } from 'lucide-react';
import { Container, Badge } from '../../components/common';
import './PrivacyPage.css';

/**
 * Privacy Policy Page Component
 * Module — Clean, readable legal document page for JobDekho
 */
function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const tocItems = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'info-collect', label: '2. Information We Collect' },
    { id: 'how-we-use', label: '3. How We Use Information' },
    { id: 'resume-data', label: '4. Resume Data' },
    { id: 'job-applications', label: '5. Job Applications' },
    { id: 'account-info', label: '6. Account Information' },
    { id: 'cookies', label: '7. Cookies' },
    { id: 'data-security', label: '8. Data Security' },
    { id: 'data-retention', label: '9. Data Retention' },
    { id: 'third-party', label: '10. Third-Party Services' },
    { id: 'user-rights', label: '11. User Rights' },
    { id: 'contact-info', label: '12. Contact Information' },
    { id: 'policy-updates', label: '13. Policy Updates' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="privacy-page-wrapper">
      {/* HEADER SECTION */}
      <section className="privacy-header-section">
        <Container size="xl">
          <div className="privacy-header-content text-center">
            <Badge variant="primary" className="hero-badge">
              <ShieldCheck size={14} /> Legal & Privacy Center
            </Badge>

            <h1 className="privacy-header-title">
              Privacy Policy
            </h1>

            <p className="privacy-header-subtitle">
              How JobDekho collects, uses, and safeguards your personal data when using our job discovery and recruitment platform.
            </p>

            <div className="last-updated-tag">
              <Calendar size={14} /> Last Updated: September 10, 2026
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN DOCUMENT SECTION */}
      <section className="privacy-doc-section">
        <Container size="xl">
          <div className="privacy-layout-grid">
            {/* Table of Contents Sidebar */}
            <aside className="privacy-sidebar">
              <div className="toc-card">
                <h3 className="toc-title">Table of Contents</h3>
                <nav className="toc-nav">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`toc-link ${activeSection === item.id ? 'active' : ''}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Document Content Column */}
            <main className="privacy-content-col">
              {/* SECTION 1 */}
              <section id="introduction" className="legal-section">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to JobDekho ("we", "our", or "us"). We are committed to respecting and protecting your privacy while connecting ambitious job seekers with top-tier companies. This Privacy Policy explains our data collection, storage, and processing practices when you visit our website, submit job applications, or utilize our AI Resume Analyzer tool.
                </p>
                <p>
                  By accessing or using JobDekho, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="info-collect" className="legal-section">
                <h2>2. Information We Collect</h2>
                <p>
                  We collect information to provide better recruitment matches and service performance. The information gathered includes:
                </p>
                <ul>
                  <li><strong>Personal Identifiers:</strong> Your name, email address, phone number, and account credentials.</li>
                  <li><strong>Professional Profile Data:</strong> Work history, education credentials, technical skills, portfolio links, and preferred job locations.</li>
                  <li><strong>Recruiter & Company Information:</strong> Business name, corporate email, office address, and hiring team details.</li>
                  <li><strong>Technical Usage Data:</strong> IP address, browser type, device information, operating system, and interaction logs.</li>
                </ul>
              </section>

              {/* SECTION 3 */}
              <section id="how-we-use" className="legal-section">
                <h2>3. How We Use Information</h2>
                <p>
                  JobDekho utilizes the collected data for the following legitimate business purposes:
                </p>
                <ul>
                  <li>To match candidate profiles with relevant job listings posted by verified employers.</li>
                  <li>To process job applications submitted through our platform.</li>
                  <li>To run AI-driven resume scoring and provide improvement insights.</li>
                  <li>To facilitate communication between job seekers and hiring managers.</li>
                  <li>To improve platform security, detect fraud, and maintain service stability.</li>
                </ul>
              </section>

              {/* SECTION 4 */}
              <section id="resume-data" className="legal-section">
                <h2>4. Resume Data</h2>
                <div className="legal-callout-box">
                  <div className="callout-title">
                    <FileText size={18} className="text-primary" /> Resume Analyzer Privacy Guarantee
                  </div>
                  <p>
                    Resumes uploaded to JobDekho are processed strictly for extracting relevant skills, work history, and match scores. We do not sell your resume data to third-party data brokers or marketing agencies.
                  </p>
                </div>
                <p>
                  When you upload a resume (in PDF, DOC, or DOCX format), our system parses text content to generate candidate matching metrics. You retain full control to update, replace, or delete stored resume documents at any time from your Job Seeker Profile settings.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="job-applications" className="legal-section">
                <h2>5. Job Applications</h2>
                <p>
                  When you apply for a job posting on JobDekho, your profile details, submitted resume, and contact email are shared directly with the verified employer who created that job listing. Employers are bound by their own privacy practices and confidentiality agreements regarding candidate data.
                </p>
              </section>

              {/* SECTION 6 */}
              <section id="account-info" className="legal-section">
                <h2>6. Account Information</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your account login credentials. You can update your personal information, profile photo, or password at any time via your account dashboard settings.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="cookies" className="legal-section">
                <h2>7. Cookies</h2>
                <p>
                  JobDekho uses cookies and similar tracking technologies to enhance user experience, remember login sessions, and analyze site traffic.
                </p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for user authentication and navigation.</li>
                  <li><strong>Preference Cookies:</strong> Remember user language and dashboard filter settings.</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand platform usage to optimize speed and layout.</li>
                </ul>
              </section>

              {/* SECTION 8 */}
              <section id="data-security" className="legal-section">
                <h2>8. Data Security</h2>
                <p>
                  We implement industry-standard technical and organizational security measures, including HTTPS encryption, secure database access controls, and regular code audits, to safeguard your information against unauthorized access, loss, or disclosure.
                </p>
              </section>

              {/* SECTION 9 */}
              <section id="data-retention" className="legal-section">
                <h2>9. Data Retention</h2>
                <p>
                  We retain personal data as long as your account remains active or as needed to provide you with recruitment services. If you delete your account, we will remove your active profile and job applications from public view within 30 days.
                </p>
              </section>

              {/* SECTION 10 */}
              <section id="third-party" className="legal-section">
                <h2>10. Third-Party Services</h2>
                <p>
                  JobDekho may contain links to external company websites or partner platforms. We are not responsible for the privacy practices or content of third-party websites. We encourage you to review the privacy policies of any site you visit.
                </p>
              </section>

              {/* SECTION 11 */}
              <section id="user-rights" className="legal-section">
                <h2>11. User Rights</h2>
                <p>
                  Depending on your jurisdiction, you possess the following rights regarding your personal information:
                </p>
                <ul>
                  <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate profile data.</li>
                  <li><strong>Right to Erasure:</strong> Request permanent deletion of your account and resume data.</li>
                  <li><strong>Right to Restrict Processing:</strong> Opt out of automated resume match suggestions.</li>
                </ul>
              </section>

              {/* SECTION 12 */}
              <section id="contact-info" className="legal-section">
                <h2>12. Contact Information</h2>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Team at:
                </p>
                <div className="contact-box">
                  <Mail size={20} className="text-primary" />
                  <div>
                    <strong>JobDekho Privacy & Compliance Officer</strong>
                    <br />
                    Email: <a href="mailto:privacy@jobdekho.com">privacy@jobdekho.com</a>
                    <br />
                    Address: JobDekho Support HQ, Innovation Park, Tech Hub, India
                  </div>
                </div>
              </section>

              {/* SECTION 13 */}
              <section id="policy-updates" className="legal-section">
                <h2>13. Policy Updates</h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our platform practices or relevant legal requirements. We will notify registered users of material updates by posting a notice on our homepage or via email prior to changes taking effect.
                </p>
              </section>
            </main>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default PrivacyPage;
