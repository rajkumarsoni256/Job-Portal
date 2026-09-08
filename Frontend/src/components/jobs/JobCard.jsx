import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bookmark, ChevronRight } from 'lucide-react';
import './JobCard.css';

/**
 * Reusable JobCard Component
 * Displays job details, badges, skills, save toggle, and details view action
 */
function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  const {
    id = '1',
    title = 'Software Engineer',
    company = 'TechCorp',
    location = 'Remote / New York',
    workMode = 'Remote',
    type = 'Full-time',
    experience = '1-2 years',
    salary = '$90,000 - $120,000',
    skills = [],
    postedDate = 'Recently',
    companyLogoBg = '#2563eb',
    companyInitial = 'T',
  } = job || {};

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div className="job-card-brand-group">
          <div className="job-card-logo-badge" style={{ backgroundColor: companyLogoBg }}>
            {companyInitial}
          </div>
          <div className="job-card-main-info">
            <Link to={`/jobs/${id}`} className="job-card-title">
              {title}
            </Link>
            <span className="job-card-company">{company}</span>
          </div>
        </div>

        <button
          type="button"
          className={`job-card-save-btn ${isSaved ? 'saved' : ''}`}
          onClick={toggleSave}
          title={isSaved ? 'Saved to bookmarks' : 'Save job'}
          aria-label={isSaved ? 'Remove bookmark' : 'Save job'}
        >
          <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="job-card-meta">
        <span className="meta-pill">
          <MapPin size={14} /> {location}
        </span>
        <span className="meta-pill">
          <DollarSign size={14} /> {salary}
        </span>
      </div>

      <div className="job-card-badges-line">
        <span className="badge-type">{type}</span>
        <span className="badge-mode">{workMode}</span>
        <span className="badge-exp">{experience}</span>
      </div>

      {skills && skills.length > 0 && (
        <div className="job-card-skills">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="job-card-footer">
        <span className="posted-date">
          <Clock size={13} /> {postedDate}
        </span>
        <Link to={`/jobs/${id}`} className="btn-nav btn-outline" style={{ padding: '0.35rem 0.85rem' }}>
          View Job <ChevronRight size={14} style={{ marginLeft: 2 }} />
        </Link>
      </div>
    </div>
  );
}

export default JobCard;
