import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapViewComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <View style={{ flex: 1 }}>
      
      <MapView
        provider={PROVIDER_GOOGLE} // Use Google Maps
        style={{ width:'130%',height:'120%',left:-17,top:-17 }}
        initialRegion={{
          latitude: location?.latitude || 31.543944466894633,
          longitude: location?.longitude || 74.38568392767803,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        
      >
         {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="#4285F4" // Use Google Maps blue color
            />
          )}
      </MapView>
      

      
    </View>
  );
};

export default MapViewComponent;
