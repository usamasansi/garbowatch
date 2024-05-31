import React from 'react';
import {useState, useEffect} from 'react';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import CameraComponent from './CameraComponent';
import MapViewComponent from './MapViewComponent';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import LinearGradient from 'react-native-linear-gradient';

const Report_edit = ({navigation}) => {
  const [activeNavItem, setActiveNavItem] = useState(null);

  const navigateTo = screen => {
    // Assuming 'navigation' prop is passed from React Navigation

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
  const geolocation = () => {
    

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
        setLocation(location);
      },
      error => {
        console.log(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  useEffect(() => {
    geolocation();
  });
  const handleShowMap = () => {
    // Toggle the visibility of the MapViewComponent
    setShowMap(!showMap);
  };
  const handleUpdateReport = async () => {
    try {
      const response = await fetch('http://192.168.131.253:3000/api/reports', {
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
          // Add other profile data as needed
        }),
      });

      const data = await response.json();
      console.log('Report Updated:', data);

      // Show a success message or perform additional actions upon successful update
      Alert.alert('Success', 'report Updated Successfully');

      // Assuming 'navigation' prop is passed from React Navigation
      navigation.navigate('Report'); // Navigate back to the Profile screen
    } catch (error) {
      console.error('Error updating report:', error);
      // Handle error or show an error message to the user
      Alert.alert('Error', 'Failed to Update report');
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
          <View
            style={{
              width: '130%',
              height: '50%',
              top: -80,
              borderWidth: 3,
              borderColor: 'lightgrey',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                bottom: -230,
              }}></Text>
          </View>
          <View>
          
            <TouchableOpacity style={styles.cameraButton}>
            <LinearGradient 
         colors={['#B9E976', '#21453F']}
         style={styles.gradient1}
        >
              <Icon
                style={styles.cameraIcon}
                name="camera"
                size={30}
                onPress={() => navigation.navigate('CameraComponent2')}></Icon>
                </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{bottom: -120}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',
                bottom: 250,
                right: 70,
              }}>
              {' '}
              Size of the Trash
            </Text>
            <Text
              style={{
                fontSize: 22,

                color: 'black',
                right: 65,
                bottom: 250,
              }}>
              Fits in a bag
            </Text>
            <CheckBox
              style={{bottom: 278, right: -115}}
              value={isOrganizeActionChecked}
              onValueChange={newValue => setOrganizeActionChecked(newValue)}
              tintColors={{true: '#4CBB17'}}
            />
            <Text
              style={{
                right: 65,
                bottom: 270,
                fontSize: 22,

                color: 'black',
              }}>
              Fits in a wheelbarrow
            </Text>
            <CheckBox
              style={{bottom: 300, right: -210}}
              value={istypeactionchecked}
              onValueChange={newValue => settypeactionchecked(newValue)}
              tintColors={{true: '#4CBB17'}}></CheckBox>
            <Text
              style={{
                right: 65,
                bottom: 290,
                fontSize: 22,

                color: 'black',
              }}>
              Truck needed
            </Text>
            <CheckBox
              style={{bottom: 320, right: -115}}
              value={istypeactionchecked2}
              onValueChange={newValue => settypeactionchecked2(newValue)}
              tintColors={{true: '#4CBB17'}}></CheckBox>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',
                bottom: 250,
                right: 75,
                top: -300,
              }}>
              {' '}
              Type of the Trash
            </Text>
            <Text
              style={{
                fontSize: 22,

                color: 'black',
                right: 65,
                bottom: 290,
              }}>
              Household
            </Text>
            <CheckBox
              style={{bottom: 320, right: -100}}
              value={istypeactionchecked3}
              onValueChange={newValue => settypeactionchecked3(newValue)}
              tintColors={{true: '#4CBB17'}}
            />
            <Text
              style={{
                fontSize: 22,

                color: 'black',
                right: 65,
                bottom: 310,
              }}>
              Construction
            </Text>
            <CheckBox
              style={{bottom: 340, right: -100}}
              value={istypeactionchecked4}
              onValueChange={newValue => settypeactionchecked4(newValue)}
              tintColors={{true: '#4CBB17'}}
            />

            <Text
              style={{
                fontSize: 22,

                color: 'black',
                right: 60,
                bottom: 330,
              }}>
              Plastic
            </Text>
            <CheckBox
              style={{bottom: 360, right: -100}}
              value={istypeactionchecked5}
              onValueChange={newValue => settypeactionchecked5(newValue)}
              tintColors={{true: '#4CBB17'}}
            />
            <Text
              style={{
                fontSize: 22,

                color: 'black',
                right: 60,
                bottom: 360,
              }}>
              Glass
            </Text>
            <CheckBox
              style={{bottom: 390, right: -100}}
              value={istypeactionchecked6}
              onValueChange={newValue => settypeactionchecked6(newValue)}
              tintColors={{true: '#4CBB17'}}
            />
            <Text
              style={{
                fontSize: 22,

                color: 'black',
                right: 60,
                bottom: 385,
              }}>
              Paper
            </Text>
            <CheckBox
              style={{bottom: 415, right: -100}}
              value={istypeactionchecked7}
              onValueChange={newValue => settypeactionchecked7(newValue)}
              tintColors={{true: '#4CBB17'}}
            />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                top: -300,
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',

                right: 70,
              }}>
              Trash Accessibility
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                top: -295,
                fontSize: 20,

                color: 'black',

                right: 50,
              }}>
              Accessible by a Car
            </Text>
            <CheckBox
              style={{bottom: 324, right: -180}}
              value={istypeactionchecked8}
              onValueChange={newValue => settypeactionchecked8(newValue)}
              tintColors={{true: '#4CBB17'}}
            />

            <Text
              style={{
                top: -320,
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',

                right: 50,
              }}>
              Location
            </Text>
            <TouchableOpacity onPress={() => navigateTo('Report')}>
              <Text
                style={{
                  color: 'black',
                  right: 50,
                  top: -320,
                  
                  

                  
                  
                  
                  fontSize:15,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {location}
              </Text>
            </TouchableOpacity>

            {/* Render the MapViewComponent conditionally based on the state */}
            {showMap && <MapViewComponent />}
          </View>
          <View>
          
            <Text
              style={{
                top: -320,
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',

                right: -5,
              }}>
              Additional information
            </Text>
            
            <TextInput
              placeholder="it is nearby it contains products"
              keyboardType="email-address"
              placeholderTextColor="grey"
              style={{
                top: -320,
                width: 400,
                height: 40,
                borderWidth: 0,
                borderColor: 'grey',
                marginBottom: 10,
                padding: 10,
                borderBottomWidth: 2,
                fontSize: 16,
                color: 'black',
              }}
              value={additionalInfo}
              onChangeText={setadditionalInfo}
            />
            
          </View>
         
        </View>
        <TouchableOpacity onPress={handleUpdateReport}>
        <LinearGradient colors={['#B9E976', '#21453F']}
        style={styles.gradient2}
        >
           <Text
             style={{
               top: -5,
               width: 400,
               height: 40,
               margin: 10,
               borderRadius: 5,
               textAlign: 'center',
               padding: 4,
               //backgroundColor: '#4CBB17',
               color: '#fff',
               fontWeight: 'bold',
               fontSize: 22,
             }}>
             SEND
           </Text>
           </LinearGradient>
         </TouchableOpacity>
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Text style={styles.navItem}>
            <Icon name="home" size={25} />
          </Text>
        </TouchableOpacity>

        {/* Add other TouchableOpacity components for additional navigation items */}
        <TouchableOpacity
          onPress={() => navigateTo('Report')}
          onPressIn={() => handleNavItemPressIn('Report')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('Report') && styles.activeNavItem,
          ]}>
          <Text style={styles.activeNavItem}>
            <Icon name="web" size={25} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo('CommunityForum')}>
          <Text style={styles.navItem}>
            <Icon name="chat" size={25} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo('profile')}>
          <Text style={styles.navItem}>
            <Icon name="account" size={25} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // Make the container take up the entire screen
    // Arrange the child elements vertically
    flex: 1, // Make the container take up the entire screen
    flexDirection: 'column', // Arrange the child elements vertically
  },
  containers: {
    width: '100%',
    height: '90%',
  },
  cameraIcon: {
    width: 30,
    height: 30,
    color: 'white', // Adjust icon color if needed
    left:9.5,
    bottom:-9
  },
  cameraButton: {
     // Adjust green shade as needed
    borderRadius: 30,
    padding: 12,
    bottom: 117,
    left: 150,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    color: 'grey', // Change text color to white
    fontSize: 18,
    fontWeight: 'bold', // Add subtle bold emphasis

    justifyContent: 'space-between',
  },
  gradient2:{
    bottom:100,
    height:55,
    borderRadius: 50,
  },
  content: {
    flex: 1,
  },
  gradient1:{
   width:50,
   
   height:50,
   borderRadius:24
  },
  contentView: {
    flex: 1, // Make the content view take up the remaining space
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#001F3F',
    justifyContent: 'center',
    width: 20,
  },
  contentText: {
    fontSize: 16,
  },
  Button: {
    width: 120,
    height: 40,
    marginT: 10,
    borderRadius: 6,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#4CBB17',
    color: '#fff',
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1, // Make the content view take up the remaining space
    padding: 20,
    alignItems: 'center', // Center the button horizontally
    justifyContent: 'center', // Center the button vertically
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00',
    marginBottom: 10,
    textAlign: 'center',
    padding: 15,
    color: '#001F3F',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  subtitle: {
    fontSize: 16,
    color: '#001F3F',
    marginBottom: 20,
    textAlign: 'center',
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001F3F',
  },
  quoteAuthor: {
    fontSize: 16,
    textAlign: 'right',
    color: '#001F3F',
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200, // Set an appropriate height for the image
    resizeMode: 'cover', // Adjust the image's size and aspect ratio
  },
  contactInfo: {
    backgroundColor: 'grey',
    padding: 20,
    fontWeight: 'bold',
    gap: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeNavItem: {
    fontWeight: 'bold',
    color: '#4CBB17',
    fontSize: 20,
    borderBottomWidth: 2, // Add a border at the bottom to simulate underline
    borderColor: 'white',
  },
  activeabout: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    justifyContent: 'space-between',
  },
  Button: {
    width: 250,
    height: 40,
    margin: 10,
    textAlign: 'center',
    padding: 6.5,
    borderRadius: 2,
    backgroundColor: 'white',
    color: '#4CBB17',
    fontWeight: 'bold',
    fontSize: 20,
    bottom: -20,
    right: -75,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 5.5,
    shadowRadius: 2,
    // Shadow properties for Android
    elevation: 50,
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  garbowatchContainer: {
    flexDirection: 'row', // Set the container to row direction to align text and icon horizontally
    alignItems: 'center', // Center items vertically
    backgroundColor: '#4CBB17',
    padding: 5,
    borderRadius: 8,
    
  },
  garbowatch: {
    height:44,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
    justifyContent: 'space-between',
    bottom:2
  },
  Icon:{
    height:48,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
    borderRadius: 5,
    justifyContent: 'space-between',
    bottom:-2
  },
  image_icon: {
    marginRight: 1000,
  },

  buttonContainer: {
    flexDirection: 'row',
    right: -80,
    padding: 10,
    borderRadius: 30,
    width: 65,

    borderColor: 'grey',
    borderWidth: 1,
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Report_edit;
