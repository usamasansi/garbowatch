import React, { useState, useEffect, Fragment } from 'react';
import { StatusBar, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, Alert, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const App = ({ navigation }) => {
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [classificationResult, setClassificationResult] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState(null);

  useEffect(() => {
    geolocation();
  }, [fileUri]);

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (response.assets && response.assets.length > 0) {
          setFileUri(response.assets[0].uri);
        } else {
          console.log('No image selected');
        }
      }
    });
  };

  const geolocation = () => {
    const dateTime = new Date().toLocaleString();
    setDateTime(dateTime);

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
        setLocation(location);
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
    );
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setFileData(response.data);
        setFileUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    let uriParts = fileUri.split(".");
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  
    try {
      let response = await fetch("https://beb1-119-155-0-225.ngrok-free.app/predict", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      let responseJson = await response.json();
  
      if (!responseJson.hasGarbage) {
        setClassificationResult(responseJson);
        Alert.alert("Garbage classified");
      } 
    } catch (error) {
      console.error(error);
      Alert.alert("Error uploading image");
    }
  };
  

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'http://192.168.146.30:3000/api/data/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: fileUri,
            location: location,
            date: new Date().toISOString(), // Ensure date is in ISO format
            classificationResult: classificationResult, // Include classification result
          }),
        },
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
  
      console.log('Data submitted successfully:', data);
      Alert.alert("Picture submitted");
      
    } catch (error) {
      Alert.alert('cannot submit data without location')
      console.error('Error submitting data:', error);
      
    }
  };
  const navigateTo = screen => {
    navigation.navigate(screen);
  };

  const handleNavItemPressIn = navItem => {
    setActiveNavItem(navItem);
  };

  const handleNavItemPressOut = () => {
    setActiveNavItem(null);
  };

  const isNavItemActive = navItem => {
    return activeNavItem === navItem;
  };

  const formatClassificationResult = (result) => {
    if (!result) return '';
    const resultStr = JSON.stringify(result)
      .replace(/[{}]/g, '') // Remove curly braces
      .replace(/"/g, '') // Remove quotes
      .replace(/cardboard, /, 'cardboard\n') // Print cardboard in one line
      .replace(/,/g, '\n'); // Print the rest in next lines
    return resultStr;
  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <View style={styles.body}>
          <View style={styles.garbowatch}>
        <TouchableOpacity
          onPress={() => navigateTo('Report')}
          onPressIn={() => handleNavItemPressIn('Report')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('CameraComponent') && styles.activeabout,
          ]}>
          <LinearGradient
            colors={['#B9E976', '#21453F']}
            style={styles.gradient}
          >
            <Icon style={styles.Icon} name="arrow-left" size={25} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
            <View style={styles.ImageSections}>
              
                <Image source={{ uri: fileUri }} style={styles.images} />
                
              
              <View>
                <Text style={{ textAlign: 'center', bottom: 0, left: -190,bottom:-150, color: 'black', fontWeight: 'bold' }}>Date: {dateTime}</Text>
                <Text style={{ textAlign: 'center', color: 'black', bottom:-150,fontWeight: 'bold',  left: -200, }}>Location: {location}</Text>
              </View>
            </View>
            <View style={styles.btnParentSection}>
            <LinearGradient colors={['#B9E976', '#21453F']} style={styles.gradientButton}>

              <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
                <Text style={styles.btnText}>Choose File</Text>
                
              </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={['#B9E976', '#21453F']} style={styles.gradientButton}>

              <TouchableOpacity onPress={launchCamera} style={styles.btnSection}>
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={['#B9E976', '#21453F']} style={styles.gradientButton}>

              <TouchableOpacity onPress={uploadImage} style={styles.btnSection}>
                <Text style={styles.btnText}>Classify Image</Text>
              </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={['#B9E976', '#21453F']} style={styles.gradientButton}>

              <TouchableOpacity onPress={handleSubmit} style={styles.btnSection}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
              </LinearGradient>
            </View>
            {classificationResult && (
              <View style={styles.resultSection}>
                <Text style={styles.resultText}>Classification Result:</Text>
                <Text style={styles.resultsmall}>{formatClassificationResult(classificationResult)}</Text>
              </View>
            )}
          </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    bottom:-20
  },
  images: {
    width: 420,
    height: 190,
    borderRadius: 15,
    borderColor: 'lightgrey',
    borderWidth: 3,
    left:177,
    bottom:55

  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 20,
    top:30,
    
  },
  btnSection: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
    
    
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultSection: {

    alignItems: 'center',
    padding:10,
    top:35
  },
  resultText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',

  },
  resultsmall: {
    fontSize: 14,
    color: 'black',
    

  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    color: 'grey', // Change text color to white
    fontSize: 18,
    fontWeight: 'bold', 
  },
  activeabout: {
    opacity: 0.5,
  },
  gradient: {
    borderRadius: 8,
    padding: 10,
    top:-9,
  height:50,
  width:420,
  left:-10
  },
  gradientButton:{
    width: '80%',
    marginVertical: 5,
    borderRadius: 25,
    
  },
  garbowatch: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
    zIndex: 1,
  },
});

export default App;
