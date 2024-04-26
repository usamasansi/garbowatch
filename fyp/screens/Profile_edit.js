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
          const response = await fetch('http://172.29.32.1:3000/api/profile', {
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
        <Icon style={styles.garbowatch}
 name="arrow-left" size={25} /> 
         

         
       </TouchableOpacity>
       <Text style={styles.garbowatch}>    Edit Profile
     </Text>
     <TouchableOpacity onPress={handleUpdateProfile}>
        <Icon style={styles.garbowatch} name="check" size={25} />
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
      <CheckBox value={isOrganizeActionChecked}
          onValueChange={(newValue) => setOrganizeActionChecked(newValue)}
          tintColors={{ true: '#4CBB17' }} 
          />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginVertical: 10, color:'grey' }}>I want to receive notifications about cleaning</Text>
       <CheckBox  value={isNotificationChecked}
        onValueChange={setNotificationChecked}
          tintColors={{ true: '#4CBB17' }} 

          />
          
       </View>
     

       <Text style={{ fontSize: 24, marginVertical: 10, fontWeight:'bold', color:'grey' }}> GPS coordinate formats </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      <Text style={{ flex: 1, color: 'gray', fontSize: 18 }}>Location Format Degrees Example</Text>
      

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
      garbowatch: {
        backgroundColor:'#4CBB17',
        padding:5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius:5,
        textAlign:'justify',
        flexDirection:'row',
        justifyContent:'space-between'
        
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