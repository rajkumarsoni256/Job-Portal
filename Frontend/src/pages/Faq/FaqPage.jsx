import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  HelpCircle,
  UserCheck,
  Building2,
  Sparkles,
  User,
  ArrowRight,
  MessageCircle,
  X,
} from 'lucide-react';
import { Container, Button, Card, Input, Badge } from '../../components/common';
import './FaqPage.css';

/**
 * Help Center & FAQ Page Component
 * Module — Dedicated FAQ knowledge base with search, category filtering & accordion interaction
 */
function FaqPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'job-seekers' | 'recruiters' | 'resume-analyzer' | 'account'
  const [openItems, setOpenItems] = useState({}); // { [itemKey]: boolean }

  const toggleAccordion = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Structured FAQ Data
  const faqCategories = [
    {
      id: 'job-seekers',
      name: 'Job Seekers',
      icon: <UserCheck size={20} />,
      questions: [
        {
          id: 'create-account',
          q: 'How do I create an account?',
          a: 'Click on the "Sign Up" button in the navigation header, select "Job Seeker", enter your name, email, and password, and complete registration in seconds.',
        },
        {
          id: 'apply-job',
          q: 'How do I apply for a job?',
          a: 'Browse active listings on the Jobs page, click on any job title to view full details, and click "Apply Now". You can attach your resume and submit immediately.',
        },
        {
          id: 'save-job',
          q: 'How do I save a job?',
          a: 'Click the bookmark icon on any job card or job detail page. Saved jobs are easily accessible from your Job Seeker Dashboard under "Saved Jobs".',
        },
        {
          id: 'resume-analyzer-how',
          q: 'How does Resume Analyzer work?',
          a: 'Upload your resume PDF or DOC file in the Resume Analyzer section. Our tool parses your skills, experience, and format to generate a detailed compatibility score and recommendations.',
        },
      ],
    },
    {
      id: 'recruiters',
      name: 'Recruiters',
      icon: <Building2 size={20} />,
      questions: [
        {
          id: 'post-job',
          q: 'How do I post a job?',
          a: 'Log into your Recruiter Dashboard, click "Post a Job", fill out the role title, job description, required skills, and salary range, then click "Publish Job".',
        },
        {
          id: 'manage-applications',
          q: 'How do I manage applications?',
          a: 'Navigate to "Applicants" or "Manage Jobs" in your Recruiter Dashboard. You can review candidate profiles, shortlist candidates, or update application statuses.',
        },
        {
          id: 'view-candidates',
          q: 'How do I view candidates?',
          a: 'Access your Applicants page to filter candidates by experience, AI match score, or job posting. Click on any applicant card to view their full resume breakdown.',
        },
        {
          id: 'manage-company-profile',
          q: 'How do I manage my company profile?',
          a: 'From your Recruiter Suite, navigate to "My Company" to upload your company logo, update your mission statement, industry, website, and office location.',
        },
      ],
    },
    {
      id: 'resume-analyzer',
      name: 'Resume Analyzer',
      icon: <Sparkles size={20} />,
      questions: [
        {
          id: 'files-supported',
          q: 'What files are supported?',
          a: 'We support standard PDF (.pdf), Microsoft Word (.doc, .docx), and plain text (.txt) files up to 5MB in size.',
        },
        {
          id: 'how-analyzed',
          q: 'How is my resume analyzed?',
          a: 'Our smart AI scanner extracts your skills, work history, education, and keywords, comparing them against real industry hiring criteria and job requirements.',
        },
        {
          id: 'resume-score',
          q: 'What is the resume score?',
          a: 'The resume score is a 0-100 rating indicating how optimized your resume is for candidate ATS scanners. It highlights strengths, missing skills, and format improvements.',
        },
      ],
    },
    {
      id: 'account',
      name: 'Account',
      icon: <User size={20} />,
      questions: [
        {
          id: 'change-password',
          q: 'How do I change my password?',
          a: 'Go to your Profile or Account Settings page, select "Security & Password", enter your current password, and set your new password.',
        },
        {
          id: 'update-profile',
          q: 'How do I update my profile?',
          a: 'Navigate to "My Profile" from your dashboard sidebar. You can update your bio, contact information, skills, work experience, and profile picture.',
        },
      ],
    },
  ];

  // Filtering Logic
  const filteredCategories = faqCategories
    .map((cat) => {
      // Category filter
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }

      // Search query filter
      const matchingQuestions = cat.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchingQuestions.length === 0) return null;

      return {
        ...cat,
        questions: matchingQuestions,
      };
    })
    .filter(Boolean);

  return (
    <div className="faq-page-wrapper">
      {/* HERO SECTION */}
      <section className="faq-hero-section">
        <Container size="xl">
          <div className="faq-hero-content text-center">
            <Badge variant="primary" className="hero-badge">
              <HelpCircle size={14} /> Help Center & Knowledge Base
            </Badge>

            <h1 className="faq-hero-title">
              Help Center
            </h1>

            <p className="faq-hero-subtitle">
              Find answers to common questions about JobDekho, job applications, resume insights, and recruiter tools.
            </p>

            {/* SEARCH UI */}
            <div className="faq-search-box">
              <Search size={20} className="search-icon text-muted" />
              <input
                type="text"
                className="search-input"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORIES TABS SECTION */}
      <section className="faq-categories-section">
        <Container size="xl">
          <div className="category-tabs-row">
            <button
              type="button"
              className={`cat-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Categories
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ACCORDION CONTENT SECTION */}
      <section className="faq-accordion-section">
        <Container size="xl">
          {filteredCategories.length === 0 ? (
            <div className="no-results-card">
              <HelpCircle size={40} className="text-muted" />
              <h3>No matching answers found</h3>
              <p>Try searching for different keywords or select another category tab above.</p>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="faq-categories-list">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="category-block">
                  <div className="category-block-header">
                    {cat.icon}
                    <h2 className="category-block-title">{cat.name}</h2>
                  </div>

                  <div className="accordion-group">
                    {cat.questions.map((item) => {
                      const itemKey = `${cat.id}-${item.id}`;
                      const isOpen = !!openItems[itemKey] || searchQuery.length > 0; // Auto expand when searching

                      return (
                        <div
                          key={item.id}
                          className={`accordion-item ${isOpen ? 'open' : ''}`}
                        >
                          <button
                            type="button"
                            className="accordion-header-btn"
                            onClick={() => toggleAccordion(itemKey)}
                            aria-expanded={isOpen}
                          >
                            <span className="question-text">{item.q}</span>
                            <ChevronDown size={20} className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
                          </button>

                          {isOpen && (
                            <div className="accordion-body">
                              <p className="answer-text">{item.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* STILL NEED HELP CTA SECTION */}
      <section className="faq-cta-section">
        <Container size="xl">
          <div className="faq-cta-banner">
            <div className="cta-content flex items-center gap-4">
              <MessageCircle size={36} className="cta-icon text-primary flex-shrink-0" />
              <div>
                <h2 className="cta-heading">Still need help?</h2>
                <p className="cta-sub">
                  Can’t find what you are looking for? Our support team is here to assist you.
                </p>
              </div>
            </div>
            <div className="cta-action">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
                onClick={() => navigate('/contact')}
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

export default FaqPage;
