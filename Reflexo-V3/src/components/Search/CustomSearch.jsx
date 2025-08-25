import React from "react";
import { ConfigProvider, Input } from "antd";
import { useTheme } from "../../context/ThemeContext";

const CustomSearch = ({
  placeholder = "Buscar...",  
  onSearch,                      
  size = "large",
  width = "400px",          
  style = {},               
}) => {
  const { theme } = useTheme();

  const handleChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // 🎨 Tema dinámico para light/dark
  const inputTheme =
    theme === "dark"
      ? {
          colorTextPlaceholder: "#AAAAAA",
          colorBgContainer: "#333333",
          colorText: "#FFFFFF",
          colorBorder: "#444444",
          borderRadius: 4,
          hoverBorderColor: "#555555",
          activeBorderColor: "#00AA55",
        }
      : {
          colorTextPlaceholder: "#444444",
          colorBgContainer: "#FFFFFF",
          colorText: "#1A1A1A",
          colorBorder: "#CCCCCC",
          borderRadius: 4,
          hoverBorderColor: "#4CAF50",
          activeBorderColor: "#4CAF50",
        };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: inputTheme,
        },
      }}
    >
      <Input
        placeholder={placeholder}
        size={size}
        onChange={handleChange}
        style={{
          width,
          boxShadow: "none",
          background: theme === "light" ? "#FFFFFF" : "#333333",
          color: theme === "light" ? "#1A1A1A" : "#FFFFFF",
          ...style,
        }}
      />
    </ConfigProvider>
  );
};

export default CustomSearch; 