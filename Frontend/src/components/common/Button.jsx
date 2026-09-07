import React from 'react';
import './Button.css';

/**
 * Reusable Button Component
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
 * - size: 'sm' | 'md' | 'lg'
 * - isLoading: boolean
 * - disabled: boolean
 * - fullWidth: boolean
 * - iconLeft: React node
 * - iconRight: React node
 * - type: 'button' | 'submit' | 'reset'
 * - children: React node
 */
function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  className = '',
  children,
  ...props
}) {
  const classes = [
    'btn-ui',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    isLoading ? 'btn-ui-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        iconLeft
      )}

      <span>{children}</span>

      {!isLoading && iconRight}
    </button>
  );
}

export default Button;
