import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
const ThemeContext = React.createContext({
    primaryColor: '#42A5F5',
    secondaryColor: '#fff',
    textColor: '#000',
    errorColor: '#f00',
  });
// ...other imports and component setup

export default function Signup2() {
  const navigation = useNavigation();
  
  const [signinState, setsigninState] = useState({
    username: '',
    password: '',
    email: '',
    errors: {},
    isSignedIn: false,
  });

  const handleSignin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
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
        navigation.navigate('Home'); // Successful signup, navigate to Home screen
      } else {
        const errorData = await response.json();
        // Handle signup errors by updating the state to display errors, if any
        setsigninState({ ...signinState, errors: errorData });
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors
    }
  };

  useEffect(() => {
    // Perform API call when component mounts or when specific dependencies change
    const performSignup = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/signup', {
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
          navigation.navigate('Home'); // Successful signup, navigate to Home screen
        } else {
          const errorData = await response.json();
          setsigninState({ ...signinState, errors: errorData });
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle other errors
      }
    };

    // Call the signup function
    performSignup();
  }, [signinState]); // This will trigger the effect whenever signinState changes

  

  return(
    <ThemeContext.Provider value={setTheme}>
      
       <View style={styles.garbowatch}>
<Text style={styles.garbowatch}>GARBOWATCH
  </Text>
</View>
  <View style={styles.container}>
 
    <Text style={styles.header}>Signup</Text>
     
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={signinState.username}
      onChangeText={(text) => setsigninState({ ...signinState, username: text })}
    />

    {signinState.errors.username && (
      <Text style={styles.error}>{signinState.errors.username}</Text>
    )}

    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry={true}
      value={signinState.password}
      onChangeText={(text) => setsigninState({ ...signinState, password: text })}
    />

    {signinState.errors.password && (
      <Text style={styles.error}>{signinState.errors.password}</Text>
    )}
<TextInput
      style={styles.input}
      placeholder="Email"
      value={signinState.email}
      onChangeText={(text) => setsigninState({ ...signinState, email: text })}
    />

    {signinState.errors.email && (
      <Text style={styles.error}>{signinState.errors.email}</Text>
    )}
    {signinState.errors.signin && (
      <Text style={styles.error}>{signinState.errors.signin}</Text>
    )}
<TouchableOpacity  >
    
    <Text style={styles.Button} onPress={handleSignin}>SIGNUP</Text>
    {signinState.isSignedIn && (
      <Text style={styles.success}>Logged in as {signinState.username} </Text>
      
    )}
    </TouchableOpacity>
    
  <TouchableOpacity
     
      onPress={() => navigation.navigate('Login')} >
      <Text style={styles.Button}>LOGIN</Text>
    </TouchableOpacity>
    
    <GoogleSigninButton
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
></GoogleSigninButton>
  
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
      borderBottomWidth:2,
      fontSize:16,
      color:'black'
    },
    error: {
      color: 'red',
    },
    success: {
      color: 'green',
    },
    Button: {
      width: 400,
      height: 40,
      margin: 10,
      borderRadius: 6,
      textAlign: 'center',
      padding: 6.5,
      backgroundColor: '#4CBB17',
      color: '#fff',
      fontWeight: 'bold',
      fontSize:18
    },
    garbowatch: {
      backgroundColor:'#4CBB17',
      padding:4,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
      borderRadius:5,
      justifyContent:'space-between'
      
      
    },
    GoogleSigninButton:{
      width: 400,
      height: 40,
      padding: 30
    },
    contentView: {
      flex: 1, // Make the content view take up the remaining space
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#001F3F',
      justifyContent: 'center',
    
    },
   
  });
  