import React from 'react';
import './SectionHeader.css';

/**
 * SectionHeader Component
 * Provides a clean title, subtitle, optional badge, and action slots for sections.
 *
 * Props:
 * - title: string / React node
 * - description: string / React node
 * - badge: React node (e.g. <Badge />)
 * - action: React node (e.g. <Button />)
 * - level: 2 | 3 (heading tag h2 or h3)
 * - className: custom class
 */
function SectionHeader({
  title,
  description,
  badge,
  action,
  level = 2,
  className = '',
  ...props
}) {
  const HeadingTag = level === 3 ? 'h3' : 'h2';

  return (
    <div className={`section-header ${className}`.trim()} {...props}>
      <div className="section-header-content">
        <div className="section-header-title">
          <HeadingTag>{title}</HeadingTag>
          {badge && <span className="section-header-badge">{badge}</span>}
        </div>
        {description && <p className="section-header-description">{description}</p>}
      </div>

      {action && <div className="section-header-actions">{action}</div>}
    </div>
  );
}

export default SectionHeader;
