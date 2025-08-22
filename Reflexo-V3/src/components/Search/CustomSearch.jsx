import React, { useState } from "react";
import { Input } from "antd";
import { useTheme } from "../../context/ThemeContext";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

const CustomSearch = ({
  placeholder = "Buscar...",  
  onSearch,                      
  size = "large",
  width = "400px",          
  style = {},
  loading = false,
  showLoadingIndicator = true,
}) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setInputValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  // Sufijo personalizado con indicador de carga
  const customSuffix = () => {
    if (loading && showLoadingIndicator) {
      return <LoadingOutlined style={{ color: theme === 'dark' ? '#a0a0a0' : '#666666' }} spin />;
    }
    if (inputValue) {
      return <SearchOutlined style={{ color: theme === 'dark' ? '#cccccc' : '#666666' }} />;
    }
    return <SearchOutlined style={{ color: theme === 'dark' ? '#a0a0a0' : '#666666' }} />;
  };

  return (
    <Input
      placeholder={placeholder}
      size={size}
      value={inputValue}
      onChange={handleChange}
      onClear={handleClear}
      allowClear
      suffix={customSuffix()}
      style={{
        width,
        height: '40px',
        boxShadow: "none",
        background: theme === 'dark' ? '#2d2d2d' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        transition: "all 0.3s ease",
        border: `1px solid ${theme === 'dark' ? '#444444' : '#d9d9d9'}`,
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '0 12px',
        ...style,
      }}
      className="custom-search-input"
    />
  );
};

export default CustomSearch;