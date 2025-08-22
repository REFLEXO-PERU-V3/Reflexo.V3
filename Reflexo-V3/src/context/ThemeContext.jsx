import React, { createContext, useContext, useState } from 'react';

// Tokens para tema oscuro
export const themeTokensDark = {
  colorBgContainer: '#222',
  colorText: '#fff',
  colorBorder: '#444',
  colorPrimary: '#4caf50',
  colorTextHeading: '#fff',
};

// Tokens para tema claro
export const themeTokensLight = {
  colorBgContainer: '#fff',
  colorText: '#333',
  colorBorder: '#e0e0e0',
  colorPrimary: '#4caf50',
  colorTextHeading: '#333',
};

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

