// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Style from './ProtectedRoute.module.css';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, authChecked, userRole } = useAuth();

  // Mientras se verifica la autenticación
  if (!authChecked) {
    return (
      <div className={Style.container}>
        <div className={Style.loader}></div>
      </div>
    );
  }

  // Si no está autenticado → redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Esperar a que se cargue el rol
  if (allowedRoles && userRole === null) {
    return (
      <div className={Style.container}>
        <div className={Style.loader}></div>
      </div>
    );
  }

  // Si el rol no está permitido → redirigir a Inicio
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/Inicio" replace />;
  }

  // Renderiza los hijos si existen, si no, usa el <Outlet>
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
