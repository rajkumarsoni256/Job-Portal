import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Building2,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './AuthPages.css';

/**
 * LoginPage Component — 3 Role Login Flow
 * Step 1: "How do you want to continue?" (Role Selection: Job Seeker, Job Recruiter, Admin)
 * Step 2: Role-based Login Form with credentials & role validation
 */
function LoginPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  // Step 1: 'role-selection', Step 2: 'login-form'
  const [step, setStep] = useState('role-selection');
  const [selectedRole, setSelectedRole] = useState('JOB_SEEKER'); // 'JOB_SEEKER' | 'JOB_RECRUITER' | 'ADMIN'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleDetails = {
    JOB_SEEKER: {
      title: 'Job Seeker',
      subtitle: "I'm looking for a job",
      description: 'Find jobs, manage your resume and track applications.',
      icon: <UserCheck size={24} />,
      demoEmail: 'seeker@jobdekho.com',
    },
    JOB_RECRUITER: {
      title: 'Job Recruiter',
      subtitle: "I'm hiring",
      description: 'Post jobs, find candidates and manage applications.',
      icon: <Building2 size={24} />,
      demoEmail: 'recruiter@jobdekho.com',
    },
    ADMIN: {
      title: 'Admin',
      subtitle: 'Platform Administration',
      description: 'Manage users, jobs, companies and platform activity.',
      icon: <ShieldCheck size={24} />,
      demoEmail: 'admin@jobdekho.com',
    },
  };

  const handleRoleCardClick = (roleKey) => {
    setSelectedRole(roleKey);
  };

  const handleContinue = () => {
    setGeneralError('');
    setErrors({});
    setStep('login-form');
  };

  const handleBackToRoles = () => {
    setGeneralError('');
    setErrors({});
    setStep('role-selection');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Redirect already authenticated users away from /login
  React.useEffect(() => {
    if (authContext && authContext.isAuthenticated && authContext.user) {
      const rawRole = (authContext.user.role || '').toUpperCase();
      const userRole = rawRole === 'SEEKER' ? 'JOB_SEEKER' : rawRole === 'RECRUITER' ? 'JOB_RECRUITER' : rawRole;
      const targetDashboard =
        userRole === 'ADMIN'
          ? '/admin/dashboard'
          : userRole === 'JOB_RECRUITER'
          ? '/recruiter/dashboard'
          : '/seeker/dashboard';

      navigate(targetDashboard, { replace: true });
    }
  }, [authContext, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      if (authContext && authContext.login) {
        const result = authContext.login(formData.email, formData.password, selectedRole);

        if (result && result.success) {
          setIsSubmitting(false);
          navigate(result.user.redirectPath, { replace: true });
          return;
        } else if (result && result.message) {
          setGeneralError(result.message);
          setIsSubmitting(false);
          return;
        }
      }

      setIsSubmitting(false);
      setGeneralError('Invalid email or password.');
    }, 400);
  };

  const fillDemo = (roleKey) => {
    setSelectedRole(roleKey);
    const demo = roleDetails[roleKey];
    setFormData({
      email: demo.demoEmail,
      password: '123456',
      rememberMe: true,
    });
    setGeneralError('');
    setErrors({});
    setStep('login-form');
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
                <span>Role-Based Secure Dashboard Portals</span>
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
                <span>Direct Employer & Candidate Management</span>
              </li>
            </ul>
          </div>

          <div className="auth-brand-footer">
            © {new Date().getFullYear()} JobDekho Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Step 1 (Role Selection) OR Step 2 (Login Form) */}
        <div className="auth-form-panel">
          <div className="auth-logo-header">
            <Link to="/" aria-label="JobDekho Home">
              <img
                src="/assets/jobdekho-logo.png"
                alt="JobDekho — Naukri Dekho, Future Banao."
                className="auth-logo-img"
              />
            </Link>
          </div>

          {step === 'role-selection' ? (
            <div className="role-selection-wrapper">
              <div className="auth-form-header">
                <h2 className="auth-form-title">How do you want to continue?</h2>
                <p className="auth-form-subtitle">Select your account role to access your portal</p>
              </div>

              {/* 3 ROLE SELECTION CARDS */}
              <div className="role-selection-cards-grid">
                {Object.keys(roleDetails).map((key) => {
                  const role = roleDetails[key];
                  const isSelected = selectedRole === key;

                  return (
                    <div
                      key={key}
                      className={`role-select-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleRoleCardClick(key)}
                    >
                      <div className="role-card-icon-wrapper">{role.icon}</div>
                      <div className="role-card-content">
                        <div className="flex items-center justify-between">
                          <h3 className="role-card-title">{role.title}</h3>
                          {isSelected && <span className="role-selected-badge">Selected</span>}
                        </div>
                        <div className="role-card-subtitle">"{role.subtitle}"</div>
                        <p className="role-card-desc">{role.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CONTINUE BUTTON */}
              <button
                type="button"
                className="btn-nav btn-primary full-width"
                style={{ marginTop: '1.5rem', height: '44px' }}
                onClick={handleContinue}
              >
                Continue
                <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </button>

              <p className="auth-footer-text">
                Don't have an account?{' '}
                <Link to="/register" className="auth-footer-link">
                  Sign Up
                </Link>
              </p>
            </div>
          ) : (
            <div className="login-form-wrapper">
              <div className="auth-form-header flex flex-col">
                <button
                  type="button"
                  className="btn-back-role"
                  onClick={handleBackToRoles}
                >
                  <ArrowLeft size={16} />
                  <span>← Change role</span>
                </button>

                <div style={{ marginTop: '0.75rem' }}>
                  <h2 className="auth-form-title">
                    {roleDetails[selectedRole].title} Sign In
                  </h2>
                  <p className="auth-form-subtitle">
                    Enter your credentials to access your {roleDetails[selectedRole].title.toLowerCase()} workspace
                  </p>
                </div>

                {/* DEMO PILLS SHORTCUT */}
                <div className="demo-pills-row">
                  <span className="demo-pills-label">Quick Demo Logins:</span>
                  <button
                    type="button"
                    className={`demo-pill-btn ${selectedRole === 'JOB_SEEKER' ? 'active' : ''}`}
                    onClick={() => fillDemo('JOB_SEEKER')}
                  >
                    Seeker Demo
                  </button>
                  <button
                    type="button"
                    className={`demo-pill-btn ${selectedRole === 'JOB_RECRUITER' ? 'active' : ''}`}
                    onClick={() => fillDemo('JOB_RECRUITER')}
                  >
                    Recruiter Demo
                  </button>
                  <button
                    type="button"
                    className={`demo-pill-btn ${selectedRole === 'ADMIN' ? 'active' : ''}`}
                    onClick={() => fillDemo('ADMIN')}
                  >
                    Admin Demo
                  </button>
                </div>
              </div>

              {/* GENERAL ROLE VALIDATION ERROR ALERT */}
              {generalError && (
                <div className="auth-general-error-banner">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}

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
                      placeholder={roleDetails[selectedRole].demoEmail}
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
                  {isSubmitting ? 'Signing In...' : `Sign In as ${roleDetails[selectedRole].title}`}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
