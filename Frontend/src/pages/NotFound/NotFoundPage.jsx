import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Briefcase, FileQuestion } from 'lucide-react';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="notfound-page-container">
      <div className="notfound-card">
        <div className="notfound-code-badge">404</div>
        <div style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <FileQuestion size={24} />
          <h1 className="notfound-title">Page Not Found</h1>
        </div>

        <p className="notfound-desc">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn-nav btn-primary">
            <Home size={16} style={{ marginRight: 6 }} /> Go Home
          </Link>

          <Link to="/jobs" className="btn-nav btn-outline">
            <Briefcase size={16} style={{ marginRight: 6 }} /> Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
