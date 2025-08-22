import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Spin, Table } from 'antd';
import { Package } from '@phosphor-icons/react';
import ModeloPagination from './Pagination/Pagination.jsx';
import estilos from './Tabla.module.css';

const ModeloTable = ({
  columns,
  data,
  loading = false,
  pagination = {},
  maxHeight = '60vh',
  theme,
}) => {
  const currentPage = pagination?.current || 1;
  const pageSize = pagination?.pageSize || 10;
  const total = pagination?.total || data?.length || 0;
  const onPageChange = pagination?.onChange || (() => {});

  const containerRef = useRef(null);
  const [tableHeight, setTableHeight] = useState('auto');

  // Configuración de tema DINÁMICA
  const themeConfig = {
    token: {
      colorBgContainer: theme === 'dark' ? '#121212' : '#fff',
      colorText: theme === 'dark' ? '#e0e0e0' : '#1a1a1a',
      colorBorder: theme === 'dark' ? '#2e2e2e' : '#f0f0f0',
      colorFillAlter: theme === 'dark' ? '#1a1a1a' : '#fafafa',
      headerBg: theme === 'dark' ? '#222222' : '#232323',
      headerColor: theme === 'dark' ? '#e0e0e0' : '#fff',
      rowHoverBg: theme === 'dark' ? '#2e2e2e' : '#c8f7d8',
      controlItemBgActive: theme === 'dark' ? '#00aa55' : '#232323',
      controlItemBgHover: theme === 'dark' ? '#2e2e2e' : '#f0f0f0',
    },
    components: {
      Table: {
        colorBgContainer: theme === 'dark' ? '#121212' : '#fff',
        colorFillAlter: theme === 'dark' ? '#1a1a1a' : '#fafafa',
        colorText: theme === 'dark' ? '#e0e0e0' : '#1a1a1a',
        borderColor: theme === 'dark' ? '#2e2e2e' : '#f0f0f0',
        headerBg: theme === 'dark' ? '#222222' : '#232323',
        headerColor: theme === 'dark' ? '#e0e0e0' : '#fff',
        rowHoverBg: theme === 'dark' ? '#2e2e2e' : '#c8f7d8',
        headerSplitColor: theme === 'dark' ? '#2e2e2e' : '#f0f0f0',
      },
    },
  };

  const centeredColumns = columns.map((column) => {
    return {
      ...column,
      align: 'center',
      onCell: () => ({
        style: {
          textAlign: 'center',
          background: 'inherit',
          borderRight: 'none',
          borderBottom: 'none',
        },
      }),
      onHeaderCell: () => ({
        style: {
          textAlign: 'center',
          background: theme === 'dark' ? '#222222' : '#232323',
          borderRight: 'none',
          borderBottom: 'none',
          color: '#fff',
        },
      }),
    };
  });

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
            className={estilos.tableCustom}
            columns={centeredColumns}
            dataSource={data}
            rowKey="id"
            pagination={false}
            scroll={{ y: tableHeight, x: 'max-content' }}
            rowClassName={(record, index) => {
              if (theme === 'dark') {
                return index % 2 === 0 ? estilos.darkRowEven : estilos.darkRowOdd;
              } else {
                return index % 2 === 0 ? estilos.lightRowEven : estilos.lightRowOdd;
              }
            }}
            locale={{
              emptyText: (
                <div style={{
                  color: theme === 'dark' ? '#a0a0a0' : '#8c8c8c',
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
                  style={{ color: theme === 'dark' ? '#00aa55' : '#000000' }}
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