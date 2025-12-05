import { Navigate } from 'react-router-dom';

// 1. Protects the Dashboard
// Usage: <PrivateRoute> <Dashboard /> </PrivateRoute>
export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('trip-access-token');
  
  if (!token) {
    // If no token, force user to Login page
    return <Navigate to="/" replace />;
  }
  
  // If token exists, render the Dashboard
  return children;
};

// 2. Redirects Logged-in Users away from Login/Signup
// Usage: <PublicRoute> <Login /> </PublicRoute>
export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('trip-access-token');

  if (token) {
    // If user is already logged in, force them to Dashboard
    return <Navigate to="/home" replace />;
  }

  // If no token, let them see the Login/Signup page
  return children;
};