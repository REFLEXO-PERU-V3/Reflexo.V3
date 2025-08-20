import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import CustomButton from '../../../components/Button/CustomButtom';
import CustomTimeFilter from '../../../components/DateSearch/CustomTimeFilter';
import CustomSearch from '../../../components/Search/CustomSearch';
import ModeloTable from '../../../components/Table/Tabla';
import styles from './Appointments.module.css';
import { useTheme } from '../../../context/ThemeContext.jsx';

// Datos de ejemplo para visualizar el diseño sin backend
const mockAppointments = [
  {
    id: 1,
    ticket_number: 101,
    patient: {
      paternal_lastname: 'Pérez',
      maternal_lastname: 'García',
      name: 'María',
      document_number: '12345678',
    },
    room: 'A1',
    appointment_hour: '10:30',
    payment: 50,
    payment_type: { name: 'EFECTIVO' },
    appointment_date: dayjs().format('YYYY-MM-DD'),
  },
  {
    id: 2,
    ticket_number: 102,
    patient: {
      paternal_lastname: 'López',
      maternal_lastname: 'Ruiz',
      name: 'Juan',
      document_number: '87654321',
    },
    room: 'B2',
    appointment_hour: '11:00',
    payment: 60,
    payment_type: { name: 'TARJETA' },
    appointment_date: dayjs().format('YYYY-MM-DD'),
  },
];

export default function Appointments() {
  const { theme, toggleTheme } = useTheme();
  const [selectDate, setSelectDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [appointments, setAppointments] = useState(mockAppointments);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: mockAppointments.length,
  });

  const handlePageChange = (page) =>
    setPagination((p) => ({ ...p, currentPage: page }));

  const setSearchTerm = (value) => {
    const term = value.trim().toLowerCase();
    if (!term) {
      setAppointments(mockAppointments);
      setPagination((p) => ({ ...p, totalItems: mockAppointments.length }));
      return;
    }
    const filtered = mockAppointments.filter((r) => {
      const p = r.patient || {};
      const full = `${p.paternal_lastname || ''} ${p.maternal_lastname || ''} ${p.name || ''}`.toLowerCase();
      return (
        full.includes(term) || (p.document_number || '').toLowerCase().includes(term)
      );
    });
    setAppointments(filtered);
    setPagination((p) => ({ ...p, currentPage: 1, totalItems: filtered.length }));
  };

  const loadPaginatedAppointmentsByDate = () => {
    // En modo demo, si se cambia la fecha solo reseteamos a los mocks
    setAppointments(mockAppointments);
    setPagination((p) => ({ ...p, currentPage: 1, totalItems: mockAppointments.length }));
  };

  // Al cambiar la fecha se resetea (demo)
  const onDateChange = (dateStr) => {
    setSelectDate(dateStr);
    loadPaginatedAppointmentsByDate();
  };

  const columns = [
    {
      title: 'Nro Ticket',
      dataIndex: 'ticket_number',
      key: 'ticket_number',
      width: '70px',
    },
    {
      title: 'Paciente',
      key: 'patient_id',
      width: '180px',
      render: (_, record) => {
        const patient = record?.patient;
        if (!patient) return 'Paciente no disponible';
        return `${patient.paternal_lastname || ''} ${patient.maternal_lastname || ''} ${patient.name || ''}`.trim();
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
      width: '70px',
    },
    {
      title: 'Pago',
      dataIndex: 'payment',
      key: 'payment',
      width: '70px',
    },
    {
      title: 'Metodo Pago',
      key: 'payment_type',
      width: '100px',
      render: (_, record) => record.payment_type?.name || 'Sin método',
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: '220px',
      render: () => (
        <Space size="small">
          <Button style={{ backgroundColor: '#555555', color: '#fff', border: 'none' }} disabled>
            Editar
          </Button>
          <Button style={{ backgroundColor: '#00AA55', color: '#fff', border: 'none' }} disabled>
            Rellenar Historia
          </Button>
          <Button style={{ backgroundColor: '#0066FF', color: '#fff', border: 'none' }} disabled>
            Imprimir
          </Button>
          <Button style={{ backgroundColor: '#69276F', color: '#fff', border: 'none' }} disabled>
            Imprimir Boleta
          </Button>
          <Button style={{ backgroundColor: '#FF3333', color: '#fff', border: 'none' }} disabled>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const handleButton = () => {
    // Demo: sin navegación
    console.log('Registrar Cita (demo)');
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className={`${styles.container} appointmentsMainContainer`}>
      <div className={styles.toolbar}>
        <CustomButton text="Registrar Cita" onClick={handleButton} />

        {/* El buscador ocupa el espacio central */}
        <div className={styles.searchGrow}>
          <CustomSearch
            placeholder="Buscar por Apellido/Nombre o DNI..."
            onSearch={handleSearch}
            width="100%"
          />
        </div>

        <CustomTimeFilter
          onDateChange={onDateChange}
          width="250px"
          showTime={false}
          format="YYYY-MM-DD"
        />
      </div>

      <div className={styles.tableWrap}>
        <ModeloTable
          columns={columns}
          data={appointments}
          loading={loading}
          pagination={{
            current: pagination.currentPage,
            total: pagination.totalItems,
            pageSize: 50,
            onChange: handlePageChange,
          }}
        />
      </div>

      {/* Botón fijo para alternar tema con íconos */}
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
