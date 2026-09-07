import React from 'react';
import { Container, SectionHeader, Card } from '../../components/common';
import StatCard from '../../components/dashboard/StatCard';

/**
 * AdminDashboard Component
 */
function AdminDashboard() {
  return (
    <Container size="xl" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      <SectionHeader
        title="Admin Control Panel"
        description="Monitor platform statistics, user roles, and job posting audits."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        <StatCard title="Total Users" value="1,248" trend="+42 this month" />
        <StatCard title="Total Jobs" value="356" trend="28 pending audit" />
        <StatCard title="Resumes Analyzed" value="4,820" trend="Active usage" />
        <StatCard title="Flagged Content" value="0" trend="All clear" />
      </div>

      <Card variant="default">
        <Card.Header title="Platform Auditing" />
        <Card.Body>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-sm)' }}>
            System logs and role permission management controls will be rendered here.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminDashboard;
