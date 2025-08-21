import { get, post, patch } from '../../../services/API/MethodsGeneral';
import { getPatients, searchPatients } from '../../patients/service/patientsService';

// Reexportar funciones de pacientes para mantener compatibilidad con appointmentsHook
export { getPatients, searchPatients };

// Obtener citas paginadas por fecha
export const getPaginatedAppointmentsByDate = async (
  date,
  perPage = 10,
  page = 1,
  options = {}
) => {
  const res = await get(
    `appointments?date=${encodeURIComponent(date)}&per_page=${perPage}&page=${page}`,
    options
  );

  // Normalizar respuesta
  const raw = res.data || {};
  const data = Array.isArray(raw)
    ? raw
    : Array.isArray(raw.data)
    ? raw.data
    : Array.isArray(raw.items)
    ? raw.items
    : [];

  return {
    data,
    total: raw.total || data.length || 0,
  };
};

// Buscar citas por término
export const searchAppointments = async (term, options = {}) => {
  const res = await get(
    `appointments/search?search=${encodeURIComponent(term)}&per_page=100`,
    options
  );

  const raw = res.data || {};
  const data = Array.isArray(raw)
    ? raw
    : Array.isArray(raw.data)
    ? raw.data
    : Array.isArray(raw.items)
    ? raw.items
    : [];

  return {
    data,
    total: raw.total || data.length || 0,
  };
};

// Crear nueva cita
export const createAppointment = async (payload) => {
  const res = await post('appointments', payload);
  return res.data ?? res;
};

// Obtener detalles de una cita por ID
export const getAppointmentById = async (id) => {
  const res = await get(`appointments/${id}`);
  return res.data ?? res;
};

// Actualizar una cita existente
export const updateAppointment = async (id, payload) => {
  const res = await patch(`appointments/${id}`, payload);
  return res.data ?? res;
};
