import React from 'react';
import './Container.css';

/**
 * Container Component
 * Handles consistent layout width and horizontal padding across all viewports.
 *
 * Props:
 * - size: 'sm' | 'md' | 'lg' | 'xl' (default) | 'full'
 * - className: additional custom CSS classes
 * - children: node content
 */
function Container({ size = 'xl', className = '', children, ...props }) {
  const containerClass = `container container-${size} ${className}`.trim();

  return (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );
}

export default Container;
