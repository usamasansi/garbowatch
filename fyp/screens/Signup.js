import React from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';

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
    username: 'example@example.com', // Set initial email
    password: '123',
    errors: {},
    email: 'example@example.com',
    issignIn: false,
  });
  const handleSignin = async () => {
    try {
      const response = await fetch('http://172.29.32.1:3000/api/signup', {
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
        const userData = await response.json(); // Assuming the response contains user data including username
        setsigninState({
          ...signinState,
          isLoggedIn: true,
          username: userData.username,
        }); // Update the state with the username
        navigation.navigate('profile', {username: userData.username}); // Pass username to Profile
      } else {
        const errorData = await response.json();
        setsigninState({...signinState, errors: errorData});
      }
    } catch (error) {
      console.error('Error:', error);
    }
    if (response.ok) {
      const userData = await response.json();
      navigation.navigate('profile', {username: userData.username}); // Pass username to Profile
    } else {
      // Handle signup errors
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

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={signinState.username}
          onChangeText={text =>
            setsigninState({...signinState, username: text})
          }
        />

        {signinState.errors.username && (
          <Text style={styles.error}>{signinState.errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={signinState.password}
          onChangeText={text =>
            setsigninState({...signinState, password: text})
          }
        />

        {signinState.errors.password && (
          <Text style={styles.error}>{signinState.errors.password}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={signinState.email}
          onChangeText={text => setsigninState({...signinState, email: text})}
        />

        {signinState.errors.email && (
          <Text style={styles.error}>{signinState.errors.email}</Text>
        )}
        {signinState.errors.signin && (
          <Text style={styles.error}>{signinState.errors.signin}</Text>
        )}
        <TouchableOpacity>
          <LinearGradient
            colors={['#B9E976', '#21453F']}
            style={styles.gradient}>
            <Text style={styles.Button1} onPress={handleSignin}>
              SIGNUP
            </Text>
            {signinState.isSignedIn && (
              <Text style={styles.success}>
                Logged in as {signinState.username}{' '}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            colors={['#B9E976', '#21453F']}
            style={styles.gradient2}>
            <Text style={styles.Button2}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* <GoogleSigninButton
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    style={styles.GoogleSigninButton}
    onPress={async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo,null,2))
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }}
  ></GoogleSigninButton> */}
      </View>
    </ThemeContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0, // Add border width
    borderColor: 'black',
  },
  gradient: {
    borderRadius: 50,
  },
  gradient2: {
    bottom: -12,
    borderRadius: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CBB17',
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
  Button1: {
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
    flex: 1, // Make the content view take up the remaining space
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#001F3F',
    justifyContent: 'center',
  },
});
