import {ACTIVE} from 'nativewind/dist/utils/selector';
import React, {useState} from 'react';
// You can choose a different icon set if you prefer
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Example icon library
import LinearGradient from 'react-native-linear-gradient';
import ImageSlider from './ImageSlider';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Linking,
} from 'react-native';

const Homescreen = ({navigation}) => {
  const [activeNavItem, setActiveNavItem] = useState(null);
  const navigateTo = screen => {
    // Assuming 'navigation' prop is passed from React Navigation

    navigation.navigate(screen);
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:raedumair01@gmail.com');
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.garbowatch}>
          <TouchableOpacity
            onPress={() => navigateTo('About')}
            onPressIn={() => handleNavItemPressIn('About')}
            onPressOut={handleNavItemPressOut}
            style={[
              styles.navItem,
              isNavItemActive('About') && styles.activeabout,
            ]}>
               <LinearGradient 
         colors={['#B9E976', '#21453F']}
         style={styles.gradient}
        >
            <Text style={styles.garbowatch}> GARBOWATCH</Text>
            </LinearGradient>
          </TouchableOpacity>
          
        </View>
        <View style={styles.contentView}>
          <View style={{width:'120%',
         
         
        }}>
           <ImageBackground
      source={require('../assests/images/Leonardo_Diffusion_XL_green_background_image_with_white_maps_o_3.jpg')} // Set the path to your image
      style={styles.background}
    >
        <TouchableOpacity
        onPress={() => navigation.navigate('Report_edit')}>
          
       <Text style={styles.Button}>Report Illegal dump</Text>
       
     </TouchableOpacity>
     </ImageBackground>
     </View>
          
    


        </View>
        <ImageSlider />
        <Text style={styles.Button1}>Welcome to Garbage community app 
        press on the button to report illegal dump</Text>
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => navigateTo('Home')}
          onPressIn={() => handleNavItemPressIn('Home')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('Home') && styles.activeNavItem,
          ]}>
          <Text style={styles.activeNavItem}>
            <Icon name="home" size={25} />
          </Text>
        </TouchableOpacity>
        {/* Add other TouchableOpacity components for additional navigation items */}

        <TouchableOpacity onPress={() => navigateTo('Report')}>
          <Text style={styles.navItem}>
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
    flex: 1, // Make the container take up the entire screen
    flexDirection: 'column', // Arrange the child elements vertically
    backgroundColor:'#FFFEE1'
    
  },
  containers: {
    width: '100%',
    height: '90%',
    

  },
  background: {
    height:160,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
    bottom:20
    
     
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white', // Use a vibrant gradient background
    height: 60,
    borderRadius: 5, // Add a subtle border
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 0.5,
  },
  navItem: {
    color: 'grey', // Change text color to white
    fontSize: 18,
    fontWeight: 'bold', // Add subtle bold emphasis
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,

  },
 
  contentText: {
    fontSize: 16,
  },
  Button: {
    width: 250,
    height: 40,
    margin: 10,
    textAlign: 'center',
    padding: 2,
    borderRadius: 2,
    backgroundColor: 'white',
    color: '#4CBB17',
    fontWeight: 'bold',
    fontSize: 20,
    bottom: -20,
    right: -75,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 5.5,
    shadowRadius: 2,
    // Shadow properties for Android
    elevation: 100,
  },
  Button1: {
    
    color: '#49AC25',
    width: 390,
    height: 110,
    backgroundColor: '#FFFFFF',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 1.2,
    shadowRadius: 20,
    borderRadius: 16,
    elevation: 20, // This adds elevation for Android shadows
    fontSize:25,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    color: '#49AC25',
    left:10,
    
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
    bottom:-15

  },
  gradient:{
 bottom:4,
 
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
 
    padding: 5,
    borderRadius: 8,
  },
  garbowatch: {
    height:55,
    width:'150%',
    padding: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
    justifyContent: 'space-between',
    left:-3,
    bottom:0
  },
  image_icon: {
    marginRight: 1000,
  },
});

export default Homescreen;