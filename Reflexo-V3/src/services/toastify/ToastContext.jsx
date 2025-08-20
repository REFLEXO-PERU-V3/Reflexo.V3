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

