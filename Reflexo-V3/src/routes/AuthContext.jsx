import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userRole: null,
  setUserRole: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const value = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, userRole, setUserRole }),
    [isAuthenticated, userRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

