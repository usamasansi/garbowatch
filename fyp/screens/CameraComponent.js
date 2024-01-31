// CameraComponent.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { RNCamera } from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';

const CameraComponent = ({ onPictureTaken }) => {
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse');
      if (granted === 'granted') {
        setLocationPermission(true);
      } else {
        Alert.alert('Location permission denied', 'Please enable location permission to use the camera.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const captureImage = async (camera) => {
    if (camera && locationPermission) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        console.log('Image captured:', data);

        // Get user's location after capturing image
        Geolocation.getCurrentPosition(
          (position) => {
            console.log('Location:', position.coords);
            // Pass the image and location data to the parent component
            onPictureTaken({ image: data, location: position.coords });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    } else {
      Alert.alert('Permission not granted', 'Please enable location permission to use the camera.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <View />;
          return (
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
              <TouchableOpacity onPress={() => captureImage(camera)}>
                <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}>
                  Capture Image
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default CameraComponent;