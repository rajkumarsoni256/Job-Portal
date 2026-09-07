import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Container, SectionHeader, Card, Button } from '../../components/common';
import StatCard from '../../components/dashboard/StatCard';

/**
 * RecruiterDashboard Component
 */
function RecruiterDashboard() {
  return (
    <Container size="xl" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      <SectionHeader
        title="Recruiter Dashboard"
        description="Manage job postings, review applicants, and source top talent."
        action={
          <Button variant="primary" iconLeft={<PlusCircle size={16} />}>
            Post New Job
          </Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        <StatCard title="Active Postings" value="8" trend="3 ending soon" />
        <StatCard title="Total Applicants" value="142" trend="+18 new today" />
        <StatCard title="Shortlisted Candidates" value="19" trend="High match" />
        <StatCard title="Closed Positions" value="4" trend="This quarter" />
      </div>

      <Card variant="default">
        <Card.Header title="Active Job Postings" />
        <Card.Body>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-sm)' }}>
            Job management table and applicant cards will be rendered here.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RecruiterDashboard;
