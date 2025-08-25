import React, { createContext, useContext, useState, useMemo } from 'react';

const CompanyContext = createContext({
  companyInfo: null,
  logoUrl: null,
  loading: false,
  refetchCompanyInfo: async () => {},
  refetchCompanyLogo: async () => {},
});

export const CompanyProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const refetchCompanyInfo = async () => {
    // TODO: lógica para recargar la info de la empresa
  };

  const refetchCompanyLogo = async () => {
    // TODO: lógica para recargar el logo de la empresa
  };

  const value = useMemo(
    () => ({
      companyInfo,
      logoUrl,
      loading,
      refetchCompanyInfo,
      refetchCompanyLogo,
    }),
    [companyInfo, logoUrl, loading]
  );

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);

export default CompanyContext;
