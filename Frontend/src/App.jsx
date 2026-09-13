import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Wrappers
import PublicLayout from './components/layout/PublicLayout';
import AuthLayout from './components/layout/AuthLayout';
import SeekerLayout from './components/layout/SeekerLayout';

// Common / Protection
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthContext } from './context/AuthContext';

// Page Components — Public & Auth
import JobListingsPage from './pages/Jobs/JobListingsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import CompaniesPage from './pages/Companies/CompaniesPage';
import CompanyDetailsPage from './pages/Companies/CompanyDetailsPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzer/ResumeAnalyzerPage';
import ResumeResultPage from './pages/ResumeAnalyzer/ResumeResultPage';
import AboutPage from './pages/About/AboutPage';
import EmployersLandingPage from './pages/Employers/EmployersLandingPage';
import EmployerResourcesPage from './pages/Employers/EmployerResourcesPage';
import PricingPage from './pages/Pricing/PricingPage';
import ContactPage from './pages/Contact/ContactPage';
import FaqPage from './pages/Faq/FaqPage';
import TermsPage from './pages/Legal/TermsPage';
import PrivacyPage from './pages/Legal/PrivacyPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

// Page Components — Job Seeker
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';
import ProfilePage from './pages/JobSeeker/ProfilePage';
import ApplicationsPage from './pages/JobSeeker/ApplicationsPage';
import ResumeManagementPage from './pages/JobSeeker/ResumeManagementPage';
import SavedJobsPage from './pages/JobSeeker/SavedJobsPage';
import SeekerSettingsPage from './pages/JobSeeker/SeekerSettingsPage';

// Page Components — Recruiter
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import CompanyProfilePage from './pages/Recruiter/CompanyProfilePage';
import ManageJobsPage from './pages/Recruiter/ManageJobsPage';
import PostJobPage from './pages/Recruiter/PostJobPage';
import ApplicantsPage from './pages/Recruiter/ApplicantsPage';
import RecruiterAnalyticsPage from './pages/Recruiter/RecruiterAnalyticsPage';
import RecruiterSettingsPage from './pages/Recruiter/RecruiterSettingsPage';

// Page Components — Admin
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminJobsPage from './pages/Admin/AdminJobsPage';
import AdminCompaniesPage from './pages/Admin/AdminCompaniesPage';
import AdminApplicationsPage from './pages/Admin/AdminApplicationsPage';
import AdminReportsPage from './pages/Admin/AdminReportsPage';
import AdminSettingsPage from './pages/Admin/AdminSettingsPage';

// Context Provider
import { AuthProvider } from './context/AuthContext';

/**
 * RootRedirect Component
 * Redirects unauthenticated users to /login and authenticated users to role dashboard
 */
function RootRedirect() {
  const { user, isAuthenticated } = useContext(AuthContext) || {};
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const rawRole = (user.role || '').toUpperCase();
  const userRole = rawRole === 'SEEKER' ? 'JOB_SEEKER' : rawRole === 'RECRUITER' ? 'JOB_RECRUITER' : rawRole;
  const targetDashboard =
    userRole === 'ADMIN'
      ? '/admin/dashboard'
      : userRole === 'JOB_RECRUITER'
      ? '/recruiter/dashboard'
      : '/seeker/dashboard';

  return <Navigate to={targetDashboard} replace />;
}

/**
 * Main Application Component
 * Configures layout-based route groups for Public, Auth, and Dashboard routes
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- ROOT ROUTE REDIRECT --- */}
          <Route path="/" element={<RootRedirect />} />

          {/* --- PUBLIC WEBSITE ROUTES (with Public Navbar & Footer) --- */}
          <Route element={<PublicLayout />}>
            <Route path="/jobs" element={<JobListingsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:id" element={<CompanyDetailsPage />} />
            <Route path="/employers" element={<EmployersLandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/employers/resources" element={<EmployerResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/resume-analyzer" element={<Navigate to="/seeker/resume-analyzer" replace />} />
            <Route path="/resume-analyzer/result" element={<Navigate to="/seeker/resume-analyzer/result" replace />} />
          </Route>

          {/* --- AUTHENTICATION ROUTES (NO Public Navbar, NO Public Footer) --- */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* --- JOB SEEKER ROUTES (PROTECTED & UNIFIED SEEKER LAYOUT) --- */}
          <Route element={<ProtectedRoute allowedRoles={['seeker']} />}>
            <Route element={<SeekerLayout />}>
              <Route path="/seeker/dashboard" element={<JobSeekerDashboard />} />
              <Route path="/seeker/profile" element={<ProfilePage />} />
              <Route path="/seeker/jobs" element={<JobListingsPage />} />
              <Route path="/seeker/jobs/:id" element={<JobDetailsPage />} />
              <Route path="/seeker/saved-jobs" element={<SavedJobsPage />} />
              <Route path="/seeker/saved" element={<Navigate to="/seeker/saved-jobs" replace />} />
              <Route path="/seeker/applications" element={<ApplicationsPage />} />
              <Route path="/seeker/resume" element={<ResumeManagementPage />} />
              <Route path="/seeker/resume-analyzer" element={<ResumeAnalyzerPage />} />
              <Route path="/seeker/resume-analyzer/result" element={<ResumeResultPage />} />
              <Route path="/seeker/settings" element={<SeekerSettingsPage />} />
              <Route path="/seeker/*" element={<Navigate to="/seeker/dashboard" replace />} />
            </Route>
          </Route>

          {/* --- RECRUITER ROUTES (NO Public Navbar, NO Public Footer) --- */}
          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/company"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <CompanyProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <ManageJobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/new"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <PostJobPage />
              </ProtectedRoute>
            }
          />
          <Route path="/recruiter/post-job" element={<Navigate to="/recruiter/jobs/new" replace />} />
          <Route
            path="/recruiter/applicants"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <ApplicantsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/analytics"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <RecruiterAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/settings"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <RecruiterSettingsPage />
              </ProtectedRoute>
            }
          />

          {/* --- ADMIN ROUTES (NO Public Navbar, NO Public Footer) --- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminJobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminCompaniesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSettingsPage />
              </ProtectedRoute>
            }
          />

          {/* CATCH ALL WILDCARD FOR UNKNOWN PUBLIC ROUTES */}
          <Route path="*" element={<PublicLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
