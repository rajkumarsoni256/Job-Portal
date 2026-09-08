import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Page Components
import HomePage from './pages/Home/HomePage';
import JobListingsPage from './pages/Jobs/JobListingsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzer/ResumeAnalyzerPage';
import ResumeResultPage from './pages/ResumeAnalyzer/ResumeResultPage';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';
import ApplicationsPage from './pages/JobSeeker/ApplicationsPage';
import ProfilePage from './pages/JobSeeker/ProfilePage';
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import PostJobPage from './pages/Recruiter/PostJobPage';
import ApplicantsPage from './pages/Recruiter/ApplicantsPage';
import CompaniesPage from './pages/Companies/CompaniesPage';
import CompanyDetailsPage from './pages/Companies/CompanyDetailsPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AboutPage from './pages/About/AboutPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

// Context Provider
import { AuthProvider } from './context/AuthContext';

/**
 * Main Application Component
 * Configures React Router for all application routes
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {/* Navigation Bar present on all pages */}
          <Navbar />

          {/* Dynamic Page Routes */}
          <main className="main-content">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<HomePage />} />

              {/* Jobs & Companies Routes */}
              <Route path="/jobs" element={<JobListingsPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/companies/:id" element={<CompanyDetailsPage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Resume Analyzer Routes */}
              <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
              <Route path="/resume-analyzer/result" element={<ResumeResultPage />} />

              {/* Dashboard & Profile Routes */}
              <Route path="/seeker/dashboard" element={<JobSeekerDashboard />} />
              <Route path="/seeker/profile" element={<ProfilePage />} />
              <Route path="/seeker/applications" element={<ApplicationsPage />} />
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter/jobs/new" element={<PostJobPage />} />
              <Route path="/recruiter/post-job" element={<PostJobPage />} />
              <Route path="/recruiter/applicants" element={<ApplicantsPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Static Info Routes */}
              <Route path="/about" element={<AboutPage />} />

              {/* Fallback 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
