// Implementación mínima de partículas para la pantalla de Login.
// Devuelve una función de cleanup para que el efecto en login.jsx pueda desmontarse sin errores.

export function initializeParticles() {
  // Si existe el contenedor, podríamos agregar una animación simple opcional.
  const container = typeof document !== 'undefined' ? document.getElementById('particles-js') : null;

  let rafId = null;
  let frame = 0;

  const animate = () => {
    frame += 1;
    // Efecto mínimo: cambiar sutilmente el background-position del contenedor si existe
    if (container) {
      container.style.backgroundPosition = `${(frame % 100) / 2}% ${(frame % 100) / 2}%`;
    }
    rafId = requestAnimationFrame(animate);
  };

  try {
    if (container && typeof requestAnimationFrame !== 'undefined') {
      rafId = requestAnimationFrame(animate);
    }
  } catch (_) {
    // Silencio: si requestAnimationFrame no está disponible, simplemente no animamos
  }

  // Retornar cleanup para detener animación y limpiar estilos
  return () => {
    try {
      if (rafId) cancelAnimationFrame(rafId);
      if (container) container.style.backgroundPosition = '';
    } catch (_) {
      // no-op
    }
  };
}

