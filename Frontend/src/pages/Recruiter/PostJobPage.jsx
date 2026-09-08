import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  DollarSign,
  Award,
  FileText,
  ListChecks,
  Code2,
  Gift,
  Plus,
  Trash2,
  Eye,
  Save,
  Send,
  CheckCircle2,
  X,
  MapPin,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { JOBS_DATA } from '../../data/jobs';
import { RECRUITER_PROFILE } from '../../data/recruiterData';
import './PostJobPage.css';
import '../JobSeeker/JobSeekerDashboard.css';

/**
 * Standard benefits list for rapid toggle selection
 */
const DEFAULT_BENEFITS = [
  'Comprehensive Health, Dental & Vision Insurance',
  '401(k) / Provident Fund with Employer Matching',
  'Flexible Work Hours & Hybrid/Remote Options',
  'Generous Paid Time Off (PTO) & Sick Leave',
  'Annual Learning & Professional Conference Budget',
  'Wellness Reimbursement & Gym Subsidies',
  'Performance Bonuses & Equity Grants (RSUs)',
  'Free Daily Lunch & Office Refreshments',
];

function PostJobPage() {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    company: RECRUITER_PROFILE.company || 'TechCorp Inc.',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    type: 'Full-time',
    salaryMin: '80000',
    salaryMax: '120000',
    currency: 'USD ($)',
    expMin: '1',
    expMax: '3',
    description: '',
    responsibilities: [
      'Architect, develop, and maintain high-performance scalable features.',
      'Collaborate with product designers, managers, and backend engineers.',
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
    benefits: [
      'Comprehensive Health, Dental & Vision Insurance',
      'Flexible Work Hours & Hybrid/Remote Options',
    ],
  });

  // Auxiliary State for dynamic inputs
  const [newRespInput, setNewRespInput] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [customBenefitInput, setCustomBenefitInput] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [createdJobId, setCreatedJobId] = useState('');

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Responsibilities Handlers
  const handleAddResponsibility = () => {
    if (!newRespInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, newRespInput.trim()],
    }));
    setNewRespInput('');
  };

  const handleRemoveResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  // Skills Handlers
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    const skill = newSkillInput.trim();
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Benefits Handlers
  const handleToggleBenefit = (benefit) => {
    setFormData((prev) => {
      const exists = prev.benefits.includes(benefit);
      return {
        ...prev,
        benefits: exists
          ? prev.benefits.filter((b) => b !== benefit)
          : [...prev.benefits, benefit],
      };
    });
  };

  const handleAddCustomBenefit = () => {
    if (!customBenefitInput.trim()) return;
    const benefit = customBenefitInput.trim();
    if (!formData.benefits.includes(benefit)) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefit],
      }));
    }
    setCustomBenefitInput('');
  };

  // Frontend Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Job location is required';
    }

    const minSal = Number(formData.salaryMin);
    const maxSal = Number(formData.salaryMax);
    if (!formData.salaryMin || isNaN(minSal) || minSal <= 0) {
      newErrors.salaryMin = 'Enter a valid minimum salary';
    }
    if (!formData.salaryMax || isNaN(maxSal) || maxSal <= 0) {
      newErrors.salaryMax = 'Enter a valid maximum salary';
    } else if (minSal && maxSal < minSal) {
      newErrors.salaryMax = 'Maximum salary must be greater than minimum salary';
    }

    const minExp = Number(formData.expMin);
    const maxExp = Number(formData.expMax);
    if (isNaN(minExp) || minExp < 0) {
      newErrors.expMin = 'Minimum experience must be 0 or higher';
    }
    if (isNaN(maxExp) || maxExp < minExp) {
      newErrors.expMax = 'Max experience must be equal or greater than min experience';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    } else if (formData.description.trim().length < 40) {
      newErrors.description = 'Job description should be at least 40 characters long';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Please add at least one required skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Save Draft Action
  const handleSaveDraft = () => {
    localStorage.setItem('jobtrack_draft_job', JSON.stringify(formData));
    showToast('Draft job saved successfully to your browser session!');
  };

  // Publish Job Action
  const handlePublishJob = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fix the highlighted errors in the form.');
      return;
    }

    const newId = `job-${Date.now()}`;
    const currSymbol = formData.currency.includes('USD')
      ? '$'
      : formData.currency.includes('INR')
      ? '₹'
      : formData.currency.includes('EUR')
      ? '€'
      : '£';

    const formattedSalary = `${currSymbol}${Number(formData.salaryMin).toLocaleString()} - ${currSymbol}${Number(formData.salaryMax).toLocaleString()} / year`;
    const expText = `${formData.expMin}-${formData.expMax} years`;

    const newJobObj = {
      id: newId,
      title: formData.title,
      company: formData.company,
      location: formData.location,
      workMode: formData.workMode,
      type: formData.type,
      experience: expText,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
      salary: formattedSalary,
      skills: formData.skills,
      postedDate: 'Just now',
      postedTimestamp: Date.now(),
      companyLogoBg: '#2563eb',
      companyInitial: formData.company.charAt(0).toUpperCase() || 'J',
      description: formData.description,
      responsibilities: formData.responsibilities.length > 0
        ? formData.responsibilities
        : ['Perform day-to-day engineering activities adhering to best practices.'],
      requiredSkills: formData.skills,
      preferredSkills: ['Agile / Scrum', 'Problem Solving', 'Communication'],
      experienceDetail: `${expText} of industry experience in software or related domain.`,
      education: "Bachelor's degree in Computer Science, Information Technology, or relevant background.",
      benefits: formData.benefits.length > 0 ? formData.benefits : DEFAULT_BENEFITS.slice(0, 3),
      resumeMatch: {
        score: '90%',
        matchingSkills: formData.skills.slice(0, 3),
        missingSkills: ['System Design'],
      },
    };

    // Save to localStorage
    const existingJobs = JSON.parse(localStorage.getItem('jobtrack_custom_jobs') || '[]');
    existingJobs.unshift(newJobObj);
    localStorage.setItem('jobtrack_custom_jobs', JSON.stringify(existingJobs));

    // Prepend to memory dataset for instant discovery
    JOBS_DATA.unshift(newJobObj);

    setCreatedJobId(newId);
    setIsPublished(true);
  };

  // Reset form to post another job
  const handlePostAnother = () => {
    setFormData({
      title: '',
      company: RECRUITER_PROFILE.company || 'TechCorp Inc.',
      location: 'Bengaluru, India',
      workMode: 'Hybrid',
      type: 'Full-time',
      salaryMin: '80000',
      salaryMax: '120000',
      currency: 'USD ($)',
      expMin: '1',
      expMax: '3',
      description: '',
      responsibilities: [],
      skills: ['React', 'JavaScript'],
      benefits: [],
    });
    setErrors({});
    setIsPublished(false);
    setCreatedJobId('');
  };

  return (
    <div className="recruiter-dashboard-layout">
      {/* Integrated Recruiter Sidebar */}
      <DashboardSidebar
        role="recruiter"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="recruiter-main-wrapper">
        {/* Integrated Recruiter Header */}
        <DashboardHeader
          title="Create New Job Posting"
          userName={RECRUITER_PROFILE.name}
          userRole={RECRUITER_PROFILE.title}
          userInitial={RECRUITER_PROFILE.avatarInitial}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="post-job-content">
          {/* Toast Alert */}
          {toastMessage && (
            <div
              style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <span>{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* SUCCESS STATE CARD */}
          {isPublished ? (
            <div className="post-success-card">
              <div className="success-check-wrap">
                <CheckCircle2 size={36} />
              </div>
              <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 800, color: 'var(--color-text-heading)' }}>
                Job Published Successfully! 🎉
              </h2>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-body)', maxWidth: 520 }}>
                Your job posting <strong>{formData.title}</strong> is now live on JobTrack. Candidates can discover, search, and submit applications immediately.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3" style={{ marginTop: 'var(--space-4)' }}>
                <button
                  type="button"
                  className="btn-nav btn-primary"
                  onClick={() => navigate(`/jobs/${createdJobId}`)}
                >
                  <Eye size={16} style={{ marginRight: 6 }} /> View Live Job Posting
                </button>
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={() => navigate('/recruiter/dashboard')}
                >
                  Go to Recruiter Dashboard
                </button>
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={handlePostAnother}
                >
                  <Plus size={16} style={{ marginRight: 4 }} /> Post Another Job
                </button>
              </div>
            </div>
          ) : (
            /* MULTI-SECTION JOB CREATION FORM */
            <form className="post-job-form" onSubmit={handlePublishJob}>
              {/* SECTION 1: BASIC INFORMATION */}
              <div className="form-section-card">
                <div className="section-head-bar">
                  <div className="section-head-num">1</div>
                  <h2 className="section-head-title flex items-center gap-2">
                    <Briefcase size={20} color="var(--color-primary)" /> Basic Information
                  </h2>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label required">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      className={`form-input ${errors.title ? 'error' : ''}`}
                      placeholder="e.g. Senior Frontend Developer"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      className={`form-input ${errors.company ? 'error' : ''}`}
                      placeholder="e.g. TechCorp Inc."
                      value={formData.company}
                      onChange={handleChange}
                    />
                    {errors.company && <span className="form-error">{errors.company}</span>}
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label required">Location</label>
                    <input
                      type="text"
                      name="location"
                      className={`form-input ${errors.location ? 'error' : ''}`}
                      placeholder="e.g. Bengaluru, India or Remote"
                      value={formData.location}
                      onChange={handleChange}
                    />
                    {errors.location && <span className="form-error">{errors.location}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Work Mode</label>
                    <select
                      name="workMode"
                      className="form-select"
                      value={formData.workMode}
                      onChange={handleChange}
                    >
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Employment Type</label>
                    <select
                      name="type"
                      className="form-select"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: COMPENSATION */}
              <div className="form-section-card">
                <div className="section-head-bar">
                  <div className="section-head-num">2</div>
                  <h2 className="section-head-title flex items-center gap-2">
                    <DollarSign size={20} color="var(--color-primary)" /> Compensation
                  </h2>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label required">Minimum Salary</label>
                    <input
                      type="number"
                      name="salaryMin"
                      className={`form-input ${errors.salaryMin ? 'error' : ''}`}
                      placeholder="80000"
                      value={formData.salaryMin}
                      onChange={handleChange}
                    />
                    {errors.salaryMin && <span className="form-error">{errors.salaryMin}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Maximum Salary</label>
                    <input
                      type="number"
                      name="salaryMax"
                      className={`form-input ${errors.salaryMax ? 'error' : ''}`}
                      placeholder="120000"
                      value={formData.salaryMax}
                      onChange={handleChange}
                    />
                    {errors.salaryMax && <span className="form-error">{errors.salaryMax}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Currency / Frequency</label>
                    <select
                      name="currency"
                      className="form-select"
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="USD ($)">USD ($ / Year)</option>
                      <option value="INR (₹)">INR (₹ / Year)</option>
                      <option value="EUR (€)">EUR (€ / Year)</option>
                      <option value="GBP (£)">GBP (£ / Year)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: EXPERIENCE */}
              <div className="form-section-card">
                <div className="section-head-bar">
                  <div className="section-head-num">3</div>
                  <h2 className="section-head-title flex items-center gap-2">
                    <Award size={20} color="var(--color-primary)" /> Experience Level
                  </h2>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Minimum Experience (Years)</label>
                    <input
                      type="number"
                      name="expMin"
                      min="0"
                      className={`form-input ${errors.expMin ? 'error' : ''}`}
                      placeholder="1"
                      value={formData.expMin}
                      onChange={handleChange}
                    />
                    {errors.expMin && <span className="form-error">{errors.expMin}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Maximum Experience (Years)</label>
                    <input
                      type="number"
                      name="expMax"
                      min="0"
                      className={`form-input ${errors.expMax ? 'error' : ''}`}
                      placeholder="3"
                      value={formData.expMax}
                      onChange={handleChange}
                    />
                    {errors.expMax && <span className="form-error">{errors.expMax}</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 4: JOB DESCRIPTION */}
              <div className="form-section-card">
                <div className="section-head-bar">
                  <div className="section-head-num">4</div>
                  <h2 className="section-head-title flex items-center gap-2">
                    <FileText size={20} color="var(--color-primary)" /> Job Description
                  </h2>
                </div>

                <div className="form-group">
                  <label className="form-label required">Detailed Role Overview</label>
                  <textarea
                    name="description"
                    className={`form-textarea ${errors.description ? 'error' : ''}`}
                    rows={6}
                    placeholder="Provide a comprehensive summary of the role, team environment, key goals, and expectations..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && <span className="form-error">{errors.description}</span>}
                </div>
              </div>

              {/* SECTION 5: RESPONSIBILITIES */}
              <div className="form-section-card">
                <div className="section-head-bar">
                  <div className="section-head-num">5</div>
                  <h2 className="section-head-title flex items-center gap-2">
                    <ListChecks size={20} color="var(--color-primary)" /> Key Responsibilities
                  </h2>
                </div>

                <div className="form-group">
                  <label className="form-label">Add Key Responsibilities (Dynamic List)</label>
                  <div className="dynamic-add-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Lead daily standups and sprint planning sessions..."
                      value={newRespInput}
                      onChange={(e) => setNewRespInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddResponsibility();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-nav btn-outline"
                      onClick={handleAddResponsibility}
                      style={{ shrink: 0, whiteSpace: 'nowrap' }}
                    >
                      <Plus size={16} style={{ marginRight: 4 }} /> Add Line
                    </button>
                  </div>
                </div>

                {formData.responsibilities.length > 0 && (
                  <div className="dynamic-items-list">
                    {formData.responsibilities.map((resp, index) => (
                      <div key={index} className="dynamic-item-pill">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 size={16} color="var(--color-primary)" />
                          {resp}
                        </span>
                        <button
                          type="button"
                          className="btn-tag-remove"
                          onClick={() => handleRemoveResponsibility(index)}
                          title="Remove item"
                        >
                          <Trash2 size={15} color="#ef4444" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 6: REQUIRED SKILLS */}
              <div className="form-section-card">
                <div className="section-head-bar">
                  <div className="section-head-num">6</div>
                  <h2 className="section-head-title flex items-center gap-2">
                    <Code2 size={20} color="var(--color-primary)" /> Required Skills
                  </h2>
                </div>

                <div className="form-group">
                  <label className="form-label required">Add Required Tech Stack & Skills (Tags)</label>
                  <div className="dynamic-add-row">
                    <input
                      type="text"
                      className={`form-input ${errors.skills ? 'error' : ''}`}
                      placeholder="e.g. React, Python, Docker, AWS..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-nav btn-outline"
                      onClick={handleAddSkill}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Plus size={16} style={{ marginRight: 4 }} /> Add Skill
                    </button>
                  </div>
                  {errors.skills && <span className="form-error">{errors.skills}</span>}
                </div>

                {/* Skills Tag Pills Display */}
                {formData.skills.length > 0 && (
                  <div className="tags-wrap">
                    {formData.skills.map((skill) => (
                      <span key={skill} className="removable-tag">
                        {skill}
                        <button
                          type="button"
                          className="btn-tag-remove"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 7: BENEFITS */}
              <div className="form-section-card">
                <div className="section-head-bar">
                  <div className="section-head-num">7</div>
                  <h2 className="section-head-title flex items-center gap-2">
                    <Gift size={20} color="var(--color-primary)" /> Employee Benefits & Perks
                  </h2>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Standard Company Perks</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.65rem' }}>
                    {DEFAULT_BENEFITS.map((benefit) => {
                      const isChecked = formData.benefits.includes(benefit);
                      return (
                        <label
                          key={benefit}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            backgroundColor: isChecked ? 'var(--color-primary-light)' : '#ffffff',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleBenefit(benefit)}
                            style={{ accentColor: 'var(--color-primary)', width: 16, height: 16 }}
                          />
                          <span>{benefit}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: 'var(--space-2)' }}>
                  <label className="form-label">Add Custom Perk / Benefit</label>
                  <div className="dynamic-add-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Annual International Retreat, Childcare Reimbursement..."
                      value={customBenefitInput}
                      onChange={(e) => setCustomBenefitInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomBenefit();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-nav btn-outline"
                      onClick={handleAddCustomBenefit}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Plus size={16} style={{ marginRight: 4 }} /> Add Benefit
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS FOOTER BAR */}
              <div className="form-actions-footer">
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={handleSaveDraft}
                >
                  <Save size={16} style={{ marginRight: 6 }} /> Save Draft
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="btn-nav btn-outline"
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    <Eye size={16} style={{ marginRight: 6 }} /> Preview Job Card
                  </button>

                  <button
                    type="submit"
                    className="btn-nav btn-primary"
                    style={{ padding: '0.65rem 1.75rem', fontSize: '0.95rem' }}
                  >
                    <Send size={16} style={{ marginRight: 6 }} /> Publish Job
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* PREVIEW MODAL */}
          {isPreviewOpen && (
            <div className="app-modal-overlay" onClick={() => setIsPreviewOpen(false)}>
              <div
                className="app-modal-card"
                style={{ maxWidth: 680 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="app-modal-header">
                  <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                    Job Posting Preview
                  </h3>
                  <button
                    type="button"
                    className="app-modal-close"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {/* Header Badge */}
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        backgroundColor: 'var(--color-primary)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                      }}
                    >
                      {formData.company ? formData.company.charAt(0).toUpperCase() : 'J'}
                    </div>
                    <div>
                      <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, color: 'var(--color-text-heading)' }}>
                        {formData.title || 'Untitled Job Position'}
                      </h2>
                      <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {formData.company || 'Company Name'}
                      </p>
                    </div>
                  </div>

                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-3" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {formData.location || 'Location'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Briefcase size={14} /> {formData.workMode} ({formData.type})</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {formData.salaryMin ? `${formData.currency.split(' ')[0]}${Number(formData.salaryMin).toLocaleString()} - ${formData.currency.split(' ')[0]}${Number(formData.salaryMax).toLocaleString()} / yr` : 'Salary Not Disclosed'}
                    </span>
                  </div>

                  {/* Description Preview */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 4 }}>
                      Description
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
                      {formData.description || 'No description provided yet.'}
                    </p>
                  </div>

                  {/* Skills Preview */}
                  {formData.skills.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 6 }}>
                        Required Skills
                      </h4>
                      <div className="skills-pills-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {formData.skills.map((s) => (
                          <span key={s} className="removable-tag" style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities Preview */}
                  {formData.responsibilities.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 4 }}>
                        Key Responsibilities
                      </h4>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', color: 'var(--color-text-body)' }}>
                        {formData.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2" style={{ marginTop: 'var(--space-4)' }}>
                  <button
                    type="button"
                    className="btn-nav btn-outline"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PostJobPage;
