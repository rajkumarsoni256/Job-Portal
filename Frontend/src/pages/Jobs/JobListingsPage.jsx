import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Container, SectionHeader, Card, Input, Button } from '../../components/common';
import JobCard from '../../components/jobs/JobCard';
import { MOCK_JOBS } from '../../data/mockJobs';

/**
 * JobListingsPage Component
 */
function JobListingsPage() {
  return (
    <Container size="xl" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      <SectionHeader
        title="Explore All Jobs"
        description="Discover open positions matched to your skills and career goals."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-6)' }}>
        {/* Sidebar Filters */}
        <Card variant="default">
          <Card.Header title="Filter Jobs" action={<Filter size={16} />} />
          <Card.Body>
            <Input label="Search Keywords" iconLeft={<Search size={16} />} placeholder="e.g. React, Remote" />
            
            <div style={{ marginTop: 'var(--space-4)' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>
                Job Type
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--font-sm)' }}>
                <label><input type="checkbox" defaultChecked /> Full Time</label>
                <label><input type="checkbox" /> Part Time</label>
                <label><input type="checkbox" /> Remote</label>
                <label><input type="checkbox" /> Contract</label>
              </div>
            </div>

            <Button variant="secondary" fullWidth style={{ marginTop: 'var(--space-6)' }}>
              Apply Filters
            </Button>
          </Card.Body>
        </Card>

        {/* Job Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {MOCK_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default JobListingsPage;
