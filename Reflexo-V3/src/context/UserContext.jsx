import React, { createContext, useContext, useMemo } from 'react';

const UserContext = createContext({
  refetchPhoto: async () => {},
  refetchProfile: async () => {},
});

export function UserProvider({ children }) {
  const value = useMemo(
    () => ({
      refetchPhoto: async () => {},
      refetchProfile: async () => {},
    }),
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

