import React from "react";
import { useTheme } from "../../../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: "#646cff",
        color: "white",
        fontWeight: "bold",
      }}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? "Mod Claro" : "Mod Oscuro"}
    </button>
  );
};

export default ThemeToggle;

