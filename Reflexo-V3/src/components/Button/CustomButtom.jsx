import React from "react";
import { Button, ConfigProvider, theme } from "antd";

const CustomButton = ({ text, onClick, color = "#868D89FF" }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm, // En vez de true (más claro y mantenible)
        components: {
          Button: {
            colorPrimary: color, // Se reutiliza, puedes cambiar color por props
          },
        },
      }}
    >
      <Button 
        type="primary" 
        onClick={onClick} 
        size="large"
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default CustomButton;
