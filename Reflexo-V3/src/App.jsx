import { UserProvider } from './context/UserContext';
import { CompanyProvider } from './context/CompanyContext';
import { ToastProvider } from './services/toastify/ToastContext';
import { ThemeProvider, useTheme } from './features/themeContext/themeContext';
import AppointmentsComplete from './features/appointmentsComplete/AppointmentsComplete.jsx';
import ThemeToggleButton from './features/themeContext/ThemeToggleButton';
import './app.css';

// Un nuevo componente para aplicar la clase del tema al contenedor principal
function MainAppContent() {
  const { theme } = useTheme();
  return (
    <div className={`app-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <AppointmentsComplete />
      <ThemeToggleButton />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <CompanyProvider>
        <UserProvider>
          <ThemeProvider>
            <MainAppContent />
          </ThemeProvider>
        </UserProvider>
      </CompanyProvider>
    </ToastProvider>
  );
}

export default App;