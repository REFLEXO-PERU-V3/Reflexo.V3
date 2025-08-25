import { useState, useEffect } from 'react';

// Datos de prueba para el calendario
const mockEvents = [
  {
    id: 1,
    title: 'Terapia Física',
    start: new Date(2024, 11, 15, 10, 0), // 15 de diciembre, 10:00 AM
    end: new Date(2024, 11, 15, 11, 0),   // 15 de diciembre, 11:00 AM
    details: {
      patient_full_name: 'María González',
      therapist_full_name: 'Dr. Carlos Rodríguez',
      patient_first_name: 'María',
      appointment_status_id: 2, // Confirmada
      diagnosis: 'Dolor lumbar crónico',
      ailments: 'Dolor en la espalda baja',
      observation: 'Paciente responde bien al tratamiento. Continuar con ejercicios de fortalecimiento.',
      payment_type_name: 'Tarjeta',
      ticket_number: 'TKT-001234'
    }
  },
  {
    id: 2,
    title: 'Consulta General',
    start: new Date(2024, 11, 15, 14, 30), // 15 de diciembre, 2:30 PM
    end: new Date(2024, 11, 15, 15, 30),   // 15 de diciembre, 3:30 PM
    details: {
      patient_full_name: 'Juan Pérez',
      therapist_full_name: 'Dra. Ana Martínez',
      patient_first_name: 'Juan',
      appointment_status_id: 1, // Pendiente
      diagnosis: 'Tendinitis en hombro',
      ailments: 'Dolor al levantar el brazo',
      observation: 'Primera consulta. Evaluar rango de movimiento.',
      payment_type_name: 'Efectivo',
      ticket_number: 'TKT-001235'
    }
  },
  {
    id: 3,
    title: 'Rehabilitación',
    start: new Date(2024, 11, 16, 9, 0), // 16 de diciembre, 9:00 AM
    end: new Date(2024, 11, 16, 10, 30), // 16 de diciembre, 10:30 AM
    details: {
      patient_full_name: 'Carmen López',
      therapist_full_name: 'Dr. Roberto Silva',
      patient_first_name: 'Carmen',
      appointment_status_id: 2, // Confirmada
      diagnosis: 'Fractura de muñeca',
      ailments: 'Rigidez en la muñeca derecha',
      observation: 'Progreso excelente. Aumentar intensidad de ejercicios.',
      payment_type_name: 'Transferencia',
      ticket_number: 'TKT-001236'
    }
  },
  {
    id: 4,
    title: 'Evaluación',
    start: new Date(2024, 11, 16, 16, 0), // 16 de diciembre, 4:00 PM
    end: new Date(2024, 11, 16, 17, 0),   // 16 de diciembre, 5:00 PM
    details: {
      patient_full_name: 'Roberto Díaz',
      therapist_full_name: 'Dra. Patricia Vega',
      patient_first_name: 'Roberto',
      appointment_status_id: 1, // Pendiente
      diagnosis: 'Esguince de tobillo',
      ailments: 'Hinchazón y dolor al caminar',
      observation: 'Evaluación inicial. Determinar gravedad del esguince.',
      payment_type_name: 'Tarjeta',
      ticket_number: 'TKT-001237'
    }
  },
  {
    id: 5,
    title: 'Terapia Manual',
    start: new Date(2024, 11, 17, 11, 0), // 17 de diciembre, 11:00 AM
    end: new Date(2024, 11, 17, 12, 0),   // 17 de diciembre, 12:00 PM
    details: {
      patient_full_name: 'Laura Fernández',
      therapist_full_name: 'Dr. Miguel Torres',
      patient_first_name: 'Laura',
      appointment_status_id: 2, // Confirmada
      diagnosis: 'Tensión muscular cervical',
      ailments: 'Dolor de cuello y hombros',
      observation: 'Sesión de masaje terapéutico. Paciente reporta mejoría.',
      payment_type_name: 'Efectivo',
      ticket_number: 'TKT-001238'
    }
  }
];

export const useCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular carga de datos
    const loadEvents = async () => {
      try {
        setLoading(true);
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(mockEvents);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading, error };
};