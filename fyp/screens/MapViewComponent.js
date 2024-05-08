import React, { useEffect, useState,Component,useRef } from 'react';
import { View, Text, PermissionsAndroid,Button,TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
const MapViewComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const [markedLocation, setMarkedLocation] = useState(null);
  useEffect(() => {
    const requestLocationPermission = async () => {
      

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to function properly.',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            error => setError(error.message)
          );
        } else {
          setError('Location permission denied');
        }
      } catch (err) {
        setError('Error requesting location permission: ' + err.message);
      }
    };

    requestLocationPermission();
  }, []);
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const goToTokyo = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion( 31.543944466894633, 74.38568392767803, 3 * 1000);
  };
  
  return (
    <View style={{ flex: 1 }}>
              

      

      <MapView
        provider={PROVIDER_GOOGLE} // Use Google Maps
        style={{ width:'130%',height:'130%',left:-19,top:-20 }}
        initialRegion={{
          latitude: location?.latitude || 31.543944466894633,
          longitude: location?.longitude || 74.38568392767803,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          
        }}
        ref={mapRef}

        
      >

<Marker
  coordinate={{
    latitude: 31.543944466894633,
    longitude: 74.38568392767803,
  }}
 
>


</Marker>

          
      </MapView>
      

      
    </View>
    
  );
};

export default MapViewComponent;
