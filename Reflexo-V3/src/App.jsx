import React from 'react';
import 'antd/dist/reset.css'; // Importa estilos base de Ant Design
import EditAppointment from './features/appointments/ui/EditAppointment/EditAppointment.jsx';
import { ToastProvider } from './services/toastify/ToastContext.jsx';

const App = () => {
  console.log('[App] Render');
  return (
    <ToastProvider>
      <div>
        {/* Muestra la pantalla de edición al iniciar */}
        <div style={{ padding: 8, color: '#333' }}>App cargada</div>
        <EditAppointment />
      </div>
    </ToastProvider>
  );
};

export default App;