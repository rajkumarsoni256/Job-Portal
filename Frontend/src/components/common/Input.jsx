import React, { forwardRef } from 'react';
import './Input.css';

/**
 * Reusable Input Component
 * Supports standard input types, textareas, and select elements.
 *
 * Props:
 * - label: string
 * - helperText: string
 * - error: string
 * - required: boolean
 * - iconLeft: React node
 * - iconRight: React node
 * - as: 'input' | 'textarea' | 'select'
 * - children: options (when as='select')
 */
const Input = forwardRef(({
  label,
  helperText,
  error,
  required = false,
  iconLeft = null,
  iconRight = null,
  as = 'input',
  className = '',
  id,
  children,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const Component = as;

  const wrapperClasses = [
    'input-wrapper',
    iconLeft ? 'input-has-icon-left' : '',
    iconRight ? 'input-has-icon-right' : '',
  ].filter(Boolean).join(' ');

  const groupClasses = [
    'input-field-group',
    error ? 'input-error' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className={wrapperClasses}>
        {iconLeft && <div className="input-icon input-icon-left">{iconLeft}</div>}

        <Component
          ref={ref}
          id={inputId}
          className="input-element"
          {...props}
        >
          {children}
        </Component>

        {iconRight && <div className="input-icon input-icon-right">{iconRight}</div>}
      </div>

      {error ? (
        <p className="input-error-text">{error}</p>
      ) : helperText ? (
        <p className="input-helper-text">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
