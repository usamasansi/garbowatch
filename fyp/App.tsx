import * as React from 'react';
import { View, Text } from 'react-native';
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
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator   initialRouteName='Login' screenOptions={{headerShown: false}}>
      
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="Home" component={Homescreen} />
        
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="profile_edit" component={Profile_edit} />
        <Stack.Screen name="CommunityForum" component={CommunityForm} />
        <Stack.Screen name="Report_edit" component={Report_edit} />
        <Stack.Screen name="CameraComponent" component={CameraComponent} />

        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="signingoogle" component={googlesignin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;