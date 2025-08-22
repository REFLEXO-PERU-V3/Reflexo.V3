import React from 'react';
import { useTheme } from './themeContext.jsx';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000,
    fontSize: '12px',
    boxShadow: '0 1px 2px #35c567ff',
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#121212',
    color: theme === 'light' ? '#121212' : '#fff',
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      {theme === 'light' ? 'oscuro 🌙' : 'claro ☀️'}
    </button>
  );
};

export default ThemeToggleButton;