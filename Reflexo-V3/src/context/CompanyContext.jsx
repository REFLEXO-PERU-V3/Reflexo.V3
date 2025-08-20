import React, { createContext, useContext, useMemo } from 'react';

const CompanyContext = createContext({
  refetchCompanyLogo: async () => {},
  refetchCompanyInfo: async () => {},
});

export function CompanyProvider({ children }) {
  const value = useMemo(
    () => ({
      refetchCompanyLogo: async () => {},
      refetchCompanyInfo: async () => {},
    }),
    []
  );

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}

