import React from 'react';
import { Filter, Check } from 'lucide-react';
import './JobFilter.css';

/**
 * Reusable JobFilter Component
 * Left sidebar filter panel for jobs page
 */
function JobFilter({
  selectedTypes = [],
  selectedModes = [],
  selectedExperiences = [],
  minSalary = 0,
  selectedSkills = [],
  onTypeToggle,
  onModeToggle,
  onExpToggle,
  onSalaryChange,
  onSkillToggle,
  onResetFilters,
  activeFilterCount = 0,
}) {
  const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'];
  const WORK_MODES = ['On-site', 'Hybrid', 'Remote'];
  const EXPERIENCE_LEVELS = ['Fresher', '1-2 years', '3-5 years', '5+ years'];
  const SKILL_OPTIONS = ['React', 'Node.js', 'Python', 'TypeScript', 'Java', 'SQL', 'AWS', 'Figma', 'Docker', 'System Design', 'Go', 'Kubernetes'];

  return (
    <aside className="filter-sidebar">
      {/* Header */}
      <div className="filter-header">
        <div className="filter-title-group">
          <Filter size={18} color="var(--color-primary)" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                padding: '0.1rem 0.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </div>

        <button type="button" className="btn-clear-filters" onClick={onResetFilters}>
          Clear All
        </button>
      </div>

      {/* 1. Job Type */}
      <div className="filter-section">
        <h4 className="filter-section-title">Job Type</h4>
        <div className="filter-options-list">
          {JOB_TYPES.map((type) => (
            <label key={type} className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => onTypeToggle(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Work Mode */}
      <div className="filter-section">
        <h4 className="filter-section-title">Work Mode</h4>
        <div className="filter-options-list">
          {WORK_MODES.map((mode) => (
            <label key={mode} className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedModes.includes(mode)}
                onChange={() => onModeToggle(mode)}
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Experience Level */}
      <div className="filter-section">
        <h4 className="filter-section-title">Experience Level</h4>
        <div className="filter-options-list">
          {EXPERIENCE_LEVELS.map((exp) => (
            <label key={exp} className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedExperiences.includes(exp)}
                onChange={() => onExpToggle(exp)}
              />
              <span>{exp}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Minimum Salary */}
      <div className="filter-section">
        <h4 className="filter-section-title">Min Salary</h4>
        <select
          className="salary-select"
          value={minSalary}
          onChange={(e) => onSalaryChange(Number(e.target.value))}
        >
          <option value={0}>Any Salary</option>
          <option value={60000}>$60,000+ / yr</option>
          <option value={90000}>$90,000+ / yr</option>
          <option value={120000}>$120,000+ / yr</option>
          <option value={150000}>$150,000+ / yr</option>
        </select>
      </div>

      {/* 5. Skills */}
      <div className="filter-section">
        <h4 className="filter-section-title">Skills</h4>
        <div className="skills-grid">
          {SKILL_OPTIONS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                className={`skill-checkbox-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => onSkillToggle(skill)}
              >
                {isSelected && <Check size={12} />}
                <span>{skill}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default JobFilter;
