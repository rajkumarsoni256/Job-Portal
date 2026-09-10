import React, { createContext, useState } from 'react';

/**
 * Authentication Context Provider — 3 Role Frontend System
 * Manages demo authentication state, role validation, and localStorage persistence
 */
export const AuthContext = createContext(null);

const DEMO_USERS = {
  'seeker@jobdekho.com': {
    email: 'seeker@jobdekho.com',
    password: '123456',
    name: 'Rahul Sharma',
    role: 'JOB_SEEKER',
    redirectPath: '/seeker/dashboard',
  },
  'recruiter@jobdekho.com': {
    email: 'recruiter@jobdekho.com',
    password: '123456',
    name: 'Vikram Mehta (TechCorp)',
    role: 'JOB_RECRUITER',
    redirectPath: '/recruiter/dashboard',
  },
  'admin@jobdekho.com': {
    email: 'admin@jobdekho.com',
    password: '123456',
    name: 'System Admin',
    role: 'ADMIN',
    redirectPath: '/admin/dashboard',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('jobdekho_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password, selectedRole) => {
    const cleanEmail = email.toLowerCase().trim();
    const foundUser = DEMO_USERS[cleanEmail];

    let actualUser = null;

    if (foundUser) {
      if (foundUser.password !== password) {
        return { success: false, message: 'Invalid email or password.' };
      }
      actualUser = foundUser;
    } else {
      // Fallback for custom demo email testing
      if (!password || password.length < 6) {
        return { success: false, message: 'Invalid email or password.' };
      }
      const inferredRole = cleanEmail.includes('recruiter')
        ? 'JOB_RECRUITER'
        : cleanEmail.includes('admin')
        ? 'ADMIN'
        : 'JOB_SEEKER';
      const redirectPath =
        inferredRole === 'ADMIN'
          ? '/admin/dashboard'
          : inferredRole === 'JOB_RECRUITER'
          ? '/recruiter/dashboard'
          : '/seeker/dashboard';

      actualUser = {
        email: cleanEmail,
        password: password,
        name: cleanEmail.split('@')[0],
        role: inferredRole,
        redirectPath: redirectPath,
      };
    }

    // Role Mismatch Validation
    if (selectedRole && actualUser.role !== selectedRole) {
      if (actualUser.role === 'JOB_SEEKER') {
        return {
          success: false,
          message: 'These credentials belong to a Job Seeker. Please select the correct role.',
        };
      }
      if (actualUser.role === 'JOB_RECRUITER') {
        return {
          success: false,
          message: 'These credentials belong to a Job Recruiter. Please select the correct role.',
        };
      }
      if (actualUser.role === 'ADMIN') {
        return {
          success: false,
          message: 'These credentials belong to an Admin. Please select the correct role.',
        };
      }
    }

    // Successful Login State
    const userData = {
      loggedIn: true,
      email: actualUser.email,
      name: actualUser.name,
      role: actualUser.role,
      redirectPath: actualUser.redirectPath,
    };

    setUser(userData);
    localStorage.setItem('jobdekho_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobdekho_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user?.loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
