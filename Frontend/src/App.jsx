import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/navbar/Navbar';

// Page Components
import HomePage from './pages/Home/HomePage';
import JobListingsPage from './pages/Jobs/JobListingsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzer/ResumeAnalyzerPage';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

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

              {/* Jobs Routes */}
              <Route path="/jobs" element={<JobListingsPage />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Resume Analyzer Route */}
              <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />

              {/* Dashboard Routes */}
              <Route path="/seeker/dashboard" element={<JobSeekerDashboard />} />
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Fallback 404 Route */}
              <Route
                path="*"
                element={
                  <div className="page-container text-center">
                    <h2>404 - Page Not Found</h2>
                    <p>The page you are looking for does not exist.</p>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
