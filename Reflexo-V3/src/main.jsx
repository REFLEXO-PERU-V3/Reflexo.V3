import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CompanyProvider } from './context/CompanyContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import './index.css'
import { AuthProvider } from './routes/AuthContext.jsx'
import Router from './routes/Router.jsx'
import { ToastProvider } from './services/toastify/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CompanyProvider>
            <UserProvider>
              <Router />
            </UserProvider>
          </CompanyProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
