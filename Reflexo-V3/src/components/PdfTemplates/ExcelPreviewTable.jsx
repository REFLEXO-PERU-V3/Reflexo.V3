import React, { useState, useMemo, useCallback } from 'react';
import { Table } from 'antd';
import styles from '../../css/ExcelPreviewTable.module.css';

// ========================================
// CONFIGURACIÓN DE COLUMNAS DE LA TABLA
// ========================================
const columns = [
  {
    title: 'ID Paciente',
    dataIndex: 'patient_id',
    key: 'patient_id',
    width: 110,
    align: 'center',
    fixed: 'left', // Columna fija a la izquierda para mejor navegación
  },
  {
    title: 'Documento',
    dataIndex: 'document_number',
    key: 'document_number',
    width: 120,
    align: 'center',
    render: (text) => text || '-', // Mostrar guión si no hay documento
  },
  {
    title: 'Nombre Completo',
    key: 'full_name',
    width: 260,
    render: (_, record) =>
      `${record.name} ${record.paternal_lastname} ${record.maternal_lastname}`,
  },
  {
    title: 'Teléfono',
    dataIndex: 'primary_phone',
    key: 'primary_phone',
    width: 130,
    align: 'center',
    render: (text) => text || '-', // Mostrar guión si no hay teléfono
  },
  {
    title: 'Fecha',
    dataIndex: 'appointment_date',
    key: 'appointment_date',
    width: 120,
    align: 'center',
  },
  {
    title: 'Hora',
    dataIndex: 'appointment_hour',
    key: 'appointment_hour',
    width: 100,
    align: 'center',
    render: (text) => text || '-', // Mostrar guión si no hay hora
  },
];

// ========================================
// CONSTANTES DE CONFIGURACIÓN
// ========================================
const PAGINATION_OPTIONS = ['10', '20', '50', '100'];
const DEFAULT_PAGINATION = { current: 1, pageSize: 20 };
const TABLE_SCROLL = { x: 900, y: 500 };

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
/**
 * Tabla de vista previa de datos de Excel con paginación
 * Muestra información de citas de pacientes en formato tabular
 * 
 * @param {Object} data - Datos de las citas
 * @param {Array} data.appointments - Lista de citas
 * @param {Object} pagination - Configuración de paginación controlada (opcional)
 * @param {Function} onPaginationChange - Callback para cambios de paginación (opcional)
 */
const ExcelPreviewTable = ({
  data,
  pagination: controlledPagination,
  onPaginationChange,
}) => {
  // ========================================
  // ESTADO LOCAL Y PAGINACIÓN
  // ========================================
  const [localPagination, setLocalPagination] = useState(DEFAULT_PAGINATION);

  // Memoizar la paginación para evitar re-renders innecesarios
  const pagination = useMemo(
    () => controlledPagination || localPagination,
    [controlledPagination, localPagination]
  );

  // ========================================
  // MANEJADORES DE EVENTOS
  // ========================================
  /**
   * Maneja los cambios en la paginación
   * Si hay un callback externo, lo usa; si no, actualiza el estado local
   */
  const handleTableChange = useCallback(
    (newPagination) => {
      if (onPaginationChange) {
        onPaginationChange(newPagination);
      } else {
        setLocalPagination(newPagination);
      }
    },
    [onPaginationChange]
  );

  // ========================================
  // CONFIGURACIONES MEMOIZADAS
  // ========================================
  /**
   * Configuración de paginación con opciones predefinidas
   */
  const paginationConfig = useMemo(
    () => ({
      ...pagination,
      showSizeChanger: true,
      pageSizeOptions: PAGINATION_OPTIONS,
      position: ['bottomCenter'],
      showTotal: false,
    }),
    [pagination]
  );

  /**
   * Función para asignar clases CSS a las filas (efecto zebra)
   */
  const getRowClassName = useCallback(
    (_, idx) => (idx % 2 === 0 ? styles.rowEven : styles.rowOdd),
    []
  );

  // ========================================
  // RENDERIZADO
  // ========================================
  return (
    <div className={styles.container}>
      <Table
        // Configuración de datos
        columns={columns}
        dataSource={data?.appointments || []}
        rowKey="patient_id"
        
        // Configuración de paginación
        pagination={paginationConfig}
        onChange={handleTableChange}
        
        // Configuración de scroll y apariencia
        scroll={TABLE_SCROLL}
        bordered
        size="middle"
        rowClassName={getRowClassName}
      />
    </div>
  );
};

// Exportar componente memoizado para optimizar re-renders
export default React.memo(ExcelPreviewTable);