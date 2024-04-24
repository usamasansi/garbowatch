import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organizations: '',
    organizeAction: false,
    receiveNotifications: false,
  });

  const updateProfileData = (newData) => {
    setProfileData({ ...profileData, ...newData });
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
