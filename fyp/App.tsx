import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Homescreen from './screens/Homescreen';
import Report from './screens/Report';
import CommunityForm from './screens/Communityform';

import About from './screens/About';
import googlesignin from './screens/googlesignin';
import profile from './screens/Profile'
import Profile from './screens/Profile';
import profile_edit from './screens/Profile_edit'
import Profile_edit from './screens/Profile_edit';
import Report_edit from './screens/Report_edit';
import CameraComponent from './screens/CameraComponent';
import CameraComponent2 from './screens/CameraComponent2';
import ImageSlider from './screens/ImageSlider';
import CustomLoader from './screens/CustomLoader';
import Stater from './screens/stater';
// import CameraComponent2 from './screens/CameraComponent2';
const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  // Simulate some loading logic (replace with your actual logic)
  setTimeout(() => setIsLoading(false), 2000); // Change delay as needed
  if (isLoading) {
    return <CustomLoader children={''} isLoading={true}/>; // Show Loader component while loading
  }

  return (
    <NavigationContainer>
      
      <Stack.Navigator   initialRouteName='Stater' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Stater" component={Stater} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="Home" component={Homescreen} />
        
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="profile_edit" component={Profile_edit} />
        <Stack.Screen name="CommunityForum" component={CommunityForm} />
        <Stack.Screen name="Report_edit" component={Report_edit} />
        <Stack.Screen name="CameraComponent" component={CameraComponent} />
         <Stack.Screen name="CameraComponent2" component={CameraComponent2} />
         <Stack.Screen name="ImageSlider" component={ImageSlider} />

        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="signingoogle" component={googlesignin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;