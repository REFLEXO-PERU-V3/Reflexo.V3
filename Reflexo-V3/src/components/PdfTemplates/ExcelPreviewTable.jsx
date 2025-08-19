import React, { useState } from 'react';
import { Table } from 'antd';
import styles from '../../css/ExcelPreviewTable.module.css';

const columns = [
  {
    title: 'ID Paciente',
    dataIndex: 'patient_id',
    key: 'patient_id',
    width: 110,
    align: 'center',
    fixed: 'left',
  },
  {
    title: 'Documento',
    dataIndex: 'document_number',
    key: 'document_number',
    width: 120,
    align: 'center',
    render: (text) => text || '-',
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
    render: (text) => text || '-',
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
    render: (text) => text || '-',
  },
];

const ExcelPreviewTable = ({
  data,
  pagination: controlledPagination,
  onPaginationChange,
}) => {
  const [localPagination, setLocalPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  // Usar paginación controlada si se pasa, si no usar local
  const pagination = controlledPagination || localPagination;
  const handleTableChange = (newPagination) => {
    if (onPaginationChange) {
      onPaginationChange(newPagination);
    } else {
      setLocalPagination(newPagination);
    }
  };

  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={data?.appointments || []}
        rowKey="patient_id"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          position: ['bottomCenter'],
          showTotal: false,
        }}
        onChange={handleTableChange}
        scroll={{ x: 900, y: 500 }}
        bordered
        size="middle"
        rowClassName={(_, idx) => (idx % 2 === 0 ? styles.rowEven : styles.rowOdd)}
      />
    </div>
  );
};

export default ExcelPreviewTable;