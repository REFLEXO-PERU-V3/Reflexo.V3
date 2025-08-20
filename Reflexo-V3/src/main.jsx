import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Appointments from './features/appointments/ui/appointments.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Appointments />
    </ThemeProvider>
  </StrictMode>,
);