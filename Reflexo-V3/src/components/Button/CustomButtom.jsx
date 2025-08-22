import React from "react";
import { Button, ConfigProvider, theme } from "antd";
import { useTheme } from "../../context/ThemeContext";

const CustomButton = ({ text, onClick, color = "#868D89FF" }) => {
  const { theme: currentTheme } = useTheme();
  
  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Button: {
            colorPrimary: color,
            colorTextLightSolid: 'var(--text-primary)',
            colorBgContainer: 'var(--bg-secondary)',
            colorBorder: 'var(--border-primary)',
          },
        },
      }}
    >
      <Button 
        type="primary" 
        onClick={onClick} 
        size="large"
        className="custom-button"
        style={{
          height: '40px',
          minWidth: '140px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default CustomButton;
