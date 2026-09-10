import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bookmark,
  Search,
  Filter,
  Trash2,
  Briefcase,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Container, Button, Card, Input, Badge, EmptyState } from '../../components/common';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import JobCard from '../../components/jobs/JobCard';
import './SavedJobsPage.css';

/**
 * Saved Jobs Page Component
 * Module — Job Seeker saved/bookmarked jobs page with search, filters & EmptyState fallback
 */
function SavedJobsPage() {
  const navigate = useNavigate();

  // Initial Mock Saved Jobs
  const [savedJobs, setSavedJobs] = useState([
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp Solutions',
      location: 'Bengaluru, India',
      workMode: 'Hybrid',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹18,000,000 - ₹24,000,000 / yr',
      skills: ['React', 'TypeScript', 'Redux', 'Tailwind'],
      postedDate: 'Posted 2 days ago',
      companyLogoBg: '#2563eb',
      companyInitial: 'T',
    },
    {
      id: '2',
      title: 'Full Stack Engineer (Node.js & React)',
      company: 'Innovate Labs',
      location: 'Remote',
      workMode: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹15,000,000 - ₹20,000,000 / yr',
      skills: ['Node.js', 'Express', 'React', 'PostgreSQL'],
      postedDate: 'Posted 1 day ago',
      companyLogoBg: '#059669',
      companyInitial: 'I',
    },
    {
      id: '3',
      title: 'UI/UX Product Designer',
      company: 'DesignWorks Studio',
      location: 'Mumbai, India',
      workMode: 'On-site',
      type: 'Full-time',
      experience: '2+ years',
      salary: '₹12,000,000 - ₹16,000,000 / yr',
      skills: ['Figma', 'UI/UX', 'User Research', 'Prototyping'],
      postedDate: 'Posted 3 days ago',
      companyLogoBg: '#d97706',
      companyInitial: 'D',
    },
    {
      id: '4',
      title: 'Backend Microservices Engineer',
      company: 'CloudScale Inc.',
      location: 'Remote',
      workMode: 'Remote',
      type: 'Contract',
      experience: '4+ years',
      salary: '₹22,000,000 - ₹28,000,000 / yr',
      skills: ['Python', 'Django', 'Docker', 'AWS'],
      postedDate: 'Posted 4 days ago',
      companyLogoBg: '#7c3aed',
      companyInitial: 'C',
    },
  ]);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'salary-high' | 'company'

  const handleRemoveJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  // Filter & Sort Logic
  const filteredJobs = savedJobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || job.type === selectedType || job.workMode === selectedType;
      const matchesLocation =
        selectedLocation === 'All' ||
        (selectedLocation === 'Remote' && job.workMode === 'Remote') ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesType && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      if (sortBy === 'salary-high') return b.id - a.id; // simulation
      return 0; // default recent
    });

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <DashboardSidebar role="seeker" />

      <main className="dashboard-main-content">
        <DashboardHeader title="Saved Jobs" subtitle="Manage your bookmarked opportunities and apply anytime" />

        <Container size="xl" className="saved-jobs-container">
          {/* TOP TOOLBAR: SEARCH & FILTERS */}
          <div className="saved-toolbar-card">
            <div className="toolbar-top-row">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon text-muted" />
                <input
                  type="text"
                  placeholder="Search saved jobs or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="saved-search-input"
                />
              </div>

              <div className="saved-count-badge">
                <Bookmark size={16} className="text-primary" />
                <span>{savedJobs.length} Saved Jobs</span>
              </div>
            </div>

            <div className="toolbar-filters-row">
              <div className="filter-group">
                <label className="filter-lbl">Job Type:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="select-dropdown"
                >
                  <option value="All">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote Only</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-lbl">Location:</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="select-dropdown"
                >
                  <option value="All">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-lbl">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select-dropdown"
                >
                  <option value="recent">Recently Saved</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="company">Company Name A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* SAVED JOBS LIST GRID OR EMPTY STATE */}
          {filteredJobs.length === 0 ? (
            <div className="saved-empty-container">
              <EmptyState
                title="No saved jobs yet."
                description={
                  searchTerm || selectedType !== 'All' || selectedLocation !== 'All'
                    ? 'No saved jobs match your search filters.'
                    : 'Bookmark interesting job opportunities to review and apply to them later.'
                }
                action={
                  <Button
                    variant="primary"
                    iconLeft={<Briefcase size={18} />}
                    onClick={() => navigate('/jobs')}
                  >
                    Explore Jobs
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="saved-jobs-grid">
              {filteredJobs.map((job) => (
                <div key={job.id} className="saved-job-card-wrapper">
                  <JobCard job={job} />
                  <button
                    type="button"
                    className="remove-saved-btn"
                    onClick={() => handleRemoveJob(job.id)}
                    title="Remove from saved jobs"
                  >
                    <Trash2 size={16} /> Remove from Saved
                  </button>
                </div>
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}

export default SavedJobsPage;
