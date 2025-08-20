import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#333333" : "#ffffff";
  }, [isDark]);

  const toggleBackground = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#646cff",
        color: "white",
        fontWeight: "bold",
        marginTop: "2rem",
      }}
      onClick={toggleBackground}
    >
      {isDark ? "Mod Claro" : "Mod Oscuro"}
    </button>
  );
};

export default ThemeToggle;
