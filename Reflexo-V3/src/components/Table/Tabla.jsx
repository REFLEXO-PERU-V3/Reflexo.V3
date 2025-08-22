import { Package } from '@phosphor-icons/react';
import { ConfigProvider, Spin, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { themeTokensDark, themeTokensLight, useTheme } from '../../context/ThemeContext';
import ModeloPagination from './Pagination/Pagination.jsx';
import estilos from './Tabla.module.css';

const ModeloTable = ({ 
  columns, 
  data, 
  loading = false, 
  pagination = {},
  maxHeight = '60vh',
}) => {
  const currentPage = pagination?.current || 1;
  const pageSize = pagination?.pageSize || 10;
  const total = pagination?.total || data?.length || 0;
  const onPageChange = pagination?.onChange || (() => {});

  const containerRef = useRef(null);
  const [tableHeight, setTableHeight] = useState('auto');
  const { theme } = useTheme();

  // Configuración de tema dinámico
  const themeConfig = theme === 'dark'
    ? {
        ...themeTokensDark,
        token: {
          ...themeTokensDark,
          colorBgContainer: 'var(--bg-primary)',
          colorText: 'var(--text-primary)',
          colorBorder: 'var(--border-primary)',
          colorFillAlter: 'var(--bg-secondary)',
          headerBg: 'var(--bg-quaternary)',
          headerColor: 'var(--text-primary)',
          rowHoverBg: 'var(--bg-tertiary)',
        },
        components: {
          Table: {
            colorBgContainer: 'var(--bg-primary)',
            colorFillAlter: 'var(--bg-secondary)',
            colorText: 'var(--text-primary)',
            borderColor: 'var(--border-primary)',
            headerBg: 'var(--bg-quaternary)',
            headerColor: 'var(--text-primary)',
            rowHoverBg: 'var(--bg-tertiary)',
          },
        },
      }
    : {
        ...themeTokensLight,
        token: {
          ...themeTokensLight,
          colorBgContainer: 'var(--bg-primary)',
          colorText: 'var(--text-primary)',
          colorBorder: 'var(--border-primary)',
          colorFillAlter: 'var(--bg-secondary)',
          headerBg: 'var(--bg-quaternary)',
          headerColor: 'var(--text-primary)',
          rowHoverBg: 'var(--bg-tertiary)',
        },
        components: {
          Table: {
            colorBgContainer: 'var(--bg-primary)',
            colorFillAlter: 'var(--bg-secondary)',
            colorText: 'var(--text-primary)',
            borderColor: 'var(--border-primary)',
            headerBg: 'var(--bg-quaternary)',
            headerColor: 'var(--text-primary)',
            rowHoverBg: 'var(--bg-tertiary)',
          },
        },
      };

  // Centrar columnas con estilos que respetan el tema
  const centeredColumns = columns.map((column, index, arr) => {
    const isLast = index === arr.length - 1;
    return {
      ...column,
      align: 'center',
      onCell: () => ({
        style: {
          textAlign: 'center',
          background: 'inherit',
          borderRight: isLast ? 'none' : `1px solid var(--border-primary)`,
          borderBottom: 'none',
        },
      }),
      onHeaderCell: () => ({
        style: {
          textAlign: 'center',
          background: 'var(--bg-quaternary)',
          borderRight: isLast ? 'none' : `1px solid var(--border-primary)`,
          borderBottom: 'none',
          color: 'var(--text-primary)',
        },
      }),
    };
  });

  // Cálculo de altura automática
  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceFromTop = containerRect.top;
      const marginBottom = 32;
      const calculatedHeight = windowHeight - spaceFromTop - marginBottom;
      
      const finalHeight = typeof maxHeight === 'string' && maxHeight.endsWith('vh') 
        ? Math.min(calculatedHeight, (windowHeight * parseInt(maxHeight)) / 100)
        : Math.min(calculatedHeight, maxHeight);
      
      setTableHeight(`${finalHeight}px`);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [maxHeight]);

  // Establecer el atributo data-theme en el documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ConfigProvider theme={themeConfig}>
      <div
        ref={containerRef}
        style={{
          minHeight: '300px',
          marginTop: '15px',
        }}
      >
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Table
            className={`${estilos.tableCustom} custom-table`}
            columns={centeredColumns}
            dataSource={data}
            rowKey="id"
            pagination={false}
            scroll={{ y: tableHeight, x: 'max-content' }}
            rowClassName={(record, index) => index % 2 === 0 ? 'row-light' : 'row-dark'}
            locale={{
              emptyText: (
                <div style={{
                  color: 'var(--text-tertiary)',
                  padding: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Package size={40} />
                  <span>No hay datos disponibles</span>
                </div>
              )
            }}
            loading={{
              spinning: loading,
              indicator: (
                <Spin 
                  size="large" 
                  style={{ color: '#ffffff' }}
                  tip="Cargando..."
                />
              )
            }}
          />
        </div>

        <ModeloPagination
          total={total}
          current={currentPage}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </ConfigProvider>
  );
};

export default ModeloTable;