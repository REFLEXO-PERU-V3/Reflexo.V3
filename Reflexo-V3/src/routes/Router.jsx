import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChangesPassword from '../features/auth/ui/ChangesPassword/ChangesPassword';
import FirstSession from '../features/auth/ui/FirstSession/FirstSession';
import Login from '../features/auth/ui/login';
import Error500 from '../pages/Error/Error';
import Error404 from '../pages/Error/Error404';
import View from '../pages/View';
import ProtectedRoute from './ProtectedRoute';

const Placeholder = ({ title }) => (
  <div style={{ padding: 20 }}>
    <h2 style={{ margin: 0 }}>{title}</h2>
  </div>
);

const router = createBrowserRouter([
  {
    path: '*',
    element: <Error404 />,
  },
  {
    path: '/error500',
    element: <Error500 />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/contraseñaolvidada',
    element: <h1>Contraseña olvidada</h1>,
  },
  {
    path: '/primerInicio',
    element: <FirstSession />,
  },
  {
    path: '/cambiarContraseña',
    element: <ChangesPassword />,
  },
  {
    path: '/Inicio',
    element: <ProtectedRoute allowedRoles={[1, 2]} />,
    children: [
      {
        path: '',
        element: <View />,
        children: [
          {
            index: true,
            element: <Placeholder title="Inicio" />,
          },
          {
            path: 'pacientes',
            element: <Placeholder title="Pacientes" />,
          },
          {
            path: 'pacientes/historia/:id', // Ruta independiente
            element: <Placeholder title="Historia del Paciente" />,
          },
          {
            path: 'pacientes/registrar',
            element: <Placeholder title="Registrar Paciente" />,
          },
          {
            path: 'citas',
            element: <Placeholder title="Citas" />,
          },
          {
            path: 'calendar',
            element: <Placeholder title="Calendario" />,
          },
          {
            path: 'citas/registrar',
            element: <Placeholder title="Registrar Cita" />,
          },
          {
            path: 'reportes',
            element: <Placeholder title="Reportes" />,
          },
          {
            path: 'citasCompletas',
            element: <Placeholder title="Citas Completadas" />,
          },
          {
            path: 'estadisticas',
            element: <Placeholder title="Estadísticas" />,
          },
          {
            path: 'terapeutas',
            element: <Placeholder title="Terapeutas" />,
          },
          {
            path: 'terapeutas/registrar',
            element: <Placeholder title="Registrar Terapeuta" />,
          },
          {
            path: 'configPagos',
            element: (
              <ProtectedRoute allowedRoles={[1]}>
                <Placeholder title="Configuración de Pagos" />
              </ProtectedRoute>
            ),
          },
          {
            path: 'configPerfil',
            element: <Placeholder title="Configuración de Perfil" />,
          },
          {
            path: 'configSistema',
            element: (
              <ProtectedRoute allowedRoles={[1]}>
                <Placeholder title="Configuración del Sistema" />
              </ProtectedRoute>
            ),
          },
          {
            path: 'configUser',
            element: (
              <ProtectedRoute allowedRoles={[1]}>
                <Placeholder title="Configuración de Usuarios" />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
