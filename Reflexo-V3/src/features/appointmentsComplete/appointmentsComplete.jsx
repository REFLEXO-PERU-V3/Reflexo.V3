import React, { useEffect, useState } from 'react';
import estilo from './appointmentsComplete.module.css';
import ModeloTable from '../../components/Table/Tabla';
import CustomSearch from '../../components/Search/CustomSearch';
import CustomTimeFilter from '../../components/DateSearch/CustomTimeFilter';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../themeContext/themeContext';
import { useAppointmentsComplete } from "./hook/appointmentsCompleteHook";
import dayjs from 'dayjs';
import { Space, Button, ConfigProvider, theme as antdTheme } from 'antd';

export default function AppointmentsComplete() {
  const navigate = useNavigate();
  const {
    appointmentsComplete,
    loading,
    pagination,
    handlePageChange,
    setSearchTerm,
    loadPaginatedAppointmentsCompleteByDate,
  } = useAppointmentsComplete();

  const [selectDate, setSelectDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { theme } = useTheme();
  const isDark = theme === 'dark'; 

  useEffect(() => {
    loadPaginatedAppointmentsCompleteByDate(selectDate);
  }, [selectDate]);

  const columns = [
    {
      title: 'Nro Ticket',
      dataIndex: 'ticket_number',
      key: 'ticket_number',
      width: '80px',
    },
    {
      title: 'Paciente',
      key: 'patient_id',
      width: '200px',
      render: (text, record) => {
        return `${record.patient.paternal_lastname} ${record.patient.maternal_lastname} ${record.patient.name}`;
      },
    },
    {
      title: 'Terapeuta',
      key: 'therapist_id',
      width: '200px',
      render: (text, record) => {
        if (!record.therapist) return <span style={{ color: '#999' }}>Sin asignar</span>;
        return `${record.therapist.name} ${record.therapist.paternal_lastname} ${record.therapist.maternal_lastname}`;
      },
    },
    {
      title: 'Sala',
      dataIndex: 'room',
      key: 'room',
      width: '60px',
    },
    {
      title: 'Hora',
      dataIndex: 'appointment_hour',
      key: 'appointment_hour',
      width: '80px',
    },
    {
      title: 'Pago',
      dataIndex: 'payment',
      key: 'payment',
      width: '80px',
    },
    {
      title: 'Metodo Pago',
      key: 'payment_type',
      width: '120px',
      render: (_, record) => record.payment_type?.name ? record.payment_type.name : <span style={{ color: '#999' }}>Sin método</span>,
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: '150px',
      render: (_, record) => (
        <Space size="small">
          <Button
            style={{
              backgroundColor: '#00AA55',
              color: '#fff',
              border: 'none',
            }}
            onClick={() => handleAction('history', record)}
          >
            Editar Historia
          </Button>
        </Space>
      ),
    },
  ];

  const handleAction = (action, record) => {
    switch (action) {
      case 'history':
        navigate(`/Inicio/pacientes/historia/${record.patient.id}`, {
          state: { appointment: record },
        });
        break;
      default:
        break;
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const mainContainerClass = `${estilo.container} ${isDark ? estilo.darkContainer : ''}`;

  const antdTableThemeConfig = {
    components: {
      Table: {
        headerBg: isDark ? '#1a1a1a' : '#ffffff',
        headerColor: isDark ? '#e0e0e0' : 'rgba(0, 0, 0, 0.88)',
        rowHoverBg: isDark ? '#222222' : '#f5f5f5',
      },
      Pagination: {
        itemActiveBg: isDark ? '#1a1a1a' : '#f0f0f0',
        itemBg: isDark ? '#1a1a1a' : '#f0f0f0',
        colorText: isDark ? '#e0e0e0' : 'rgba(0, 0, 0, 0.88)',
        colorTextDisabled: isDark ? '#555' : 'rgba(0, 0, 0, 0.25)',
        itemLinkBg: isDark ? '#272727' : '#f0f0f0',
        colorBorder: 'none',
      },
    },
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={antdTableThemeConfig}>
      <div className={mainContainerClass}>
        <div className={estilo.searchAndFilter}>
          <CustomSearch
            placeholder="Buscar por Apellido/Nombre o DNI..."
            onSearch={handleSearch}
            width="100%"
          />
          <CustomTimeFilter
            onDateChange={setSelectDate}
            width="250px"
            showTime={false}
            format="YYYY-MM-DD"
          />
        </div>
        <ModeloTable
          columns={columns}
          data={appointmentsComplete}
          loading={loading}
          theme={theme}
          pagination={{
            current: pagination.currentPage,
            total: pagination.totalItems,
            pageSize: 50,
            onChange: handlePageChange,
          }}
        />
      </div>
    </ConfigProvider>
  );
}