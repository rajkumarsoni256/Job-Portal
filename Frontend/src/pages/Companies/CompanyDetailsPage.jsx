import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Users,
  Globe,
  Star,
  Briefcase,
  CheckCircle2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { COMPANIES_DATA } from '../../data/companies';
import { JOBS_DATA } from '../../data/jobs';
import JobCard from '../../components/jobs/JobCard';
import './CompaniesPage.css';

function CompanyDetailsPage() {
  const { id } = useParams();
  const company = COMPANIES_DATA.find((c) => c.id === id) || COMPANIES_DATA[0];

  // Find matching open jobs for this company in JOBS_DATA
  const companyJobs = JOBS_DATA.filter((j) =>
    j.company.toLowerCase().includes(company.name.toLowerCase())
  );

  return (
    <div className="companies-page">
      <div className="company-details-container">
        {/* Back Link */}
        <Link to="/companies" className="back-link">
          <ArrowLeft size={16} /> Back to All Companies
        </Link>

        {/* 1. COMPANY HEADER CARD */}
        <div className="company-details-header">
          <div className="flex items-center gap-4">
            <div
              className="company-logo-avatar"
              style={{ backgroundColor: company.logoBg, width: 68, height: 68, fontSize: '1.75rem' }}
            >
              {company.initial}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 style={{ fontSize: 'var(--font-xl)', fontWeight: 800, color: 'var(--color-text-heading)' }}>
                  {company.name}
                </h1>
                <span className="open-jobs-badge">
                  {company.openJobsCount} Open Jobs
                </span>
              </div>

              <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--color-primary)' }}>
                {company.industry}
              </div>

              <div className="flex flex-wrap items-center gap-3" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                <span className="flex items-center gap-1"><MapPin size={14} /> {company.location}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Users size={14} /> {company.size}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> Founded {company.founded}</span>
              </div>
            </div>
          </div>

          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="btn-nav btn-primary"
          >
            Visit Careers Site <ExternalLink size={15} style={{ marginLeft: 6 }} />
          </a>
        </div>

        {/* 2. COMPANY STATISTICS BAR */}
        <div className="company-stats-bar">
          <div className="stat-box">
            <span className="stat-box-lbl flex items-center gap-1">
              <Briefcase size={14} color="var(--color-primary)" /> Open Positions
            </span>
            <span className="stat-box-val">{company.openJobsCount} Roles</span>
          </div>

          <div className="stat-box">
            <span className="stat-box-lbl flex items-center gap-1">
              <Star size={14} color="#eab308" /> Employee Rating
            </span>
            <span className="stat-box-val" style={{ color: '#eab308' }}>
              {company.rating} ★
            </span>
          </div>

          <div className="stat-box">
            <span className="stat-box-lbl flex items-center gap-1">
              <Users size={14} color="#16a34a" /> Total Workforce
            </span>
            <span className="stat-box-val">{company.size}</span>
          </div>

          <div className="stat-box">
            <span className="stat-box-lbl flex items-center gap-1">
              <Globe size={14} color="#635bff" /> Global Offices
            </span>
            <span className="stat-box-val">{company.offices?.length || 4} Tech Hubs</span>
          </div>
        </div>

        {/* 3. ABOUT COMPANY SECTION */}
        <div className="profile-section-card" style={{ backgroundColor: '#ffffff' }}>
          <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '0.5rem' }}>
            About {company.name}
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
            {company.about}
          </p>

          {/* Office Locations Pills */}
          {company.offices && (
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '0.5rem' }}>
                Major Office Locations:
              </h4>
              <div className="flex flex-wrap gap-2">
                {company.offices.map((off) => (
                  <span
                    key={off}
                    style={{
                      fontSize: '0.78rem',
                      backgroundColor: 'var(--color-bg-app)',
                      border: '1px solid var(--color-border)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      color: 'var(--color-text-main)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <MapPin size={12} color="var(--color-primary)" /> {off}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. PERKS & CULTURE */}
        {company.perks && (
          <div className="profile-section-card" style={{ backgroundColor: '#ffffff' }}>
            <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '0.5rem' }}>
              Employee Benefits & Perks
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {company.perks.map((perk, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-body)',
                    backgroundColor: 'var(--color-bg-app)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. AVAILABLE OPEN JOBS SECTION */}
        <div style={{ marginTop: 'var(--space-4)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 800, color: 'var(--color-text-heading)' }}>
                Open Positions at {company.name}
              </h2>
              <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)' }}>
                Explore active engineering, data, design, and product roles
              </p>
            </div>
          </div>

          {companyJobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {companyJobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Render high-match sample jobs tailored for this company if no exact string match */}
              {JOBS_DATA.slice(0, 3).map((j) => (
                <JobCard
                  key={j.id}
                  job={{
                    ...j,
                    company: company.name,
                    companyInitial: company.initial,
                    companyLogoBg: company.logoBg,
                    location: company.location,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailsPage;
