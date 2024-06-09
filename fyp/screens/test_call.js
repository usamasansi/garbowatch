import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from 'react-native-image-picker';

export default function TestCall() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileUri, setFileUri] = useState('');

  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
        setFileUri(response.assets[0].uri);
      }
    });
  };
  const uploadImage = async () => {
    let uriParts = selectedImage.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      let response = await fetch("https://96c9-205-164-152-54.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  const chooseImage  = async () => {
    ImagePicker.launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('ImagePicker Response:', response);
        // Ensure that the response contains the assets array
        if (response.assets && response.assets.length > 0) {
          // Log the URI of the selected image
          console.log('Selected Image URI:', response.assets[0].uri);
          // Set the fileUri state with the URI
          setFileUri(response.assets[0].uri);
          let uriParts = fileUri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
        let response = await fetch("https://96c9-205-164-152-54.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
          // Optionally, set other state variables or perform additional actions
        } else {
          console.log('No image selected');
        }
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}
