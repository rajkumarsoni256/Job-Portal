import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User, Mail, Lock, CheckCircle2, ArrowRight, Building2, UserCheck } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './AuthPages.css';

/**
 * RegisterPage Component
 * Clean 2-column split registration page with frontend form validation
 */
function RegisterPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    accountType: 'seeker', // 'seeker' or 'recruiter'
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, accountType: role }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate registration response
    setTimeout(() => {
      if (authContext && authContext.login) {
        authContext.login({
          name: formData.fullName,
          email: formData.email,
          role: formData.accountType,
        });
      }
      setIsSubmitting(false);

      if (formData.accountType === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/seeker/dashboard');
      }
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side: Branding Panel */}
        <div className="auth-brand-panel">
          <Link to="/" className="auth-brand-header">
            <img
              src="/assets/jobdekho-logo.png"
              alt="JobDekho"
              style={{ height: 48, objectFit: 'contain' }}
            />
          </Link>

          <div className="auth-brand-content">
            <div className="auth-brand-eyebrow">Create Account</div>
            <h1 className="auth-brand-title">Join JobDekho today.</h1>
            <p className="auth-brand-desc">
              Whether you're looking for your next career breakthrough or hiring top tech talent, JobDekho gives you the tools to succeed.
            </p>

            <ul className="auth-features-list">
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={15} />
                </div>
                <span>Tailored Recommendations for Job Seekers</span>
              </li>
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={15} />
                </div>
                <span>AI Resume Scoring & Match Insights</span>
              </li>
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={15} />
                </div>
                <span>Employer Hiring & Applicant Management</span>
              </li>
            </ul>
          </div>

          <div className="auth-brand-footer">
            © {new Date().getFullYear()} JobDekho Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Register Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create an Account</h2>
            <p className="auth-form-subtitle">Fill in your details below to get started</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Account Type Selector */}
            <div className="form-field">
              <label className="form-label">I am registering as a</label>
              <div className="account-type-grid">
                <div
                  className={`account-type-card ${formData.accountType === 'seeker' ? 'active' : ''}`}
                  onClick={() => handleRoleSelect('seeker')}
                >
                  <UserCheck size={18} />
                  <div className="account-type-info">
                    <span className="account-type-title">Job Seeker</span>
                    <span className="account-type-desc">Looking for jobs</span>
                  </div>
                </div>

                <div
                  className={`account-type-card ${formData.accountType === 'recruiter' ? 'active' : ''}`}
                  onClick={() => handleRoleSelect('recruiter')}
                >
                  <Building2 size={18} />
                  <div className="account-type-info">
                    <span className="account-type-title">Recruiter</span>
                    <span className="account-type-desc">Hiring talent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Name Field */}
            <div className="form-field">
              <label className="form-label" htmlFor="fullName">
                Full Name
              </label>
              <div className="form-input-wrapper">
                <User size={16} className="form-input-icon" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
            </div>

            {/* Email Field */}
            <div className="form-field">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <div className="form-input-wrapper">
                <Mail size={16} className="form-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="field-error-text">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="form-input-wrapper">
                <Lock size={16} className="form-input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="field-error-text">{errors.password}</span>}
            </div>

            {/* Confirm Password Field */}
            <div className="form-field">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="form-input-wrapper">
                <Lock size={16} className="form-input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <span className="field-error-text">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="form-field">
              <label className="checkbox-label" style={{ marginTop: '0.2rem' }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span style={{ fontSize: '0.78rem' }}>
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && <span className="field-error-text">{errors.agreeTerms}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-nav btn-primary full-width"
              style={{ marginTop: '0.5rem', height: '44px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
              {!isSubmitting && <ArrowRight size={16} style={{ marginLeft: 6 }} />}
            </button>
          </form>

          {/* Footer Navigation Link */}
          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-footer-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
