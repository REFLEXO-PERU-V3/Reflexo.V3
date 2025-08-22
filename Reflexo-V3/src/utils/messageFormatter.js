/**
 * Formatea mensajes de error para mostrar en notificaciones toast
 * @param {string} apiMessage - Mensaje de error de la API
 * @param {string} defaultMessage - Mensaje por defecto si no hay mensaje de API
 * @returns {string} Mensaje formateado
 */
export const formatToastMessage = (apiMessage, defaultMessage) => {
  return apiMessage || defaultMessage;
};