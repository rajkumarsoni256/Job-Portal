import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, X, SearchX, SlidersHorizontal } from 'lucide-react';
import { JOBS_DATA } from '../../data/jobs';
import JobCard from '../../components/jobs/JobCard';
import JobFilter from '../../components/jobs/JobFilter';
import './JobListingsPage.css';

/**
 * JobListingsPage Component
 * Main job discovery page with search bar, sidebar filters, sorting, and responsive drawer
 */
function JobListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search input state
  const urlSearch = searchParams.get('search') || '';
  const urlLocation = searchParams.get('location') || '';
  const categoryParam = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [locationQuery, setLocationQuery] = useState(urlLocation);

  // Filter state
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync when URL params change
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  const [prevUrlLocation, setPrevUrlLocation] = useState(urlLocation);

  if (prevUrlSearch !== urlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchQuery(urlSearch);
  }
  if (prevUrlLocation !== urlLocation) {
    setPrevUrlLocation(urlLocation);
    setLocationQuery(urlLocation);
  }

  // Filter toggle handlers
  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleModeToggle = (mode) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleExpToggle = (exp) => {
    setSelectedExperiences((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedModes([]);
    setSelectedExperiences([]);
    setMinSalary(0);
    setSelectedSkills([]);
    setSearchQuery('');
    setLocationQuery('');
    setSearchParams({});
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (locationQuery.trim()) params.append('location', locationQuery.trim());
    setSearchParams(params);
  };

  // Active filter count
  const activeFilterCount =
    selectedTypes.length +
    selectedModes.length +
    selectedExperiences.length +
    (minSalary > 0 ? 1 : 0) +
    selectedSkills.length;

  // Filter & Sort Logic
  const filteredAndSortedJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = job.title.toLowerCase().includes(query);
        const companyMatch = job.company.toLowerCase().includes(query);
        const skillsMatch = job.skills.some((s) => s.toLowerCase().includes(query));
        const descMatch = job.description.toLowerCase().includes(query);
        if (!titleMatch && !companyMatch && !skillsMatch && !descMatch) return false;
      }

      // Location match
      if (locationQuery.trim()) {
        const locQuery = locationQuery.toLowerCase().trim();
        const locMatch = job.location.toLowerCase().includes(locQuery);
        const modeMatch = job.workMode.toLowerCase().includes(locQuery);
        if (!locMatch && !modeMatch) return false;
      }

      // Category match from homepage link
      if (categoryParam.trim()) {
        const catQuery = categoryParam.toLowerCase().trim();
        const titleMatch = job.title.toLowerCase().includes(catQuery);
        const skillsMatch = job.skills.some((s) => s.toLowerCase().includes(catQuery));
        if (!titleMatch && !skillsMatch) return false;
      }

      // Job Types
      if (selectedTypes.length > 0 && !selectedTypes.includes(job.type)) {
        return false;
      }

      // Work Modes
      if (selectedModes.length > 0 && !selectedModes.includes(job.workMode)) {
        return false;
      }

      // Experience Level
      if (selectedExperiences.length > 0 && !selectedExperiences.includes(job.experience)) {
        return false;
      }

      // Minimum Salary
      if (minSalary > 0 && job.salaryMax < minSalary) {
        return false;
      }

      // Skills
      if (
        selectedSkills.length > 0 &&
        !selectedSkills.some((skill) => job.skills.includes(skill))
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary-desc') return b.salaryMax - a.salaryMax;
      if (sortBy === 'salary-asc') return a.salaryMin - b.salaryMin;
      if (sortBy === 'company-asc') return a.company.localeCompare(b.company);
      // Default: recent
      return b.postedTimestamp - a.postedTimestamp;
    });
  }, [
    searchQuery,
    locationQuery,
    categoryParam,
    selectedTypes,
    selectedModes,
    selectedExperiences,
    minSalary,
    selectedSkills,
    sortBy,
  ]);

  return (
    <div className="jobs-page">
      {/* Top Header Banner */}
      <section className="jobs-page-header">
        <div className="jobs-header-container">
          <h1 className="jobs-page-title">Find Your Next Opportunity</h1>
          <p className="jobs-page-desc">
            Browse thousands of job openings across top engineering, product, data, and design teams.
          </p>

          {/* Large Search Bar */}
          <div className="jobs-search-box">
            <form className="jobs-search-form" onSubmit={handleSearchSubmit}>
              <div className="search-input-group">
                <Search size={18} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Job title, keyword, skill, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="search-input-group">
                <MapPin size={18} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="City, state, or remote..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-nav btn-primary search-btn">
                Search Jobs
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Body Section */}
      <section className="jobs-body-container">
        {/* Desktop Sidebar Filters */}
        <div className="desktop-filter-sidebar">
          <JobFilter
            selectedTypes={selectedTypes}
            selectedModes={selectedModes}
            selectedExperiences={selectedExperiences}
            minSalary={minSalary}
            selectedSkills={selectedSkills}
            onTypeToggle={handleTypeToggle}
            onModeToggle={handleModeToggle}
            onExpToggle={handleExpToggle}
            onSalaryChange={setMinSalary}
            onSkillToggle={handleSkillToggle}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Right Jobs List Area */}
        <div className="jobs-results-col">
          {/* Results Bar Header */}
          <div className="results-bar">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="mobile-filter-trigger"
                onClick={() => setIsMobileDrawerOpen(true)}
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      borderRadius: '9999px',
                      padding: '0.05rem 0.4rem',
                      fontSize: '0.7rem',
                    }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <span className="results-count">
                Showing {filteredAndSortedJobs.length}{' '}
                {filteredAndSortedJobs.length === 1 ? 'job' : 'jobs'}
              </span>
            </div>

            <div className="results-sort-group">
              <span className="sort-label">Sort by:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="salary-desc">Salary: High to Low</option>
                <option value="salary-asc">Salary: Low to High</option>
                <option value="company-asc">Company: A to Z</option>
              </select>
            </div>
          </div>

          {/* Job List or Empty State */}
          {filteredAndSortedJobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredAndSortedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="jobs-empty-state">
              <div className="empty-icon-wrap">
                <SearchX size={28} />
              </div>
              <h3 className="empty-title">No jobs found</h3>
              <p className="empty-desc">
                We couldn't find any job openings matching your search criteria. Try adjusting your search query or clearing your filters.
              </p>
              <button type="button" className="btn-nav btn-outline" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Filter Drawer Overlay */}
      <div
        className={`mobile-filter-modal-overlay ${isMobileDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsMobileDrawerOpen(false)}
      >
        <div
          className="mobile-filter-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-drawer-header">
            <h3 className="mobile-drawer-title">Filter Jobs</h3>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={() => setIsMobileDrawerOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-drawer-content">
            <JobFilter
              selectedTypes={selectedTypes}
              selectedModes={selectedModes}
              selectedExperiences={selectedExperiences}
              minSalary={minSalary}
              selectedSkills={selectedSkills}
              onTypeToggle={handleTypeToggle}
              onModeToggle={handleModeToggle}
              onExpToggle={handleExpToggle}
              onSalaryChange={setMinSalary}
              onSkillToggle={handleSkillToggle}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="btn-nav btn-primary full-width"
              onClick={() => setIsMobileDrawerOpen(false)}
            >
              Apply Filters ({filteredAndSortedJobs.length} Results)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListingsPage;
