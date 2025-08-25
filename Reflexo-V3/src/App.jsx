import React from 'react';
import NewAppointment from './features/appointments/ui/RegisterAppointment/NewAppointment.jsx';
import 'antd/dist/reset.css'; // Importa estilos base de Ant Design para que se vea correcto

const App = () => {
  return (
    <div>
      <NewAppointment />
    </div>
  );
};

export default App;
