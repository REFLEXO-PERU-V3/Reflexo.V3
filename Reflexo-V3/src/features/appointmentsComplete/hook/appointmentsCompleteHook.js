// appointmentsCompleteHook.js (simulado)
import { useState } from "react";
import dayjs from "dayjs";

export const useAppointmentsComplete = () => {
  const [appointmentsComplete, setAppointmentsComplete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalItems: 2 });

  const loadPaginatedAppointmentsCompleteByDate = (date) => {
    setLoading(true);

    // Simular datos
    const mockData = [
      {
        ticket_number: "001",
        patient: { id: 1, name: "Juan", paternal_lastname: "Perez", maternal_lastname: "Lopez" },
        therapist: { name: "Ana", paternal_lastname: "Gomez", maternal_lastname: "Diaz" },
        room: "A1",
        appointment_hour: "10:00",
        payment: 50,
        payment_type: { name: "Tarjeta" },
      },
      {
        ticket_number: "002",
        patient: { id: 2, name: "Maria", paternal_lastname: "Rodriguez", maternal_lastname: "Sanchez" },
        therapist: null,
        room: "B2",
        appointment_hour: "11:00",
        payment: 30,
        payment_type: null,
      },
    ];

    setTimeout(() => {
      setAppointmentsComplete(mockData);
      setLoading(false);
    }, 500); // Simula delay de red
  };

  const setSearchTerm = (value) => {
    // Puedes filtrar mockData según value si quieres
    console.log("Buscar:", value);
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  return { appointmentsComplete, loading, pagination, loadPaginatedAppointmentsCompleteByDate, setSearchTerm, handlePageChange };
};
