export const persistLocalStorage = (key, value) => {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.error('persistLocalStorage error', e);
  }
};

export const getLocalStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    try {
      return JSON.parse(raw);
    } catch (_) {
      return raw;
    }
  } catch (e) {
    console.error('getLocalStorage error', e);
    return null;
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('removeLocalStorage error', e);
  }
};
