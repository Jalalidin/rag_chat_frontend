import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}