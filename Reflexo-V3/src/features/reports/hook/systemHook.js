// Local shim hooks for reports feature until real system hooks are available
// TODO: Replace with real implementations when configuration system is integrated
import { useMemo } from 'react';

export function useCompanyInfo() {
  // Provide stable shape expected by reports.jsx
  return useMemo(
    () => ({ companyInfo: null, loadingInfo: false, errorInfo: null }),
    [],
  );
}

export function useSystemHook() {
  // Provide logo URL contract used by PDF templates
  return useMemo(
    () => ({ logoUrl: null, loading: false, error: null }),
    [],
  );
}
