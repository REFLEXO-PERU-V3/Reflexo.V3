import { createContext, useContext, useState } from 'react';

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

  const refetchCompanyInfo = async () => {};
  const refetchCompanyLogo = async () => {};

  return (
    <CompanyContext.Provider
      value={{ companyInfo, logoUrl, loading, refetchCompanyInfo, refetchCompanyLogo }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);

export default CompanyContext;

