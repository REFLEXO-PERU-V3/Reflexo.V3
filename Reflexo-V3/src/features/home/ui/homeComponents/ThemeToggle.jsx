import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const toggleBackground = () => {
    setIsDark(!isDark);
  };

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
      onClick={toggleBackground}
    >
      {isDark ? "Mod Claro" : "Mod Oscuro"}
    </button>
  );
};

export default ThemeToggle;

