import React, { useEffect, useState, useRef } from 'react';
import { View, PermissionsAndroid, Text, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapViewComponent = () => {
  const [location, setLocation] = useState(null);
  
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);
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
              saveReport(newLocation);

              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  ...newLocation,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }, 1000);
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

  const saveReport = async (location) => {
    const { latitude, longitude } = location;

    try {
      const response = await fetch('http://192.168.141.200:3000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude, additionalInfo: "report submitted" }),
      });

      if (!response.ok) {
        throw new Error(`Error creating report: ${response.status} - ${response.statusText}`);
      }

      console.log('Report saved successfully');
    } catch (error) {
      console.error('Error creating report:', error);
      setError(error.message);
    }
  };

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
            description={"Report submitted"}
          />
        )}
        
      </MapView>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
