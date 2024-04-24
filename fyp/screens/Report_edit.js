import React from 'react';
import {useState,useEffect } from 'react';

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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import CameraComponent from './CameraComponent';
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
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    // Toggle the visibility of the MapViewComponent
    setShowMap(!showMap);
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
            isNavItemActive('Report') && styles.activeabout,
          ]}>
          <Icon style={styles.garbowatch} name="arrow-left" size={25} />
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
            <Icon
              style={styles.cameraIcon}
              name="camera"
              size={30}
              onPress={() => navigation.navigate('CameraComponent')}>
            </Icon>
          </TouchableOpacity>
        </View>
        <View style={{bottom: -120}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              bottom: 250,
              right: 105,
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
            style={{bottom: 300, right: -145}}
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
            style={{bottom: 318, right: -115}}
            value={istypeactionchecked2}
            onValueChange={newValue => settypeactionchecked2(newValue)}
            tintColors={{true: '#4CBB17'}}></CheckBox>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              bottom: 250,
              right: 105,
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
            style={{bottom: 320, right: -60}}
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
            style={{bottom: 340, right: -60}}
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
            style={{bottom: 360, right: -60}}
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
            style={{bottom: 390, right: -60}}
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
            style={{bottom: 415, right: -60}}
            value={istypeactionchecked6}
            onValueChange={newValue => settypeactionchecked6(newValue)}
            tintColors={{true: '#4CBB17'}}
          />

        </View>
        <View style={{ flex: 1 }}>
  <Text style={{top:-300,
   fontSize: 24,
   fontWeight: 'bold',
   color: 'black',
  
   right: 100,
   
  
  }}>Trash Accessibility</Text>
</View>
<View style={{

}}>
  <Text style={{top:-295,
   fontSize: 20,
  
   color: 'black',
  
   right: 100,
   
  
  }}>Accessible by a Car</Text><CheckBox 
  style={{bottom: 322, right: -72}}
  value={istypeactionchecked7}
  onValueChange={newValue => settypeactionchecked7(newValue)}
  tintColors={{true: '#4CBB17'}}
/>

<Text style={{top:-320,
   fontSize: 24,
   fontWeight: 'bold',
   color: 'black',
  
   right: 100,
   
  
  }}>Location</Text>
   
       
       
 
       
</View>
<View>
<Text style={{top:-320,
   fontSize: 24,
   fontWeight: 'bold',
   color: 'black',
  
   right: -10,
   
  
  }}>Additional information</Text>
  <TextInput
        placeholder="it is nearby it contains products"
        keyboardType="email-address"
        placeholderTextColor="grey"
        style={{top:-320,
          width: 400,
          height: 40,
          borderWidth: 0,
          borderColor: 'grey',
          marginBottom: 10,
          padding: 10,
          borderBottomWidth:2,
          fontSize:16,
          color:'black'
        }}
      />
      <TouchableOpacity
       
       onPress={() => navigation.navigate('Report')} >
       <Text style={{top:-325,
      width: 400,
      height: 50,
        margin: 10,
        borderRadius: 5,
        textAlign:'center',
        padding: 6.5,
        backgroundColor: '#4CBB17',
        color:'#fff',
        fontWeight:'bold',
        fontSize:18,
        
      }}>Send</Text>
     </TouchableOpacity>

</View>


      </View>
    
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
  },
  cameraButton: {
    backgroundColor: '#4CAF50', // Adjust green shade as needed
    borderRadius: 30,
    padding: 12,
    bottom: 110,
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
  content: {
    flex: 1,
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
    backgroundColor: '#4CBB17',
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
    justifyContent: 'space-between',
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
