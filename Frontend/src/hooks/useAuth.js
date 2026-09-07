import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access Auth Context
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
