import React, { useState } from 'react';
import { View, Button, Image, PermissionsAndroid, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const CameraComponent = () => {
  const [photoUri, setPhotoUri] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          launchCamera();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.error('Error requesting camera permission:', err);
      }
    } else {
      // Handle iOS permissions if needed
    }
  };

  const launchCamera = () => {
    ImagePicker.launchCamera({ mediaType: 'photo' }, response => {
      if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else if (!response.didCancel) {
        setPhotoUri(response.uri);
      }
    });
  };

  const launchGallery = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else if (!response.didCancel) {
        setPhotoUri(response.uri);
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {photoUri && <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Open Camera" onPress={requestCameraPermission} />
      <Button title="Open Gallery" onPress={launchGallery} />
    </View>
  );
};

export default CameraComponent;
