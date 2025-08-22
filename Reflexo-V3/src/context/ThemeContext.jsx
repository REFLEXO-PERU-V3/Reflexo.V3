import React, { createContext, useContext, useState, useEffect } from 'react';

// Tokens para tema oscuro
export const themeTokensDark = {
  colorBgContainer: '#0d1117',
  colorText: '#f0f6fc',
  colorBorder: '#30363d',
  colorPrimary: '#4caf50',
  colorTextHeading: '#f0f6fc',
  colorBgLayout: '#0d1117',
  colorBgElevated: '#161b22',
  colorBgSpotlight: '#21262d',
};

// Tokens para tema claro
export const themeTokensLight = {
  colorBgContainer: '#ffffff',
  colorText: '#212529',
  colorBorder: '#dee2e6',
  colorPrimary: '#4caf50',
  colorTextHeading: '#212529',
  colorBgLayout: '#ffffff',
  colorBgElevated: '#f8f9fa',
  colorBgSpotlight: '#e9ecef',
};

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Aplicar tema al cargar la aplicación
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

