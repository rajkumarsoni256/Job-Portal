import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Eye,
  Edit,
  Users,
  XCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Filter,
} from 'lucide-react';
import { Container, Button, Card, Badge } from '../../components/common';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import './ManageJobsPage.css';

/**
 * Recruiter Job Management Page Component
 * Module — Manage posted jobs, filter by status, and close openings
 */
function ManageJobsPage() {
  const navigate = useNavigate();

  // Mock Jobs List
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: 'Senior React Developer',
      location: 'Bengaluru, India',
      type: 'Full-time',
      applicantsCount: 48,
      status: 'Active',
      postedDate: 'Sep 2, 2026',
    },
    {
      id: '2',
      title: 'Full Stack Engineer (Node.js)',
      location: 'Remote',
      type: 'Full-time',
      applicantsCount: 64,
      status: 'Active',
      postedDate: 'Sep 4, 2026',
    },
    {
      id: '3',
      title: 'UI/UX Product Designer',
      location: 'Mumbai, India',
      type: 'Full-time',
      applicantsCount: 22,
      status: 'Draft',
      postedDate: 'Sep 8, 2026',
    },
    {
      id: '4',
      title: 'DevOps & Cloud Architect',
      location: 'Remote',
      type: 'Contract',
      applicantsCount: 14,
      status: 'Closed',
      postedDate: 'Aug 15, 2026',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Active' | 'Draft' | 'Closed'
  const [notice, setNotice] = useState('');

  // Counts
  const totalJobs = jobs.length;
  const activeCount = jobs.filter((j) => j.status === 'Active').length;
  const draftCount = jobs.filter((j) => j.status === 'Draft').length;
  const closedCount = jobs.filter((j) => j.status === 'Closed').length;

  const handleCloseJob = (jobId) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Closed' } : j))
    );
    setNotice('Job listing marked as Closed.');
    setTimeout(() => setNotice(''), 4000);
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === 'All') return true;
    return job.status === activeFilter;
  });

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role="recruiter" />

      <main className="dashboard-main-content">
        <DashboardHeader
          title="Manage Jobs"
          subtitle="View, edit, filter, and track all your active and past job openings"
        />

        <Container size="xl" className="manage-jobs-container">
          {notice && (
            <div className="jobs-notice-banner">
              <CheckCircle2 size={18} className="text-success" />
              <span>{notice}</span>
            </div>
          )}

          {/* TOP SUMMARY METRICS & CTA BAR */}
          <div className="jobs-summary-header">
            <div className="summary-cards-row">
              <div className="summary-stat-chip">
                <span className="chip-label">Total Jobs</span>
                <span className="chip-value">{totalJobs}</span>
              </div>
              <div className="summary-stat-chip active-chip">
                <span className="chip-label">Active</span>
                <span className="chip-value text-success">{activeCount}</span>
              </div>
              <div className="summary-stat-chip draft-chip">
                <span className="chip-label">Draft</span>
                <span className="chip-value text-warning">{draftCount}</span>
              </div>
              <div className="summary-stat-chip closed-chip">
                <span className="chip-label">Closed</span>
                <span className="chip-value text-muted">{closedCount}</span>
              </div>
            </div>

            <Button
              variant="primary"
              iconLeft={<PlusCircle size={18} />}
              onClick={() => navigate('/recruiter/jobs/new')}
            >
              Post New Job
            </Button>
          </div>

          {/* FILTER TABS & TABLE */}
          <Card variant="default" padding="none" className="table-card">
            <div className="table-card-header">
              <div className="filter-pills">
                {['All', 'Active', 'Draft', 'Closed'].map((filterName) => (
                  <button
                    key={filterName}
                    type="button"
                    className={`filter-pill ${activeFilter === filterName ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filterName)}
                  >
                    {filterName}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive-wrapper">
              <table className="manage-jobs-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Job Type</th>
                    <th>Applicants</th>
                    <th>Status</th>
                    <th>Posted Date</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-jobs-row text-center">
                        No jobs found under "{activeFilter}" filter.
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job) => (
                      <tr key={job.id}>
                        <td className="job-title-cell">
                          <Link to={`/jobs/${job.id}`} className="job-name-link">
                            {job.title}
                          </Link>
                        </td>
                        <td>
                          <span className="table-meta-text">
                            <MapPin size={14} /> {job.location}
                          </span>
                        </td>
                        <td>
                          <span className="table-meta-text">{job.type}</span>
                        </td>
                        <td>
                          <Link to="/recruiter/applicants" className="applicant-count-link">
                            <Users size={14} /> {job.applicantsCount} Applicants
                          </Link>
                        </td>
                        <td>
                          {job.status === 'Active' && <Badge variant="success">Active</Badge>}
                          {job.status === 'Draft' && <Badge variant="warning">Draft</Badge>}
                          {job.status === 'Closed' && <Badge variant="neutral">Closed</Badge>}
                        </td>
                        <td>
                          <span className="table-meta-text">
                            <Clock size={14} /> {job.postedDate}
                          </span>
                        </td>
                        <td className="actions-cell text-right">
                          <div className="actions-btn-group">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconLeft={<Eye size={14} />}
                              onClick={() => navigate(`/jobs/${job.id}`)}
                              title="View Public Listing"
                            >
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconLeft={<Edit size={14} />}
                              onClick={() => navigate('/recruiter/jobs/new')}
                              title="Edit Job Posting"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconLeft={<Users size={14} />}
                              onClick={() => navigate('/recruiter/applicants')}
                              title="View Applicants"
                            >
                              Applicants
                            </Button>
                            {job.status !== 'Closed' && (
                              <Button
                                variant="danger"
                                size="sm"
                                iconLeft={<XCircle size={14} />}
                                onClick={() => handleCloseJob(job.id)}
                                title="Close Job Opening"
                              >
                                Close
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}

export default ManageJobsPage;
