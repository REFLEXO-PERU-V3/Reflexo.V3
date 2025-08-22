import { ConfigProvider, Pagination } from "antd";
import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const ModeloPagination = ({ total, current, pageSize, onChange }) => {
  const { theme } = useTheme();
  
  const handleChange = (page, size) => {
    onChange(page, size);
  };

  // Configuración del tema para la paginación
  const paginationTheme = theme === 'dark' 
    ? {
        components: {
          Pagination: {
            itemActiveBg: '#0066FF',
            itemBg: 'var(--bg-secondary)',
            colorText: 'var(--text-primary)',
            colorPrimary: '#0066FF',
            colorTextDisabled: 'var(--text-muted)',
            fontFamily: 'Arial',
            fontSize: '14px',
            colorBorder: 'var(--border-primary)'
          },
        },
      }
    : {
        components: {
          Pagination: {
            itemActiveBg: '#0066FF',
            itemBg: 'var(--bg-secondary)',
            colorText: 'var(--text-primary)',
            colorPrimary: '#0066FF',
            colorTextDisabled: 'var(--text-muted)',
            fontFamily: 'Arial',
            fontSize: '14px',
            colorBorder: 'var(--border-primary)'
          },
        },
      };

  return (
    <ConfigProvider theme={paginationTheme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'flex-end',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderRadius: '10px',
            display: 'inline-block',
            border: '1px solid var(--border-primary)',
          }}
        >
          <Pagination
            showSizeChanger={false}
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={handleChange}
          />
        </div>
        <div style={{ 
          color: 'var(--text-secondary)', 
          marginTop: '10px' 
        }}>
          {pageSize} / página
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ModeloPagination;
