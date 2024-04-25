import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Example icon library
import CheckBox from '@react-native-community/checkbox';

const Profile = ({navigation, route}) => {
  const [activeNavItem, setActiveNavItem] = useState(null);
 
   const { firstName } = route.params || {};

  const navigateTo = screen => {
    // Assuming 'navigation' prop is passed from React Navigation
    navigation.navigate(screen);
  };
  const handleNavItemPressIn = navItem => {
    setActiveNavItem(navItem);
  };
  const updateProfileInfo = (newFirstName, newLastName) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
  };
  const handleNavItemPressOut = () => {
    setActiveNavItem(null);
  };

  const isNavItemActive = navItem => {
    return activeNavItem === navItem;
  };
  const [loginState, setLoginState] = useState({
    username: '', // Initialize with an empty string
    password: '',
    errors: {},
    isLoggedIn: false,
  });


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
        
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24 }}>
          {firstName} 
          </Text>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
            You didn't select any organization. Select company or organization
            in edit profile
          </Text>

          <TouchableOpacity
            onPress={() => navigateTo('profile_edit')}
            onPressIn={() => handleNavItemPressIn('profile_edit')}
            onPressOut={handleNavItemPressOut}
            style={[
              styles.navItem,
              isNavItemActive('profile_edit') && styles.activeNavItem,
            ]}>
            <Icon style={styles.Icon} name="pencil-circle" size={25} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Your Activities</Text>
        </View>

        {/* Repeat the structure for other LinearLayout sections */}

        <View>
          <Text style={styles.text}>
            <Icon style={styles.map} name="map-marker"></Icon>Your reports
          </Text>
          <Text style={styles.text}>
            <Icon style={styles.map1} name="refresh-circle"></Icon>Your updates
          </Text>
          <Text style={styles.text}>
            <Icon style={styles.map2} name="check-circle"></Icon>Dumps cleaned
          </Text>
          <ScrollView horizontal>
            <View>{/* Add your badges dynamically here */}</View>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}> Cleaning Action</Text>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              {' '}
              I want to organize a Cleaning Action
            </Text>
            <CheckBox disabled  />

          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              I want to receive notifications about cleaning
            </Text>
            <CheckBox disabled  />

          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Your Email</Text>
          <Text style={styles.text}></Text>

          <Text style={styles.sectionTitle}>Your Phone</Text>
          <Text style={styles.text}></Text>

        </View>
        
      </ScrollView>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Text style={styles.navItem}>
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
        <TouchableOpacity
          onPress={() => navigateTo('profile')}
          onPressIn={() => handleNavItemPressIn('profile')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('profile') && styles.activeNavItem,
          ]}>
          <Text style={styles.activeNavItem}>
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
  },
  Icon: {
    color: 'white',
    fontSize: 40,
    right: -330,
    bottom: 80,
  },
  containers: {
    width: '100%',
    height: '90%',
  },
  container2: {
    backgroundColor: '#4CBB17',
    padding: 20,
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
  map: {
    color: 'red',
    fontSize: 19,
  },
  map1: {
    color: 'orange',
    fontSize: 19,
  },
  map2: {
    color: 'green',
    fontSize: 19,
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
  },
  container2: {
    backgroundColor: '#4CBB17',
    padding: 25,
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
  sectionTitle: {
    fontSize: 24,

    marginBottom: 10,
    color: 'black',
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    color: 'grey',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 19,
    color: 'grey',
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
    padding: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
    justifyContent: 'space-between',
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
});

export default Profile;