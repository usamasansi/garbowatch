import React, {useState, useEffect, Fragment} from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import garbowatch from '../assests/images/garbowatch.png';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const App = () => {
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');

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
        console.log('ImagePicker Response:', response);
        // Ensure that the response contains the assets array
        if (response.assets && response.assets.length > 0) {
          // Log the URI of the selected image
          console.log('Selected Image URI:', response.assets[0].uri);
          // Set the fileUri state with the URI
          setFileUri(response.assets[0].uri);
          // Optionally, set other state variables or perform additional actions
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
        const {latitude, longitude} = position.coords;
        const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
        setLocation(location);
      },
      error => {
        console.log(error.message);
      },
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
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
        setFileUri(response.assets[0].originalPath);
        console.log('====================================');
        console.log(response.assets[0].originalPath);
        console.log('====================================');

        // Geolocation.getCurrentPosition(
        //   position => {
        //     const {latitude, longitude} = position.coords;
        //     const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
        //     setLocation(location);
        //   },
        //   error => {
        //     console.log(error.message);
        //   },
        //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        // );
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.2:3000/api/data/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: fileUri,
            location: location,
            dateTime: dateTime,
            username: username,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch('http://192.168.100.7:3000/api/data', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         image: fileData,
  //         location: location,
  //         dateTime: dateTime,
  //         // username: username,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log('Data submitted successfully:', data);
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //   }
  // };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={{textAlign: 'center', fontSize: 20,bottom: 60,color:'black'}}>
            Pick Images from Camera & Gallery
          </Text>
          <View style={styles.ImageSections}>
            <View>
              <Image source={{uri: fileUri}} style={styles.images} />
              <Text style={{textAlign: 'center' , left:170,color:'black',fontWeight:'bold',bottom:-15}}>File Uri</Text>
            </View>
            <View>
              <Text style={{textAlign: 'center',bottom:60,left:-60,color:'black',fontWeight:'bold'}}>Date: {dateTime}</Text>
              <Text style={{textAlign: 'center',color:'black',fontWeight:'bold',bottom:60,left:-74}}>Location:{location}</Text>
            </View>
          </View>
          <View style={styles.btnParentSection}>
            <TouchableOpacity
              onPress={() => chooseImage()}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => launchCamera()}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.btnSection}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  images: {
    width: 149,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
   left:170,
   bottom:-10
   
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;