import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Signup from './Signup';
import LinearGradient from 'react-native-linear-gradient';

import {Link, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const ThemeContext = React.createContext({
  primaryColor: '#42A5F5',
  secondaryColor: '#fff',
  textColor: '#000',
  errorColor: '#f00',
});

const Login = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState({
    primaryColor: '#42A5F5',
    secondaryColor: '#fff',
    textColor: '#000',
    errorColor: '#f00',
  });

  const [loginState, setLoginState] = useState({
    username: 'example@example.com', // Set initial email
    password: '123', // Set initial password
    errors: {},
    isLoggedIn: false,
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.100.7:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginState.username,
          password: loginState.password,
        }),
      });

      if (response.ok) {
        // Handle successful login
        const userData = await response.json(); // Assuming the response contains user data including username
        setLoginState({...loginState, isLoggedIn: true}); // Update the state to indicate the user is logged in
        navigation.navigate('Home', {username: userData.username}); // Pass username to Profile
      } else {
        // Handle login errors
        const errorData = await response.json();
        console.log(errorData); // Check the error response from the server
        // ... Update state or show error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors
    }
    if (response.ok) {
      const userData = await response.json();
      navigation.navigate('profile', {username: userData.username}); // Pass username to Profile
    } else {
      // Handle login errors
    }
  };
  return (
    <ThemeContext.Provider value={theme}>
      <View style={styles.garbowatch}>
        <LinearGradient colors={['#B9E976', '#21453F']}>
          <Text style={styles.garbowatch}>GARBOWATCH</Text>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>LOG IN</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={loginState.username}
          onChangeText={text => setLoginState({...loginState, username: text})}
        />

        {loginState.errors.username && (
          <Text style={styles.error}>{loginState.errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={loginState.password}
          onChangeText={text => setLoginState({...loginState, password: text})}
        />

        {loginState.errors.password && (
          <Text style={styles.error}>{loginState.errors.password}</Text>
        )}

        {loginState.errors.login && (
          <Text style={styles.error}>{loginState.errors.login}</Text>
        )}
        <LinearGradient colors={['#B9E976', '#21453F']} style={styles.gradient}>
          <Text style={styles.Button2} onPress={handleLogin}>
            LOGIN
          </Text>
        </LinearGradient>
        {loginState.isLoggedIn && (
          <Text style={styles.success}>
            Logged in as {loginState.username}{' '}
          </Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <LinearGradient
            colors={['#B9E976', '#21453F']}
            style={styles.gradient2}>
            <Text style={styles.Button}>SIGN UP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View></View>
    </ThemeContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#49AC25',
  },
  input: {
    width: 400,
    height: 40,
    borderWidth: 0,
    borderColor: 'grey',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 2,
    fontSize: 16,
    color: 'black',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
  Button: {
    width: 390,
    height: 30,
    margin: 10,
    borderRadius: 5,
    textAlign: 'center',
    padding: 3,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  gradient: {
    borderRadius: 50,
  },
  gradient2: {
    bottom: -12,
    borderRadius: 50,
  },
  Button2: {
    width: 390,
    height: 30,
    margin: 10,
    borderRadius: 5,
    textAlign: 'center',
    padding: 3,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  garbowatch: {
    height: 55,
    padding: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  contentView: {
    flex: 1, // Make the content view take up the remaining space
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#001F3F',
    justifyContent: 'center',
  },
});

export default Login;