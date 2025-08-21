import { CompanyProvider } from './context/CompanyContext';
import { UserProvider } from './context/UserContext';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './routes/AuthContext';
import Router from './routes/Router';
import { ToastProvider } from './services/toastify/ToastContext';


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