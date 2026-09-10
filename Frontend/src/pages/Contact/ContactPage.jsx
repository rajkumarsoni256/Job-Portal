import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Clock,
  HelpCircle,
  MessageSquare,
  UserCheck,
  Building2,
  Wrench,
  Send,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { Container, SectionHeader, Button, Card, Input, Badge } from '../../components/common';
import './ContactPage.css';

/**
 * Contact & Support Page Component
 * Module — Dedicated contact form and support portal for JobDekho
 */
function ContactPage() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    userType: 'jobseeker', // 'jobseeker' | 'recruiter' | 'other'
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General Support');

  const contactOptions = [
    {
      title: 'General Support',
      desc: 'Platform inquiries, features, and account help.',
      icon: <MessageSquare size={24} className="opt-icon text-primary" />,
    },
    {
      title: 'Job Seeker Support',
      desc: 'Applications, resume analysis, and job alerts.',
      icon: <UserCheck size={24} className="opt-icon text-info" />,
    },
    {
      title: 'Recruiter Support',
      desc: 'Job postings, candidate search, and employer plans.',
      icon: <Building2 size={24} className="opt-icon text-warning" />,
    },
    {
      title: 'Technical Support',
      desc: 'Bug reports, login issues, and technical feedback.',
      icon: <Wrench size={24} className="opt-icon text-error" />,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate fast frontend submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        userType: 'jobseeker',
        message: '',
      });

      // Auto hide success banner after 6 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 800);
  };

  return (
    <div className="contact-page-wrapper">
      {/* HERO SECTION */}
      <section className="contact-hero-section">
        <Container size="xl">
          <div className="contact-hero-content text-center">
            <Badge variant="primary" className="hero-badge">
              <HelpCircle size={14} /> JobDekho Support Center
            </Badge>

            <h1 className="contact-hero-title">
              How can we help?
            </h1>

            <p className="contact-hero-subtitle">
              Reach out to our support team for assistance, inquiries, or feedback. We are here to support your job search and hiring success.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT OPTIONS CARDS */}
      <section className="contact-options-section">
        <Container size="xl">
          <div className="options-grid">
            {contactOptions.map((opt, idx) => (
              <Card
                key={idx}
                variant="default"
                interactive
                padding="md"
                className={`option-card ${selectedCategory === opt.title ? 'active-opt-card' : ''}`}
                onClick={() => {
                  setSelectedCategory(opt.title);
                  setFormData((prev) => ({ ...prev, subject: `[${opt.title}] Inquiry` }));
                }}
              >
                <Card.Body>
                  <div className="opt-icon-wrapper">{opt.icon}</div>
                  <h3 className="opt-title">{opt.title}</h3>
                  <p className="opt-desc">{opt.desc}</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FORM & INFO SECTION */}
      <section className="contact-main-section">
        <Container size="xl">
          <div className="contact-main-grid">
            {/* Contact Form Column */}
            <div className="contact-form-col">
              <Card variant="default" padding="lg" className="form-card">
                <Card.Header
                  title="Send Us a Message"
                  subtitle={`Topic selected: ${selectedCategory}`}
                />

                <Card.Body>
                  {submitSuccess && (
                    <div className="submit-success-alert">
                      <CheckCircle2 size={20} className="text-success flex-shrink-0" />
                      <div>
                        <strong>Message Sent Successfully!</strong>
                        <p>Thank you for contacting JobDekho. Our support team will get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row-2">
                      <Input
                        label="Full Name"
                        name="fullName"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />

                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="input-label">User Type</label>
                      <div className="user-type-selector">
                        <label className={`radio-pill ${formData.userType === 'jobseeker' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="userType"
                            value="jobseeker"
                            checked={formData.userType === 'jobseeker'}
                            onChange={handleInputChange}
                          />
                          Job Seeker
                        </label>
                        <label className={`radio-pill ${formData.userType === 'recruiter' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="userType"
                            value="recruiter"
                            checked={formData.userType === 'recruiter'}
                            onChange={handleInputChange}
                          />
                          Recruiter / Employer
                        </label>
                        <label className={`radio-pill ${formData.userType === 'other' ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="userType"
                            value="other"
                            checked={formData.userType === 'other'}
                            onChange={handleInputChange}
                          />
                          Other
                        </label>
                      </div>
                    </div>

                    <Input
                      label="Subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. Question regarding my profile or job post"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />

                    <div className="form-group">
                      <label className="input-label" htmlFor="contact-message">
                        Message <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        className="custom-textarea"
                        placeholder="Describe your inquiry or how we can assist you..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      iconLeft={<Send size={18} />}
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            </div>

            {/* Contact Information & Help Shortcut Column */}
            <div className="contact-info-col">
              <div className="info-card">
                <h3 className="info-card-title">Contact Information</h3>
                <p className="info-card-sub">Reach our dedicated support lines directly.</p>

                <div className="info-items-list">
                  <div className="info-item">
                    <div className="info-icon-box">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="info-label">Email Support</span>
                      <a href="mailto:support@jobdekho.com" className="info-val-link">
                        support@jobdekho.com
                      </a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon-box">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <span className="info-label">Business & Sales Support</span>
                      <a href="mailto:business@jobdekho.com" className="info-val-link">
                        business@jobdekho.com
                      </a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon-box">
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className="info-label">Working Hours</span>
                      <span className="info-val-text">Mon - Sat: 9:00 AM - 7:00 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Shortcut Card */}
              <div className="faq-shortcut-card">
                <div className="faq-card-content">
                  <HelpCircle size={32} className="faq-icon text-primary" />
                  <div>
                    <h4 className="faq-card-title">Looking for instant answers?</h4>
                    <p className="faq-card-desc">
                      Browse our comprehensive Help Center and frequently asked questions for quick solutions.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  fullWidth
                  iconRight={<ArrowRight size={18} />}
                  onClick={() => navigate('/faq')}
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  Visit Help Center
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ContactPage;
