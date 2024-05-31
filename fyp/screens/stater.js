import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import LinearGradient from 'react-native-linear-gradient';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const Slides = ({ navigation }) => {
  const images = [
    require('../assests/images/Stater2.png'),
    require('../assests/images/Welcome.png'),
  ];

  return (
    <View style={styles.container}>
      <SliderBox
        style={styles.slider1}
        images={images}
        dotStyle={styles.dotStyle}
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        dotColor="#416833"
        autoplay
      />

      <LinearGradient colors={['#B9E976', '#21453F']} style={styles.gradient}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.Button2}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};



const Stater = () => {
  return (
    <Stack.Navigator   initialRouteName='Stater' screenOptions={{headerShown: false}}>

      <Stack.Screen name="Stater" component={Slides} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default Stater;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    bottom: 20,
  },
  slider1: {
    width: '100%',
    height: 960,
    borderRadius: 30,
    bottom:-40
  },
  gradient: {
    borderRadius: 50,
    bottom:30
  },
  Button2: {
    width: 390,
    height: 28,
    margin: 10,
    borderRadius: 5,
    textAlign: 'center',
    padding:0,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    bottom:1

  },
});
