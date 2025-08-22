// Lightweight compatibility helper for Ant Design v5 on React 19
// Purpose: reduce console noise by filtering the known compatibility warning.
// Note: This does NOT add official support; refer to AntD's guide for full steps.

export function installAntdReact19Compat() {
  if (typeof window === 'undefined') return;
  if (window.__ANTD_R19_COMPAT_INSTALLED__) return;
  window.__ANTD_R19_COMPAT_INSTALLED__ = true;

  const targetMsg = '[antd: compatible] antd v5 support React is 16 ~ 18';

  // Patch console.warn to filter the specific compatibility warning
  const originalWarn = console.warn?.bind(console);
  if (originalWarn) {
    console.warn = (...args) => {
      try {
        const msg = args?.[0]?.toString?.() || '';
        if (msg.includes(targetMsg)) return; // swallow only this notice
      } catch (_) {}
      originalWarn?.(...args);
    };
  }

  // Patch console.error likewise (some builds emit as error)
  const originalError = console.error?.bind(console);
  if (originalError) {
    console.error = (...args) => {
      try {
        const msg = args?.[0]?.toString?.() || '';
        if (msg.includes(targetMsg)) return; // swallow only this notice
      } catch (_) {}
      originalError?.(...args);
    };
  }
}
