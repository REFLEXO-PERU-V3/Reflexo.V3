// Utilidades seguras para localStorage
// Claves usadas: 'token', 'user_id', 'user_role', 'name'

export const persistLocalStorage = (key, value) => {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch (_) {
    // Ignorar errores de serialización/permiso
  }
};

export const getLocalStorage = (key, fallback = null) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item == null) return fallback;
    try {
      return JSON.parse(item);
    } catch (_) {
      return item;
    }
  } catch (_) {
    return fallback;
  }
};

export const removeLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (_) {
    // Ignorar errores
  }
};

export default {
  persistLocalStorage,
  getLocalStorage,
  removeLocalStorage,
};
