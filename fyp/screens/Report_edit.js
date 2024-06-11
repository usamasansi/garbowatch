import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import { Marker } from 'react-native-maps';
const Report_edit = ({ navigation }) => {
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [fileUri, setFileUri] = useState('');
  const [isOrganizeActionChecked, setOrganizeActionChecked] = useState(false);
  const [istypeactionchecked, settypeactionchecked] = useState(false);
  const [istypeactionchecked2, settypeactionchecked2] = useState(false);
  const [istypeactionchecked3, settypeactionchecked3] = useState(false);
  const [istypeactionchecked4, settypeactionchecked4] = useState(false);
  const [istypeactionchecked5, settypeactionchecked5] = useState(false);
  const [istypeactionchecked6, settypeactionchecked6] = useState(false);
  const [istypeactionchecked7, settypeactionchecked7] = useState(false);
  const [istypeactionchecked8, settypeactionchecked8] = useState(false);
  const [location, setLocation] = useState('');
  const [additionalInfo, setadditionalInfo] = useState('');
  const [showMap, setShowMap] = useState(false);
  

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
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

  const geolocation = () => {
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

  useEffect(() => {
    geolocation();
  }, [fileUri]);

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          setFileUri(response.assets[0].uri);
        } else {
          console.log('No image selected');
        }
      }
    });
  };

  const launchCamera = () => {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          setFileUri(response.assets[0].uri);
        } else {
          console.log('No image captured');
        }
      }
    });
  };

  const handleUpdateReport = async () => {
    try {
      const { latitude, longitude } = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position.coords);
          },
          error => reject(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      });
  
      const response = await fetch('http://192.168.146.30:3000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fitsinabag: isOrganizeActionChecked,
          fitsinawheelbarrow: istypeactionchecked,
          truckneeded: istypeactionchecked2,
          househould: istypeactionchecked3,
          construction: istypeactionchecked4,
          plastic: istypeactionchecked5,
          glass: istypeactionchecked6,
          paper: istypeactionchecked7,
          accessibilebyacar: istypeactionchecked8,
          additionalInfo,
          latitude,  // Include latitude
          longitude,
          report:"report submitted"
          
           // Include longitude
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        Alert.alert('Error', `Failed to Update Report: ${errorData.message}`);
        return;
      }
  
      const data = await response.json();
      console.log('Report Updated:', data);
      Alert.alert('Success', 'Report Updated Successfully');
      navigation.navigate('Report', { newReport: data.report });
      
    } catch (error) {
      console.error('Error updating report:', error);
      Alert.alert('Error', `Failed to Update Report: ${error.message}`);
    }
  };
  

  return (
    <View style={styles.container}>
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
      <ScrollView>
        <View style={styles.contentView}>
          <View>
        <Image source={{uri: fileUri}} style={styles.images} />
        </View>
          <View style={styles.section}>
            <TouchableOpacity style={styles.cameraButton}>
              <LinearGradient
                colors={['#B9E976', '#21453F']}
                style={styles.gradient1}
              >
                <Icon
                  style={styles.cameraIcon}
                  name="camera"
                  size={30}
                  onPress={() => navigation.navigate('CameraComponent2')}
                  onLongPress={chooseImage}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size of the Trash</Text>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Fits in a bag</Text>
              <CheckBox
                value={isOrganizeActionChecked}
                onValueChange={newValue => setOrganizeActionChecked(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Fits in a wheelbarrow</Text>
              <CheckBox
                value={istypeactionchecked}
                onValueChange={newValue => settypeactionchecked(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Truck needed</Text>
              <CheckBox
                value={istypeactionchecked2}
                onValueChange={newValue => settypeactionchecked2(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Type of the Trash</Text>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Household</Text>
              <CheckBox
                value={istypeactionchecked3}
                onValueChange={newValue => settypeactionchecked3(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Construction</Text>
              <CheckBox
                value={istypeactionchecked4}
                onValueChange={newValue => settypeactionchecked4(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Plastic</Text>
              <CheckBox
                value={istypeactionchecked5}
                onValueChange={newValue => settypeactionchecked5(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Glass</Text>
              <CheckBox
                value={istypeactionchecked6}
                onValueChange={newValue => settypeactionchecked6(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Paper</Text>
              <CheckBox
                value={istypeactionchecked7}
                onValueChange={newValue => settypeactionchecked7(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trash Accessibility</Text>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Accessible by a Car</Text>
              <CheckBox
                value={istypeactionchecked8}
                onValueChange={newValue => settypeactionchecked8(newValue)}
                tintColors={{ true: '#4CBB17' }}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TouchableOpacity onPress={() => navigateTo('Report')}>
              <Text style={styles.locationText}>
                {location}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional information</Text>
            <TextInput
              placeholder="it is nearby it contains products"
              keyboardType="email-address"
              placeholderTextColor="grey"
              style={styles.input}
              multiline={true}
              value={additionalInfo}
              onChangeText={text => setadditionalInfo(text)}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleUpdateReport}>
            <LinearGradient
              colors={['#B9E976', '#21453F']}
              style={styles.gradient2}
            >
              <Text style={styles.submitButtonText}>SEND REPORT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  garbowatch: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
    zIndex: 1,
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
    top:-7,
    width:420,
    left:-8
  },
  Icon: {
    color: 'white',
    textAlign: 'center',
    width:372,
    left:-180,
    

  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  contentView: {
    padding: 20,
    bottom:180
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#21453F',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#21453F',
    marginBottom: 10,
  },
  cameraButton: {
    alignItems: 'center',
    
  },
  gradient1: {
    borderRadius: 25,
    padding: 10,
    marginBottom:200,
    bottom:-185

  },
  cameraIcon: {
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:10,
    
    
    
  },
  label: {
    fontSize: 16,
    color: '#21453F',
  },
  input: {
    borderWidth: 1,
    borderColor: '#21453F',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#21453F',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  gradient2: {
    borderRadius: 25,
    padding: 15,
    width: '100%',
  },
  images:{
    width: 420,
  height: 200,
  borderColor: 'lightgrey',
  borderWidth: 2,
  bottom:-207,
  left:-17

  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#21453F',
    textDecorationLine: 'underline',
  },
});

export default Report_edit;