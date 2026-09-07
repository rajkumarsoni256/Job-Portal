import React from 'react';
import { Card, Badge } from '../common';

/**
 * StatCard Component
 */
function StatCard({ title = 'Total Applications', value = '24', trend = '+12% this week', icon = null }) {
  return (
    <Card variant="default">
      <Card.Body>
        <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-2)' }}>
          <span className="text-muted font-medium" style={{ fontSize: 'var(--font-sm)' }}>{title}</span>
          {icon && <div style={{ color: 'var(--color-primary)' }}>{icon}</div>}
        </div>
        <div className="flex items-baseline justify-between">
          <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
            {value}
          </span>
          {trend && <Badge variant="success" size="sm">{trend}</Badge>}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StatCard;
