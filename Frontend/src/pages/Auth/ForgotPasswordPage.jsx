import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { Container, Card, Input, Button } from '../../components/common';
import './ForgotPasswordPage.css';

/**
 * Forgot Password Page Component
 * Module — Password reset request page for JobDekho users
 */
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate short submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="forgot-password-page-wrapper">
      <Container size="sm">
        <div className="forgot-password-card-container">
          <Card variant="default" padding="lg" className="forgot-password-card">
            {/* Header Brand Icon */}
            <div className="auth-icon-header">
              <div className="auth-icon-circle">
                <KeyRound size={28} className="text-primary" />
              </div>
            </div>

            <h1 className="forgot-password-title">
              Forgot your password?
            </h1>

            <p className="forgot-password-subtitle">
              Enter your email address and we'll help you reset your password.
            </p>

            {isSubmitted ? (
              <div className="reset-success-block">
                <div className="success-icon-badge">
                  <CheckCircle2 size={36} className="text-success" />
                </div>

                <h3 className="success-title">Check Your Inbox</h3>
                <p className="success-desc">
                  Password reset instructions have been sent to <strong>{email}</strong>. Please check your inbox and follow the link to set a new password.
                </p>

                <div className="success-actions">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => { setIsSubmitted(false); setEmail(''); }}
                  >
                    Send to a Different Email
                  </Button>

                  <Link to="/login" className="back-login-link-btn">
                    <ArrowLeft size={16} /> Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="forgot-password-form">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  iconLeft={<Mail size={18} className="text-muted" />}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  style={{ marginTop: 'var(--space-2)' }}
                >
                  Send Reset Link
                </Button>

                <div className="back-to-login-footer">
                  <Link to="/login" className="back-to-login-link">
                    <ArrowLeft size={16} /> Back to Login
                  </Link>
                </div>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPasswordPage;
