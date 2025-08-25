import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarOverrides.css';
import styles from './Calendar.module.css';
import { Modal, Spin, Badge, Switch } from 'antd';
import { LoadingOutlined, CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCalendar } from '../hook/calendarHook';

moment.locale('es', {
  months:
    'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
      '_',
    ),
  weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
});

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const { events, loading, error } = useCalendar();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [date, setDate] = React.useState(new Date());
  const [view, setView] = React.useState('month');
  const [theme, setTheme] = React.useState('dark');

  React.useEffect(() => {
    // Aplicar atributo de tema para permitir overrides CSS globales
    document.body.setAttribute('data-theme', theme);
    return () => {
      document.body.removeAttribute('data-theme');
    };
  }, [theme]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const getEventColor = (statusId) => {
    switch (statusId) {
      case 1:
        return '#FFA500';
      case 2:
        return '#4CAF50';
      default:
        return '#888';
    }
  };

  const eventPropGetter = (event) => {
    const status = event.details.appointment_status_id;
    if (status === 1) {
      return { className: 'pending-event' };
    } else if (status === 2) {
      return { className: 'confirmed-event' };
    }
    return {};
  };

  const EventContent = ({ event }) => {
    const status = event.details.appointment_status_id;
    let prefix = '';
    let statusColor = '';
    
    if (status === 1) {
      prefix = '[PENDIENTE]';
      statusColor = '#FFA500';
    }
    if (status === 2) {
      prefix = '[CONFIRMADA]';
      statusColor = '#4CAF50';
    }
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: statusColor,
            boxShadow: `0 0 8px ${statusColor}`,
            flexShrink: 0
          }}
        />
        <span
          style={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '0.9em',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}
        >
          <span style={{ fontSize: '0.8em', opacity: 0.9 }}>{prefix}</span>
          <span>
            {event.details.patient_first_name
              ? `${event.details.patient_first_name}`
              : 'Sin nombre'}
          </span>
        </span>
      </div>
    );
  };

  const getAppointmentStatus = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Confirmada';
      case 3:
        return 'Completada';
      case 4:
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  const getPaymentType = (typeId) => {
    switch (typeId) {
      case 1:
        return 'Efectivo';
      case 2:
        return 'Tarjeta';
      case 3:
        return 'Transferencia';
      default:
        return 'Desconocido';
    }
  };

  const getStatusBadge = (statusId) => {
    const status = getAppointmentStatus(statusId);
    const color = statusId === 1 ? 'orange' : statusId === 2 ? 'green' : 'default';
    return <Badge status={color} text={status} />;
  };

  if (error) {
    return (
      <div className={styles.calendarContainer}>
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h2>Error al cargar eventos</h2>
            <p>{error.message}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 20px' }}>
          <Switch
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            checkedChildren="Oscuro"
            unCheckedChildren="Claro"
          />
        </div>
        <div className={styles.calendarWrapper}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <Spin 
                indicator={<LoadingOutlined style={{ fontSize: 48, color: '#1CB54A' }} spin />} 
                size="large"
              />
              <p>Cargando eventos...</p>
            </div>
          )}
          
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventPropGetter}
            components={{ event: EventContent }}
            date={date}
            onNavigate={handleNavigate}
            view={view}
            onView={handleViewChange}
            messages={{
              today: 'Hoy',
              previous: 'Anterior',
              next: 'Siguiente',
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              agenda: 'Agenda',
              date: 'Fecha',
              time: 'Hora',
              event: 'Evento',
              noEventsInRange: 'No hay citas en este rango de fechas.',
            }}
            defaultView="month"
            views={['month', 'week', 'day', 'agenda']}
            className={loading ? 'loading' : ''}
          />
        </div>
      </div>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CalendarOutlined style={{ color: '#1CB54A', fontSize: '24px' }} />
            <span>Detalles de la Cita</span>
          </div>
        }
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        maskClosable={true}
        width={700}
        centered
      >
        {selectedEvent && (
          <div style={{ color: 'black' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div style={{ 
                padding: '20px', 
                background: 'rgba(28, 181, 74, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(28, 181, 74, 0.2)'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: '#1CB54A', 
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  <UserOutlined style={{ marginRight: '8px' }} />
                  Información del Paciente
                </h3>
                <p style={{ margin: '8px 0' }}>
                  <strong>Nombre:</strong> {selectedEvent.details.patient_full_name}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Terapeuta:</strong> {selectedEvent.details.therapist_full_name}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Tipo de cita:</strong> {selectedEvent.title}
                </p>
              </div>
              
              <div style={{ 
                padding: '20px', 
                background: 'rgba(28, 181, 74, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(28, 181, 74, 0.2)'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: '#1CB54A', 
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  <ClockCircleOutlined style={{ marginRight: '8px' }} />
                  Horario y Estado
                </h3>
                <p style={{ margin: '8px 0' }}>
                  <strong>Fecha:</strong> {dayjs(selectedEvent.start).format('DD/MM/YYYY')}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Hora:</strong> {dayjs(selectedEvent.start).format('HH:mm')} - {dayjs(selectedEvent.end).format('HH:mm')}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Estado:</strong> {getStatusBadge(selectedEvent.details.appointment_status_id)}
                </p>
              </div>
            </div>

            <div style={{ 
              padding: '20px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                color: '#1CB54A', 
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                Detalles Médicos
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ margin: '8px 0' }}>
                    <strong>Diagnóstico:</strong>
                  </p>
                  <p style={{ 
                    margin: '8px 0', 
                    padding: '8px 12px', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '6px',
                    fontStyle: 'italic'
                  }}>
                    {selectedEvent.details.diagnosis || 'No especificado'}
                  </p>
                </div>
                <div>
                  <p style={{ margin: '8px 0' }}>
                    <strong>Malestar:</strong>
                  </p>
                  <p style={{ 
                    margin: '8px 0', 
                    padding: '8px 12px', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '6px',
                    fontStyle: 'italic'
                  }}>
                    {selectedEvent.details.ailments || 'No especificado'}
                  </p>
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <p style={{ margin: '8px 0' }}>
                  <strong>Observaciones:</strong>
                </p>
                <p style={{ 
                  margin: '8px 0', 
                  padding: '12px', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '6px',
                  fontStyle: 'italic',
                  minHeight: '60px'
                }}>
                  {selectedEvent.details.observation || 'Ninguna observación registrada'}
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '24px',
              marginTop: '24px'
            }}>
              <div style={{ 
                padding: '16px', 
                background: 'rgba(28, 181, 74, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(28, 181, 74, 0.2)'
              }}>
                <p style={{ margin: '8px 0' }}>
                  <strong>Tipo de pago:</strong> {selectedEvent.details.payment_type_name}
                </p>
              </div>
              <div style={{ 
                padding: '16px', 
                background: 'rgba(28, 181, 74, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(28, 181, 74, 0.2)'
              }}>
                <p style={{ margin: '8px 0' }}>
                  <strong>Ticket:</strong> {selectedEvent.details.ticket_number}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Calendario;