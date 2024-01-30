import React from 'react';
import {useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Report_edit = ({navigation}) => {
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
              <View style={styles.garbowatch}>
         
          <TouchableOpacity
              onPress={() => navigateTo('Report')}
              onPressIn={() => handleNavItemPressIn('Report')}
              onPressOut={handleNavItemPressOut}
              style={[
                styles.navItem,
                isNavItemActive('About') && styles.activeabout,
              ]}
            >
             <Icon style={styles.garbowatch}
      name="arrow-left" size={25} /> 
              
            </TouchableOpacity>
            
         
          </View>
       
          <View style={styles.contentView}>
         <View
      style={{
        width: "130%",
        height: '35%',
       
        top:-207,
       
      }}>
        <Text  style={{
     textAlign:'center',
     fontSize:25,
     fontWeight:'bold',
     color:'black',
     bottom:-70

 
      }}>You must take atleast one photo 
      </Text>
      <View
      style={{
        backgroundColor:'#D3D3D3',
        bottom:-180,
        width:'auto',
        height:'200%'
      }}>
      <Text  style={{
     fontSize:28,
     fontWeight:'bold',
     color:'black',
    

 
      }}>       Size of the Trash
      </Text>
      <TouchableOpacity 
              
               style=
                {styles.buttonContainer}
                
    
               
      >
     <Image source={require('../assests/images/garbage-bag-icon-.jpg')} style={styles.buttonImage} /></TouchableOpacity>
       <Text style={{fontSize:24,
     fontWeight:'bold',
     color:'black',
     right:-50}}>
      Fits in a bag</Text>
    

      </View>
    </View> 
  <TouchableOpacity style={styles.cameraButton} >
 <Icon style={styles.cameraIcon}name='camera' size={30} onPress={this.openCamera}> </Icon>
 </TouchableOpacity>
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
};
const styles = StyleSheet.create({
    container: {
      flex: 1, // Make the container take up the entire screen
      flexDirection: 'column', // Arrange the child elements vertically
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
     padding:12,
     bottom:230,
     left:150
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
    
      justifyContent:'space-between',
     
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
      width:20
    
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
      fontWeight:'bold',
      gap: 10,
    },
    contactTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'black',
      fontWeight:'bold',
      textAlign:'center'
    },
    activeNavItem: {
     fontWeight:'bold',
      color:'#4CBB17',
      fontSize: 20,
      borderBottomWidth: 2, // Add a border at the bottom to simulate underline
      borderColor: 'white',
      
    },
    activeabout:{
      fontWeight:'bold',
      color:'white',
      fontSize: 20,
      justifyContent:'space-between',
     
      
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
      backgroundColor:'#4CBB17',
      padding:5,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
      borderRadius:5,
      justifyContent:'space-between'
      
      
    },
    image_icon:{
      marginRight:1000
    },
  
    buttonContainer: {
      flexDirection: 'row',
      right:-80,
      padding: 10,
      borderRadius: 30,
      width:65,
      backgroundColor:'white',
      borderColor:'grey',
      borderWidth:1
    },
    buttonImage: {
      width: 40,
      height: 40,
      marginRight: 10,
      borderRadius:20,
      fontWeight:'bold',
      color:'#4CBB17',
      fontSize: 20,
      
      
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    
  });
  
  export default Report_edit;