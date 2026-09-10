import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Calendar,
  Save,
  X,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Edit3,
  Link2,
} from 'lucide-react';
import { Container, Button, Card, Input, Badge } from '../../components/common';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import './CompanyProfilePage.css';

/**
 * Recruiter Company Profile Management Page Component
 * Module — Complete Recruiter Suite company profile manager & live candidate preview card
 */
function CompanyProfilePage() {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');

  // Initial Mock Company State
  const [companyForm, setCompanyForm] = useState({
    name: 'TechCorp Global Solutions',
    website: 'https://techcorpglobal.com',
    industry: 'Information Technology & Software Services',
    size: '500-1000 employees',
    foundedYear: '2015',
    location: 'Bengaluru, Karnataka, India',
    description:
      'TechCorp Global is a premier technology and engineering firm building high-performance cloud platforms, AI insights, and scalable digital web solutions for Fortune 500 enterprises.',
    linkedin: 'https://linkedin.com/company/techcorp-global',
    logoInitial: 'T',
    logoBg: '#2563eb',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMsg('Company profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleCancel = () => {
    navigate('/recruiter/dashboard');
  };

  return (
    <div className="dashboard-layout">
      {/* Recruiter Sidebar */}
      <DashboardSidebar role="recruiter" />

      <main className="dashboard-main-content">
        <DashboardHeader
          title="Company Profile"
          subtitle="Manage your company details, brand info, and candidate preview profile"
        />

        <Container size="xl" className="company-page-container">
          {successMsg && (
            <div className="company-success-banner">
              <CheckCircle2 size={18} className="text-success" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. COMPANY HEADER SUMMARY CARD */}
          <Card variant="default" padding="lg" className="company-header-card">
            <div className="company-header-main">
              <div className="company-logo-avatar" style={{ backgroundColor: companyForm.logoBg }}>
                {companyForm.logoInitial}
              </div>
              <div className="company-header-info">
                <div className="flex items-center gap-2">
                  <h1 className="header-company-name">{companyForm.name}</h1>
                  <Badge variant="success">Verified Employer</Badge>
                </div>
                <p className="header-company-sub">
                  <Building2 size={14} /> {companyForm.industry} • <MapPin size={14} /> {companyForm.location}
                </p>
              </div>
            </div>
          </Card>

          <div className="company-split-grid">
            {/* LEFT: FORM EDITING COLUMN */}
            <div className="company-form-col">
              <form onSubmit={handleSave} className="company-form-wrapper">
                {/* 2. COMPANY INFORMATION FORM */}
                <Card variant="default" padding="lg" className="form-section-card">
                  <Card.Header
                    title={
                      <span className="section-title-with-icon">
                        <Building2 size={20} className="text-primary" /> Company Details
                      </span>
                    }
                    subtitle="Basic business information displayed on job listings"
                  />
                  <Card.Body className="form-card-body">
                    <div className="form-row-2">
                      <Input
                        label="Company Name"
                        name="name"
                        value={companyForm.name}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Official Website"
                        name="website"
                        type="url"
                        value={companyForm.website}
                        onChange={handleInputChange}
                        iconLeft={<Globe size={16} className="text-muted" />}
                      />
                    </div>

                    <div className="form-row-2">
                      <Input
                        label="Industry"
                        name="industry"
                        value={companyForm.industry}
                        onChange={handleInputChange}
                      />
                      <div className="form-group">
                        <label className="input-label">Company Size</label>
                        <select
                          name="size"
                          value={companyForm.size}
                          onChange={handleInputChange}
                          className="custom-select"
                        >
                          <option value="1-10 employees">1-10 employees (Startup)</option>
                          <option value="11-50 employees">11-50 employees</option>
                          <option value="51-200 employees">51-200 employees</option>
                          <option value="201-500 employees">201-500 employees</option>
                          <option value="500-1000 employees">500-1000 employees</option>
                          <option value="1000+ employees">1000+ employees (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row-2">
                      <Input
                        label="Founded Year"
                        name="foundedYear"
                        value={companyForm.foundedYear}
                        onChange={handleInputChange}
                        iconLeft={<Calendar size={16} className="text-muted" />}
                      />
                      <Input
                        label="Headquarters Location"
                        name="location"
                        value={companyForm.location}
                        onChange={handleInputChange}
                        iconLeft={<MapPin size={16} className="text-muted" />}
                      />
                    </div>
                  </Card.Body>
                </Card>

                {/* 3. ABOUT COMPANY */}
                <Card variant="default" padding="lg" className="form-section-card">
                  <Card.Header
                    title={
                      <span className="section-title-with-icon">
                        <Edit3 size={20} className="text-info" /> About Company
                      </span>
                    }
                    subtitle="Describe your company culture, mission, and work environment"
                  />
                  <Card.Body>
                    <div className="form-group">
                      <label className="input-label">Company Overview / Description</label>
                      <textarea
                        name="description"
                        rows={5}
                        className="custom-textarea"
                        value={companyForm.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Card.Body>
                </Card>

                {/* 4. SOCIAL LINKS */}
                <Card variant="default" padding="lg" className="form-section-card">
                  <Card.Header
                    title={
                      <span className="section-title-with-icon">
                        <Globe size={20} className="text-warning" /> Social Links & Presence
                      </span>
                    }
                    subtitle="Connect your professional social channels"
                  />
                  <Card.Body className="form-card-body">
                    <Input
                      label="LinkedIn Page URL"
                      name="linkedin"
                      type="url"
                      value={companyForm.linkedin}
                      onChange={handleInputChange}
                      iconLeft={<Link2 size={16} className="text-primary" />}
                    />
                  </Card.Body>
                </Card>

                {/* 6. ACTIONS BAR */}
                <div className="company-actions-bar">
                  <Button type="button" variant="outline" onClick={handleCancel} iconLeft={<X size={16} />}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" iconLeft={<Save size={16} />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>

            {/* RIGHT: LIVE CANDIDATE PREVIEW COLUMN */}
            <div className="company-preview-col">
              <div className="sticky-preview-wrapper">
                <h3 className="preview-heading">Candidate View Preview</h3>
                <p className="preview-sub">How candidates see your company profile on JobDekho</p>

                <Card variant="default" padding="lg" className="candidate-preview-card">
                  <div className="preview-card-header">
                    <div className="preview-avatar" style={{ backgroundColor: companyForm.logoBg }}>
                      {companyForm.logoInitial}
                    </div>
                    <div>
                      <h3 className="preview-company-title">{companyForm.name}</h3>
                      <p className="preview-company-ind">{companyForm.industry}</p>
                    </div>
                  </div>

                  <div className="preview-meta-grid">
                    <div className="meta-box">
                      <Users size={14} className="text-primary" />
                      <span>{companyForm.size}</span>
                    </div>
                    <div className="meta-box">
                      <MapPin size={14} className="text-primary" />
                      <span>{companyForm.location}</span>
                    </div>
                    <div className="meta-box">
                      <Calendar size={14} className="text-primary" />
                      <span>Est. {companyForm.foundedYear}</span>
                    </div>
                  </div>

                  <div className="preview-desc-block">
                    <h4 className="block-lbl">About Us</h4>
                    <p className="desc-text">{companyForm.description}</p>
                  </div>

                  <div className="preview-links-block">
                    {companyForm.website && (
                      <a href={companyForm.website} target="_blank" rel="noreferrer" className="preview-link">
                        <Globe size={14} /> Website <ExternalLink size={12} />
                      </a>
                    )}
                    {companyForm.linkedin && (
                      <a href={companyForm.linkedin} target="_blank" rel="noreferrer" className="preview-link">
                        <Link2 size={14} /> LinkedIn <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <div className="preview-footer-badge">
                    <Sparkles size={14} className="text-warning" /> Verified JobDekho Employer Workspace
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default CompanyProfilePage;
