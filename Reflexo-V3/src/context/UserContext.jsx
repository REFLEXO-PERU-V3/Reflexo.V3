import React, { createContext, useContext, useState, useMemo } from 'react';

const UserContext = createContext({
  profile: null,
  photoUrl: null,
  loading: false,
  refetchProfile: async () => {},
  refetchPhoto: async () => {},
});

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const refetchProfile = async () => {
    // TODO: lógica para recargar perfil
  };

  const refetchPhoto = async () => {
    // TODO: lógica para recargar foto
  };

  const value = useMemo(
    () => ({
      profile,
      photoUrl,
      loading,
      refetchProfile,
      refetchPhoto,
    }),
    [profile, photoUrl, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContext;
