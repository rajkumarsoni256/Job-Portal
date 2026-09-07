import React from 'react';
import './Card.css';

/**
 * Reusable Card Component with Header, Body, and Footer sub-components
 */
function Card({
  variant = 'default',
  interactive = false,
  padding = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = [
    'card-ui',
    `card-${variant}`,
    interactive ? 'card-interactive' : '',
    padding !== 'custom' ? `card-padding-${padding}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle, action, className = '', children, ...props }) {
  return (
    <div className={`card-header ${className}`.trim()} {...props}>
      {title || subtitle ? (
        <div>
          {title && <h3 className="card-header-title">{title}</h3>}
          {subtitle && <p className="card-header-subtitle">{subtitle}</p>}
        </div>
      ) : (
        children
      )}
      {action && <div className="card-header-action">{action}</div>}
    </div>
  );
}

function CardBody({ className = '', children, ...props }) {
  return (
    <div className={`card-body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={`card-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
