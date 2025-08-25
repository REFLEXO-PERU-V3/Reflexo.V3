<<<<<<< Wilson---Registrar-paciente
import React, { createContext, useContext, useMemo } from 'react';

// Mapa simple de claves a mensajes por defecto
const defaultMessages = {
  inicioSesionExitoso: 'Inicio de sesión exitoso',
  intentoFallido: 'Ocurrió un error. Intenta nuevamente.',
  cierreSesion: 'Sesión cerrada',
  codigoVerificado: 'Código verificado',
  contraseñaCambiada: 'Contraseña cambiada',
  codigoEnviado: 'Código enviado',
};

const ToastContext = createContext({
  showToast: (key, overrideMessage) => {},
});

export function ToastProvider({ children }) {
  const showToast = (key, overrideMessage) => {
    const msg = overrideMessage || defaultMessages[key] || String(key || '');
    // Implementación mínima: alert. Puedes reemplazar por react-toastify si ya está configurado.
    try {
      // Evita alert en pruebas si no hay window
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(msg);
      } else {
        console.log('[TOAST]', msg);
      }
    } catch (e) {
      console.log('[TOAST]', msg);
    }
  };

  const value = useMemo(() => ({ showToast }), []);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  return useContext(ToastContext);
}

=======
import { createContext, useContext, useState } from 'react';
import Toast from './Toast';
import { defaultConfig as toastConfig } from './toastConfig';
import styles from './Toastify.module.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showToast = (type, backendMessage) => {
    const config = toastConfig[type];
    if (!config) return;

    const id = Date.now();

    const toastData = {
      ...config,
      id,
      message: backendMessage || config.message,
    };

    setNotifications((prev) => [...prev, toastData]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((t) => t.id !== id));
    }, toastData.duration || 5000);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.notifications}>
        {notifications.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => {}} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
>>>>>>> Ronal---Dashboard
