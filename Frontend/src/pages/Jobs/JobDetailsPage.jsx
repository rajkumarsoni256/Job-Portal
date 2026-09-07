import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { Container, Card, Button, Badge } from '../../components/common';
import { MOCK_JOBS } from '../../data/mockJobs';

/**
 * JobDetailsPage Component
 */
function JobDetailsPage() {
  const { id } = useParams();
  const job = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];

  return (
    <Container size="lg" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--font-sm)' }}>
        <ArrowLeft size={16} /> Back to Job Listings
      </Link>

      <Card variant="default" padding="lg">
        <Card.Header
          title={job.title}
          subtitle={`${job.company} • ${job.location}`}
          action={
            <Button variant="primary" iconLeft={<Send size={16} />}>
              Apply Now
            </Button>
          }
        />
        <Card.Body>
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <Badge variant="primary" icon={<Briefcase size={14} />}>{job.type}</Badge>
            <Badge variant="neutral" icon={<DollarSign size={14} />}>{job.salary}</Badge>
            <Badge variant="info" icon={<MapPin size={14} />}>{job.location}</Badge>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h4 style={{ marginBottom: 'var(--space-2)' }}>Job Description</h4>
            <p style={{ color: 'var(--color-text-body)', lineHeight: 1.6 }}>{job.description}</p>
          </div>

          <div>
            <h4 style={{ marginBottom: 'var(--space-2)' }}>Key Requirements</h4>
            <ul style={{ paddingLeft: 'var(--space-6)', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              <li>Proficiency with modern React, JavaScript (ES6+), and CSS architecture.</li>
              <li>Experience building responsive, component-driven user interfaces.</li>
              <li>Familiarity with RESTful APIs, Git workflows, and ATS optimization.</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobDetailsPage;
