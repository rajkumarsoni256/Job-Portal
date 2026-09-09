import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './AuthPages.css';

/**
 * LoginPage Component
 * Clean 2-column split login page with frontend form validation
 */
function LoginPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error on field change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate login response
    setTimeout(() => {
      if (authContext && authContext.login) {
        authContext.login({
          name: formData.email.split('@')[0],
          email: formData.email,
          role: 'seeker',
        });
      }
      setIsSubmitting(false);
      navigate('/seeker/dashboard');
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
            <div className="auth-brand-eyebrow">Career Portal</div>
            <h1 className="auth-brand-title">Your next opportunity starts here.</h1>
            <p className="auth-brand-desc">
              Connect with top tech companies, track your job applications seamlessly, and get AI-powered resume insights to land your dream role.
            </p>

            <ul className="auth-features-list">
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={15} />
                </div>
                <span>1-Click Fast Job Applications</span>
              </li>
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={15} />
                </div>
                <span>AI Resume Scoring & ATS Matcher</span>
              </li>
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <CheckCircle2 size={15} />
                </div>
                <span>Direct Access to Top Recruiters</span>
              </li>
            </ul>
          </div>

          <div className="auth-brand-footer">
            © {new Date().getFullYear()} JobDekho Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome Back</h2>
            <p className="auth-form-subtitle">Enter your details to sign in to your account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="field-error-text">{errors.password}</span>}
            </div>

            {/* Options Row */}
            <div className="form-options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-nav btn-primary full-width"
              style={{ marginTop: '0.5rem', height: '44px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
              {!isSubmitting && <ArrowRight size={16} style={{ marginLeft: 6 }} />}
            </button>
          </form>

          {/* Footer Navigation Link */}
          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="auth-footer-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
