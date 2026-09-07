import React from 'react';
import './Badge.css';

/**
 * Reusable Badge Component
 *
 * Props:
 * - variant: 'primary' | 'neutral' | 'success' | 'warning' | 'error' | 'info'
 * - size: 'sm' | 'md'
 * - dot: boolean (renders a small status dot)
 * - icon: React node
 * - children: React node
 */
function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon = null,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'badge-ui',
    `badge-${variant}`,
    `badge-${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {dot && <span className="badge-dot" aria-hidden="true" />}
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
