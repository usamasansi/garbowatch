import React from 'react';
import {useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RadioButton from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Profile_edit = ({navigation, route}) => {

 

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
      
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [organizations, setOrganizations] = useState('');
      const [isOrganizeActionChecked, setOrganizeActionChecked] = useState(false);
      const [isNotificationChecked, setNotificationChecked] = useState(false);
    
      const handleUpdateProfile = async () => {
        try {
          // Check if the email is valid
          if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return; // Exit the function if email is invalid
          }
      
          const response = await fetch('http://192.168.146.30:3000/api/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              phone,
              organizations,
              organizeAction: isOrganizeActionChecked,
              receiveNotifications: isNotificationChecked,
              // Add other profile data as needed
            }),
          });
      
          const data = await response.json();
          console.log('Profile Updated:', data);
      
          // Show a success message or perform additional actions upon successful update
          Alert.alert('Success', 'Profile Updated Successfully');
      
          // Assuming 'navigation' prop is passed from React Navigation
          navigation.navigate('profile'); // Navigate back to the Profile screen
        } catch (error) {
          console.error('Error updating profile:', error);
          // Handle error or show an error message to the user
          Alert.alert('Error', 'Failed to Update Profile');
        }
      };
      
      // Function to validate email format
      const validateEmail = (email) => {
        // Regular expression for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
      

  return (
    
    <View name='12'>
          <View style={styles.garbowatch}>
          
     <TouchableOpacity
         onPress={() => navigateTo('profile')}
         onPressIn={() => handleNavItemPressIn('profile')}
         onPressOut={handleNavItemPressOut}
         style={[
           styles.navItem,
           isNavItemActive('profile') && styles.activeabout,
         ]}
       >
  <LinearGradient 
         colors={['#B9E976', '#21453F']}
         style={styles.gradient}
        >
        <Icon style={styles.garbowatch}
         name="arrow-left" size={25} /> 
         </LinearGradient>

         
       </TouchableOpacity>
       <LinearGradient 
         colors={['#B9E976', '#21453F']}
         style={styles.gradient1}
        >
       <Text style={styles.garbowatch1
       }>    Edit Profile
     </Text>
     </LinearGradient>
     <TouchableOpacity onPress={handleUpdateProfile}>
     <LinearGradient 
         colors={['#B9E976', '#21453F']}
         style={styles.gradient2}
        >
        <Icon style={styles.garbowatch2} name="check" size={25} />
        </LinearGradient>
      </TouchableOpacity>
     </View>
     
     <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10, color:'grey' }} >Profile</Text>
    <TextInput
    placeholder="First Name"
    placeholderTextColor="grey"
    style={styles.input}
    value={firstName}
        onChangeText={setFirstName}
  />
   <TextInput
    placeholder="Last Name"
    placeholderTextColor="grey"
    style={styles.input}
    value={lastName}
    onChangeText={setLastName}
  />
  <TextInput
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="grey"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        
      />
 <TextInput
        placeholder="Phone"
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor="grey"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10, color:'grey' }}>Organization</Text>

      <TextInput
        placeholder="Organizations"
        placeholderTextColor="grey"
        style={styles.input}
        value={organizations}
        onChangeText={setOrganizations}

      />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10, color:'grey' }}>
                Cleaning Action
</Text>
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
      <Text style={{ fontSize: 18, marginVertical: 10 , color:'grey'}}> I want to organize Cleaning Action</Text>
      <CheckBox style={{left:16}}value={isOrganizeActionChecked}
          onValueChange={(newValue) => setOrganizeActionChecked(newValue)}
          tintColors={{ true: '#4CBB17' }} 
          />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginVertical: 10, color:'grey' }}> I want to receive notifications about 
           cleaning</Text>
       <CheckBox style={{bottom:12, left:-5}} value={isNotificationChecked}
        onValueChange={setNotificationChecked}
          tintColors={{ true: '#4CBB17' }} 

          />
          
       </View>
     

       
          </View>
       
 


  );
};
const styles = StyleSheet.create({
    garbowatchContainer: {
        flexDirection: 'row', // Set the container to row direction to align text and icon horizontally
        alignItems: 'center', // Center items vertically
        backgroundColor: '#4CBB17',
        padding: 5,
        borderRadius: 8,
       
      },
      gradient:{
        width:100,
        height:45,
        bottom:2
      },
      gradient1:{
        left:-20,
        width:228,
        height:45,
        bottom:2
        
      },gradient2:{
        height:45,
        width:110,
        left:-32,
        bottom:2
      },
      garbowatch: {
        padding:5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius:5,
        textAlign:'justify',
        flexDirection:'row',
        justifyContent:'space-between',
        
      },
      garbowatch1:{
        
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius:5,
        textAlign:'justify',
        flexDirection:'row',
        justifyContent:'space-between',
        left:25
      },
      garbowatch2:{
        padding:5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius:5,
        textAlign:'justify',
        flexDirection:'row',
        justifyContent:'space-between',
        left:65
      },
      input: {
        width: 400,
        height: 40,
        borderWidth: 0,
        borderColor: 'grey',
        marginBottom: 10,
        padding: 10,
        borderBottomWidth:2,
        fontSize:16,
        color:'black'
        
        
      },
     
});

export default Profile_edit;