import React from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import { Card, Badge, Button } from '../common';
import { Link } from 'react-router-dom';

/**
 * JobCard Component
 */
function JobCard({ job }) {
  const jobTitle = job?.title || 'Frontend Developer (React)';
  const company = job?.company || 'TechCorp Solutions';
  const location = job?.location || 'Remote / New York';
  const salary = job?.salary || '$90k - $120k';
  const type = job?.type || 'Full-Time';
  const jobId = job?.id || '1';

  return (
    <Card interactive variant="default">
      <Card.Header
        title={jobTitle}
        subtitle={company}
        action={<Badge variant="primary">{type}</Badge>}
      />
      <Card.Body>
        <div className="flex gap-4 text-muted font-normal" style={{ fontSize: 'var(--font-sm)', marginBottom: 'var(--space-3)' }}>
          <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
          <span className="flex items-center gap-1"><DollarSign size={14} /> {salary}</span>
        </div>
        <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)' }}>
          {job?.description || 'Building next-generation frontend interfaces with modern React, clean CSS, and accessible components.'}
        </p>
      </Card.Body>
      <Card.Footer>
        <span className="text-subtle flex items-center gap-1" style={{ fontSize: 'var(--font-xs)' }}>
          <Clock size={13} /> Posted 2 days ago
        </span>
        <Link to={`/jobs/${jobId}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default JobCard;
