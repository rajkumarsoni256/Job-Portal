import React from 'react';
import './LoadingState.css';

/**
 * Reusable LoadingState Component
 * Supports spinner indicator or shimmery skeleton loaders.
 *
 * Props:
 * - variant: 'spinner' | 'skeleton'
 * - text: string (message shown under spinner)
 * - count: number (number of skeleton bars to render)
 * - height: string (custom height for skeleton bars e.g. "40px")
 */
function LoadingState({
  variant = 'spinner',
  text = 'Loading details...',
  count = 3,
  height = '24px',
  className = '',
}) {
  if (variant === 'skeleton') {
    return (
      <div className={`loading-skeleton-container ${className}`.trim()}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="loading-skeleton-item"
            style={{ height, opacity: 1 - index * 0.15 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`loading-state-container ${className}`.trim()}>
      <div className="loading-spinner-wrapper">
        <div className="loading-spinner" aria-label="Loading indicator" />
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
}

export default LoadingState;
