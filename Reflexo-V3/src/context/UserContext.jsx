import { createContext, useContext, useState } from 'react';

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

  const refetchProfile = async () => {};
  const refetchPhoto = async () => {};

  return (
    <UserContext.Provider
      value={{ profile, photoUrl, loading, refetchProfile, refetchPhoto }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;

