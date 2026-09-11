import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

/**
 * ProtectedRoute Component
 * Prevents unauthorized access to dashboard routes based on frontend auth state & role
 */
function ProtectedRoute({ allowedRoles = [], children }) {
  const { user } = useContext(AuthContext) || {};
  const location = useLocation();

  if (!user || !user.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const rawUserRole = (user.role || '').toUpperCase();
  const userRole =
    rawUserRole === 'SEEKER' ? 'JOB_SEEKER' : rawUserRole === 'RECRUITER' ? 'JOB_RECRUITER' : rawUserRole;

  const normalizedAllowed = allowedRoles.map((r) => {
    const up = r.toUpperCase();
    return up === 'SEEKER' ? 'JOB_SEEKER' : up === 'RECRUITER' ? 'JOB_RECRUITER' : up;
  });

  if (normalizedAllowed.length > 0 && !normalizedAllowed.includes(userRole)) {
    // Redirect to user's own role dashboard if trying to access unauthorized role area
    const roleRedirect =
      userRole === 'ADMIN'
        ? '/admin/dashboard'
        : userRole === 'JOB_RECRUITER'
        ? '/recruiter/dashboard'
        : '/seeker/dashboard';

    return <Navigate to={roleRedirect} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
