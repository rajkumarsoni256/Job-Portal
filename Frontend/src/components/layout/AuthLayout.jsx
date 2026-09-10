import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * AuthLayout Component
 * Wraps authentication pages without public Navbar or Footer
 */
function AuthLayout() {
  return (
    <div className="auth-layout-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
