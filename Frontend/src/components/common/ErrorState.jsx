import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import './ErrorState.css';

/**
 * Reusable ErrorState Component
 * Displays a clean error card with an alert icon, message, and a Retry/Action button.
 *
 * Props:
 * - title: string
 * - message: string
 * - onRetry: function
 * - actionText: string
 */
function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading data. Please check your connection and try again.',
  onRetry = null,
  actionText = 'Try Again',
  className = '',
}) {
  return (
    <div className={`error-state-container ${className}`.trim()}>
      <div className="error-state-icon-box">
        <AlertCircle size={28} />
      </div>

      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-message">{message}</p>

      {onRetry && (
        <div className="error-state-action">
          <button
            type="button"
            className="btn-nav btn-primary"
            style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
            onClick={onRetry}
          >
            <RotateCcw size={16} style={{ marginRight: 6 }} /> {actionText}
          </button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
