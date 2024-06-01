import React, { useEffect, useState, useRef } from 'react';
import { View, PermissionsAndroid, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapViewComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

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
              const newLocation = { latitude, longitude };
              setLocation(newLocation);

              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  ...newLocation,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                
                }, 1000); // Adjust duration to make the transition smoother
              }
            },
            error => setError(error.message),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
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

  const initialRegion = {
    latitude: 31.543957669061864,
    longitude: 74.38566172716833,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location || initialRegion}
        ref={mapRef}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={location}
            title={"Your Location"}
            description={"Home"}
          />
        )}
      </MapView>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '112%',
    height: '114%',
    right: 20,
    top: -16,
  },
  errorText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'red',
  },
});

export default MapViewComponent;
