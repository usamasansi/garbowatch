import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from './storage';

const ThemeContext = React.createContext({
  primaryColor: '#42A5F5',
  secondaryColor: '#fff',
  textColor: '#000',
  errorColor: '#f00',
});

export default function Signup() {
  const navigation = useNavigation();

  const [theme, setTheme] = useState({
    primaryColor: '#42A5F5',
    secondaryColor: '#fff',
    textColor: '#000',
    errorColor: '#f00',
  });

  const [signinState, setsigninState] = useState({
    username: '', // Set initial email
    password: '',
    errors: {},
    email: '',
    isSignedIn: false,
  });

  const handleSignin = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(signinState.email)) {
      setsigninState({
        ...signinState,
        errors: { email: 'Invalid email format' },
      });
      return;
    }

    if (signinState.password.length < 8) {
      setsigninState({
        ...signinState,
        errors: { password: 'Password must be at least 8 characters' },
      });
      return;
    }

    try {
      const response = await fetch('http://192.168.146.30:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signinState.username,
          password: signinState.password,
          email: signinState.email,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setsigninState({
          ...signinState,
          isSignedIn: true,
          errors: {},
        });
        storage.save({
          key: 'email',
          data: {
            email: signinState.email,
          },
          expires: 1000 * 3600,
        });
        navigation.navigate('profile', { username: signinState.username, email: signinState.email });
      } else {
        const errorData = await response.json();
        setsigninState({ ...signinState, errors: errorData });
      }
    } catch (error) {
      console.error('Error:', error);
      setsigninState({
        ...signinState,
        errors: { general: 'An error occurred. Please try again later.' },
      });
    }
  };

  return (
    <ThemeContext.Provider value={setTheme}>
      <View style={styles.garbowatch}>
        <LinearGradient colors={['#B9E976', '#21453F']}>
          <Text style={styles.garbowatch}>GARBOWATCH</Text>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Signup</Text>

        <View style={styles.inputContainer}>
          <Icon name="person" size={24} color="#49AC25" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={signinState.username}
            onChangeText={text =>
              setsigninState({ ...signinState, username: text })
            }
          />
        </View>

        {signinState.errors.username && (
          <Text style={styles.error}>{signinState.errors.username}</Text>
        )}

        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#49AC25" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={signinState.password}
            onChangeText={text =>
              setsigninState({ ...signinState, password: text })
            }
          />
        </View>

        {signinState.errors.password && (
          <Text style={styles.error}>{signinState.errors.password}</Text>
        )}

        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="#49AC25" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={signinState.email}
            onChangeText={text =>
              setsigninState({ ...signinState, email: text })
            }
          />
        </View>

        {signinState.errors.email && (
          <Text style={styles.error}>{signinState.errors.email}</Text>
        )}
        {signinState.errors.general && (
          <Text style={styles.error}>{signinState.errors.general}</Text>
        )}
        {signinState.isSignedIn && (
          <Text style={styles.success}>
            Signed in as {signinState.username}
          </Text>
        )}

        <TouchableOpacity>
          <LinearGradient
            colors={['#B9E976', '#21453F']}
            style={styles.gradient}>
            <Text style={styles.Button1} onPress={handleSignin}>
              SIGNUP
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            colors={['#B9E976', '#21453F']}
            style={styles.gradient2}>
            <Text style={styles.Button2}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'black',
  },
  gradient: {
    borderRadius: 50,
  },
  gradient2: {
    bottom: -10,
    borderRadius: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CBB17',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'grey',
    marginBottom: 10,
  },
  input: {
    width: 350,
    height: 45,
    paddingLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
  Button1: {
    width: 390,
    height: 30,
    margin: 10,
    borderRadius: 5,
    textAlign: 'center',
    padding: 0,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  Button2: {
    width: 390,
    height: 30,
    margin: 10,
    borderRadius: 5,
    textAlign: 'center',
    padding: 0,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  garbowatch: {
    height: 60,
    padding: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  GoogleSigninButton: {
    width: 400,
    height: 40,
    padding: 30,
  },
  contentView: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
