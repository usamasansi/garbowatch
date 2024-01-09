import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import ImagePicker,{launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Example icon library

const Report = ({navigation}) => {
    const [activeNavItem, setActiveNavItem] = useState(null);
  const navigateTo = screen => {
    // Assuming 'navigation' prop is passed from React Navigation
    navigation.navigate(screen);
  };
  
  const handleNavItemPressIn = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleNavItemPressOut = () => {
    setActiveNavItem(null);
  };

  const isNavItemActive = (navItem) => {
    return activeNavItem === navItem;
  };


 

  return (
    <ScrollView contentContainerStyle={styles.container}>
     

      <View style={styles.contentView}>
      <TouchableOpacity
          onPress={() => navigateTo('Report_edit')}
          onPressIn={() => handleNavItemPressIn('Report_Edit')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('Report_edit') && styles.activeNavItem,
          ]}
        >
          <Text style={styles.activeNavItem}><Icon
 
 name="account" size={25}/></Text>
        </TouchableOpacity>
        
        <Text style={styles.contentText}></Text>
      </View>
      
      <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Text style={styles.navItem}><Icon
 
 name="home" size={25}/></Text>
        </TouchableOpacity>

        {/* Add other TouchableOpacity components for additional navigation items */}
        <TouchableOpacity
          onPress={() => navigateTo('Report')}
          onPressIn={() => handleNavItemPressIn('Report')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('Report') && styles.activeNavItem,
          ]}
        >
          <Text style={styles.activeNavItem}><Icon
 
 name="web" size={25}/></Text>
        </TouchableOpacity>
       

 
        <TouchableOpacity onPress={() => navigateTo('CommunityForum')}>
          <Text style={styles.navItem}><Icon
 
 name="chat" size={25}/></Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => navigateTo('profile')}>
          <Text style={styles.navItem}><Icon
 
 name="account" size={25}/></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1, // Make the container take up the entire screen
          flexDirection: 'column', // Arrange the child elements vertically
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
    borderWidth:0.5
        },
        navItem: {
          color: 'grey', // Change text color to white
    fontSize: 18,
    fontWeight: 'bold', // Add subtle bold emphasis
    marginBottom: 10, 
    justifyContent:'space-between',
   
        },
        contentView: {
          flex: 1, // Make the content view take up the remaining space
          padding: 20,
        },
        contentText: {
          fontSize: 16,
        },
        Button: {
          width: 120,
          height: 40,
          margin: 10,
          borderRadius: 6,
          textAlign: 'center',
          padding: 10,
          backgroundColor: '#2196F3',
          color: '#fff',
          fontWeight: 'bold',
        },
        contentView: {
            flex: 1, // Make the content view take up the remaining space
            padding: 20,
            alignItems: 'center', // Center the button horizontally
            justifyContent: 'center', // Center the button vertically
          },
          activeNavItem: {
            fontWeight:'bold',
            color:'#4CBB17',
             fontSize: 20,
             borderBottomWidth: 2, // Add a border at the bottom to simulate underline
             borderColor: 'white',
             
           },
           ButtonText: {
             color: '#fff',
             fontWeight: 'bold',
           },
           buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 20,
          },
          button: {
            backgroundColor: '#2196F3',
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 8,
          },
          buttonText: {
            color: '#FFF',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          imageContainer: {
            alignItems: 'center',
            marginTop: 20,
          },
          imageHeader: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
          },
          imagePreview: {
            width: 300,
            height: 300,
            resizeMode: 'contain',
            borderWidth: 1,
            borderColor: '#000',
          },
      });

export default Report;