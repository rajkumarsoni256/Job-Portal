import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Filter,
  BarChart3,
  PieChart,
  Layers,
  Award,
} from 'lucide-react';
import { Container, Card, Badge, Button } from '../../components/common';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import './RecruiterAnalyticsPage.css';

/**
 * Recruiter Analytics Page Component
 * Module — Complete recruitment analytics dashboard with 5 metrics, 4 charts & date/job filters
 */
function RecruiterAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30days'); // '7days' | '30days' | '90days' | 'all'
  const [selectedJob, setSelectedJob] = useState('all'); // 'all' | '1' | '2' | '3'

  // Summary Metrics Data
  const summaryMetrics = [
    { title: 'Total Jobs', value: '12', trend: '+2 this month', icon: <Briefcase size={22} /> },
    { title: 'Total Applicants', value: '148', trend: '+18% vs last month', icon: <Users size={22} /> },
    { title: 'Shortlisted', value: '38', trend: '25.6% conversion', icon: <UserCheck size={22} /> },
    { title: 'Interviews', value: '18', trend: '12.1% rate', icon: <Calendar size={22} /> },
    { title: 'Hired', value: '6', trend: '4.0% hire rate', icon: <CheckCircle2 size={22} /> },
  ];

  // Applications Over Time Bar Data (Mock Weekly/Monthly)
  const applicationsOverTime = [
    { label: 'Week 1', count: 24, height: '40%' },
    { label: 'Week 2', count: 42, height: '70%' },
    { label: 'Week 3', count: 58, height: '95%' },
    { label: 'Week 4', count: 36, height: '60%' },
    { label: 'Week 5', count: 50, height: '82%' },
  ];

  // Applicants by Job Data
  const applicantsByJob = [
    { title: 'Senior React Developer', count: 64, percent: 85, badge: 'High Volume' },
    { title: 'Full Stack Engineer (Node.js)', count: 48, percent: 65, badge: 'Popular' },
    { title: 'UI/UX Product Designer', count: 22, percent: 35, badge: 'Steady' },
    { title: 'DevOps & Cloud Architect', count: 14, percent: 22, badge: 'Specialized' },
  ];

  // Application Status Distribution Data
  const statusDistribution = [
    { status: 'Applied / New', count: 86, color: '#2563eb', percent: '58%' },
    { status: 'Shortlisted', count: 38, color: '#0284c7', percent: '26%' },
    { status: 'Interview Scheduled', count: 18, color: '#ea580c', percent: '12%' },
    { status: 'Offer Extended / Hired', count: 6, color: '#16a34a', percent: '4%' },
  ];

  // Hiring Funnel Data
  const funnelStages = [
    { stage: 'Total Applications', count: 148, rate: '100%', width: '100%', bg: '#2563eb' },
    { stage: 'Shortlisted Candidates', count: 38, rate: '25.6%', width: '65%', bg: '#0284c7' },
    { stage: 'Interviews Conducted', count: 18, rate: '12.1%', width: '42%', bg: '#ea580c' },
    { stage: 'Successful Hires', count: 6, rate: '4.0%', width: '25%', bg: '#16a34a' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Recruiter Sidebar */}
      <DashboardSidebar role="recruiter" />

      <main className="dashboard-main-content">
        <DashboardHeader
          title="Recruiter Analytics"
          subtitle="Track applicant conversion, job performance metrics, and recruitment funnel insights"
        />

        <Container size="xl" className="analytics-container">
          {/* FILTER CONTROL BAR */}
          <div className="analytics-toolbar-card">
            <div className="toolbar-title-group">
              <Filter size={18} className="text-primary" />
              <span className="font-semibold">Analytics Filters</span>
            </div>

            <div className="toolbar-controls">
              <div className="control-box">
                <label>Date Range:</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="control-select"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              <div className="control-box">
                <label>Job Filter:</label>
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="control-select"
                >
                  <option value="all">All Active & Past Jobs</option>
                  <option value="1">Senior React Developer</option>
                  <option value="2">Full Stack Engineer</option>
                  <option value="3">UI/UX Product Designer</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5 SUMMARY STAT CARDS */}
          <div className="analytics-metrics-grid">
            {summaryMetrics.map((m, idx) => (
              <StatCard
                key={idx}
                title={m.title}
                value={m.value}
                trend={m.trend}
                icon={m.icon}
              />
            ))}
          </div>

          {/* 4 VISUAL CHARTS GRID */}
          <div className="charts-grid-2x2">
            {/* CHART 1: APPLICATIONS OVER TIME */}
            <Card variant="default" padding="lg" className="chart-card">
              <Card.Header
                title={
                  <span className="chart-title">
                    <BarChart3 size={18} className="text-primary" /> Applications Over Time
                  </span>
                }
                subtitle="Weekly trend of applicant volume received"
              />
              <Card.Body>
                <div className="bar-chart-container">
                  {applicationsOverTime.map((item, idx) => (
                    <div key={idx} className="bar-column">
                      <span className="bar-val-label">{item.count}</span>
                      <div className="bar-fill-track">
                        <div
                          className="bar-fill"
                          style={{ height: item.height }}
                          title={`${item.count} applicants`}
                        />
                      </div>
                      <span className="bar-xaxis-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* CHART 2: APPLICANTS BY JOB */}
            <Card variant="default" padding="lg" className="chart-card">
              <Card.Header
                title={
                  <span className="chart-title">
                    <Layers size={18} className="text-info" /> Applicants by Job
                  </span>
                }
                subtitle="Applicant volume distribution across open job listings"
              />
              <Card.Body className="job-distribution-list">
                {applicantsByJob.map((job, idx) => (
                  <div key={idx} className="job-dist-item">
                    <div className="dist-item-header">
                      <span className="dist-job-title">{job.title}</span>
                      <span className="dist-count">{job.count} applicants</span>
                    </div>
                    <div className="dist-progress-track">
                      <div
                        className="dist-progress-fill"
                        style={{ width: `${job.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* CHART 3: APPLICATION STATUS DISTRIBUTION */}
            <Card variant="default" padding="lg" className="chart-card">
              <Card.Header
                title={
                  <span className="chart-title">
                    <PieChart size={18} className="text-warning" /> Application Status Distribution
                  </span>
                }
                subtitle="Breakdown of candidate pipeline stages"
              />
              <Card.Body className="status-dist-body">
                <div className="status-bars-stack">
                  {statusDistribution.map((s, idx) => (
                    <div
                      key={idx}
                      className="stack-segment"
                      style={{ width: s.percent, backgroundColor: s.color }}
                      title={`${s.status}: ${s.count}`}
                    />
                  ))}
                </div>

                <div className="status-legend-grid">
                  {statusDistribution.map((s, idx) => (
                    <div key={idx} className="legend-item">
                      <div className="legend-dot" style={{ backgroundColor: s.color }} />
                      <span className="legend-name">{s.status}:</span>
                      <span className="legend-val">{s.count} ({s.percent})</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* CHART 4: HIRING FUNNEL */}
            <Card variant="default" padding="lg" className="chart-card">
              <Card.Header
                title={
                  <span className="chart-title">
                    <TrendingUp size={18} className="text-success" /> Recruitment Hiring Funnel
                  </span>
                }
                subtitle="Conversion rate from initial application to final hire"
              />
              <Card.Body className="funnel-container">
                {funnelStages.map((stage, idx) => (
                  <div key={idx} className="funnel-stage-row">
                    <div className="funnel-meta">
                      <span className="stage-name">{stage.stage}</span>
                      <span className="stage-count">{stage.count} ({stage.rate})</span>
                    </div>
                    <div className="funnel-bar-track">
                      <div
                        className="funnel-bar-fill"
                        style={{ width: stage.width, backgroundColor: stage.bg }}
                      />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default RecruiterAnalyticsPage;
