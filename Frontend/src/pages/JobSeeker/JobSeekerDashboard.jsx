import React from 'react';
import { UserCheck } from 'lucide-react';
import { Container, SectionHeader, Card } from '../../components/common';
import StatCard from '../../components/dashboard/StatCard';

/**
 * JobSeekerDashboard Component
 */
function JobSeekerDashboard() {
  return (
    <Container size="xl" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      <SectionHeader
        title="Job Seeker Dashboard"
        description="Track your applications, saved jobs, and ATS match history."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        <StatCard title="Applications Sent" value="12" trend="+3 this week" />
        <StatCard title="Saved Jobs" value="5" trend="2 active" />
        <StatCard title="Interviews Scheduled" value="2" trend="Next: Tomorrow" />
        <StatCard title="Avg ATS Score" value="84%" trend="Good compliance" />
      </div>

      <Card variant="default">
        <Card.Header title="Recent Applications" />
        <Card.Body>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-sm)' }}>
            Applications progress timeline and table will be rendered here.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobSeekerDashboard;
