import React from 'react';
import styles from './TodayAppointments.module.css';
import { CheckCircle } from '@phosphor-icons/react';
import { Empty } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const TodayAppointments = () => {
  // Datos estáticos de ejemplo
  const appointments = [
    { id: 1, name: 'Juan Pérez', service: 'Terapia Física', time: '09:00 AM' },
    { id: 2, name: 'María López', service: 'Psicología', time: '10:30 AM' },
    { id: 3, name: 'Carlos Sánchez', service: 'Nutrición', time: '01:00 PM' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <CalendarOutlined /> Citas de Hoy
      </h2>
      <div className={styles.scrollArea}>
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div key={appt.id} className={styles.appointment}>
              <div className={styles.appointmentContent}>
                <div className={styles.name}>{appt.name}</div>
                <div className={styles.details}>
                  {appt.service} - {appt.time}
                </div>
              </div>
              <div className={styles.check}>
                <CheckCircle size={22} color="#00c36a" />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <Empty
              image={<CalendarOutlined style={{ fontSize: '48px', color: '#999' }} />}
              imageStyle={{ height: 60 }}
              description={<span>No hay citas para hoy</span>}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayAppointments;
