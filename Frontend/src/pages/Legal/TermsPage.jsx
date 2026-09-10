import React, { useState } from 'react';
import { ShieldCheck, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { Container, Badge } from '../../components/common';
import './TermsPage.css';

/**
 * Terms of Service Page Component
 * Clean, readable legal document governing JobDekho usage
 */
function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const tocItems = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'account-reg', label: '2. Account Registration' },
    { id: 'seeker-resp', label: '3. Job Seeker Responsibilities' },
    { id: 'recruiter-resp', label: '4. Recruiter Responsibilities' },
    { id: 'job-listings', label: '5. Job Listings' },
    { id: 'applications', label: '6. Applications' },
    { id: 'resume-analyzer', label: '7. Resume Analyzer' },
    { id: 'prohibited-activities', label: '8. Prohibited Activities' },
    { id: 'intellectual-property', label: '9. Intellectual Property' },
    { id: 'platform-availability', label: '10. Platform Availability' },
    { id: 'account-suspension', label: '11. Account Suspension' },
    { id: 'limitation-liability', label: '12. Limitation of Liability' },
    { id: 'changes-to-terms', label: '13. Changes to Terms' },
    { id: 'contact-info', label: '14. Contact Information' },
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
    <div className="terms-page-wrapper">
      {/* HEADER SECTION */}
      <section className="terms-header-section">
        <Container size="xl">
          <div className="terms-header-content text-center">
            <Badge variant="primary" className="hero-badge">
              <ShieldCheck size={14} /> Legal Agreement
            </Badge>

            <h1 className="terms-header-title">
              Terms of Service
            </h1>

            <p className="terms-header-subtitle">
              Terms and conditions governing the use of JobDekho for job seekers, recruiters, and partner organizations.
            </p>

            <div className="last-updated-tag">
              <Calendar size={14} /> Last Updated: September 10, 2026
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN DOCUMENT SECTION */}
      <section className="terms-doc-section">
        <Container size="xl">
          <div className="terms-layout-grid">
            {/* Table of Contents Sidebar */}
            <aside className="terms-sidebar">
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
            <main className="terms-content-col">
              {/* SECTION 1 */}
              <section id="introduction" className="legal-section">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to JobDekho. These Terms of Service ("Terms") constitute a legally binding agreement between you and JobDekho ("we", "us", or "our") governing your access to and use of our website, candidate discovery tools, recruiter dashboard, and Resume Analyzer service.
                </p>
                <p>
                  By creating an account or accessing JobDekho, you confirm that you have read, understood, and agree to be bound by these Terms.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="account-reg" className="legal-section">
                <h2>2. Account Registration</h2>
                <p>
                  To access certain features of JobDekho, such as submitting job applications or publishing job postings, you must register for an account. You agree to:
                </p>
                <ul>
                  <li>Provide accurate, current, and complete information during registration.</li>
                  <li>Maintain and promptly update your account profile data.</li>
                  <li>Maintain the security of your password and accept responsibility for all activities under your account.</li>
                </ul>
              </section>

              {/* SECTION 3 */}
              <section id="seeker-resp" className="legal-section">
                <h2>3. Job Seeker Responsibilities</h2>
                <p>
                  As a job seeker on JobDekho, you agree to submit truthful resume details, employment history, and education credentials. Misrepresenting skills, identity, or work experience may result in account termination.
                </p>
              </section>

              {/* SECTION 4 */}
              <section id="recruiter-resp" className="legal-section">
                <h2>4. Recruiter Responsibilities</h2>
                <p>
                  As a recruiter or hiring employer, you represent and warrant that you have authority to recruit on behalf of your organization. You agree to evaluate candidates fairly, comply with applicable equal employment opportunity laws, and maintain candidate confidentiality.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="job-listings" className="legal-section">
                <h2>5. Job Listings</h2>
                <p>
                  Employers are solely responsible for the content of job listings posted on JobDekho. Job postings must represent genuine, active employment opportunities and must not contain deceptive, fraudulent, or illegal job offers.
                </p>
              </section>

              {/* SECTION 6 */}
              <section id="applications" className="legal-section">
                <h2>6. Applications</h2>
                <p>
                  JobDekho acts as a venue for job seekers to apply for positions posted by recruiters. We do not guarantee employment, interview invitations, or response times from employers.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="resume-analyzer" className="legal-section">
                <h2>7. Resume Analyzer</h2>
                <p>
                  Our Resume Analyzer provides automated formatting and skill matching insights based on statistical patterns and algorithm analysis. Resume scores and suggestions are informational aids and do not guarantee candidate shortlisting or job placement.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="prohibited-activities" className="legal-section">
                <h2>8. Prohibited Activities</h2>
                <p>
                  Users shall not engage in any of the following prohibited behaviors:
                </p>
                <ul>
                  <li>Scraping or harvesting user profiles, candidate emails, or job postings using automated scripts.</li>
                  <li>Posting false, misleading, or offensive content.</li>
                  <li>Attempting to breach, disable, or circumvent platform security controls.</li>
                  <li>Using JobDekho to send unsolicited spam communications.</li>
                </ul>
              </section>

              {/* SECTION 9 */}
              <section id="intellectual-property" className="legal-section">
                <h2>9. Intellectual Property</h2>
                <p>
                  All trademarks, logos, brand assets, software code, and interface designs on JobDekho are the exclusive property of JobDekho. You may not copy, modify, or redistribute platform branding without prior written consent.
                </p>
              </section>

              {/* SECTION 10 */}
              <section id="platform-availability" className="legal-section">
                <h2>10. Platform Availability</h2>
                <p>
                  We strive to maintain 99.9% uptime, but we do not guarantee uninterrupted platform availability. Maintenance, upgrades, or unexpected technical issues may cause temporary service interruptions.
                </p>
              </section>

              {/* SECTION 11 */}
              <section id="account-suspension" className="legal-section">
                <h2>11. Account Suspension</h2>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or disrupt platform operations, with or without prior notice.
                </p>
              </section>

              {/* SECTION 12 */}
              <section id="limitation-liability" className="legal-section">
                <h2>12. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, JobDekho shall not be liable for any indirect, incidental, or consequential damages arising from your use of or inability to use the platform.
                </p>
              </section>

              {/* SECTION 13 */}
              <section id="changes-to-terms" className="legal-section">
                <h2>13. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time. Continued use of JobDekho following posted updates constitutes your acceptance of the revised Terms.
                </p>
              </section>

              {/* SECTION 14 */}
              <section id="contact-info" className="legal-section">
                <h2>14. Contact Information</h2>
                <p>
                  If you have questions regarding these Terms of Service, please contact our Legal Team at:
                </p>
                <div className="contact-box">
                  <FileText size={20} className="text-primary" />
                  <div>
                    <strong>JobDekho Legal Department</strong>
                    <br />
                    Email: legal@jobdekho.com
                    <br />
                    Address: JobDekho Legal HQ, Innovation Park, Tech Hub, India
                  </div>
                </div>
              </section>
            </main>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default TermsPage;
