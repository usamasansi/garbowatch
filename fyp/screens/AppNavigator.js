import React from 'react';
import { ProfileProvider } from './ProfileContext';
import App from '../App'; // Your main navigation component

const AppNavigator = () => {
  return (
    <ProfileProvider>
      <App />
    </ProfileProvider>
  );
};

export default AppNavigator;
