import { UserProvider } from './context/UserContext';
import { CompanyProvider } from './context/CompanyContext';

import { ToastProvider } from './services/toastify/ToastContext';
import Router from './routes/Router';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './routes/AuthContext';


function App() {
  return (
    <ToastProvider>
      <CompanyProvider>
        <UserProvider>
          <AuthProvider>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </AuthProvider>
        </UserProvider>
      </CompanyProvider>
    </ToastProvider>
  );
}

export default App;
