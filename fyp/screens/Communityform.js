import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Example icon library

const CommunityForm = ({navigation}) => {
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
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
  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        text: inputText,
        user: 'User', // You can modify this to indicate the sender
        timestamp: new Date().toLocaleString(), // Or use a different timestamp format
      };

      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                {item.user}: {item.text}
              </Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentView}>
        {/* Add your content here */}

        <Text style={styles.contentText}></Text>
      </View>
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
        <TouchableOpacity
          onPress={() => navigateTo('CommunityForum')}
          onPressIn={() => handleNavItemPressIn('CommunityForum')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('CommunityForum') && styles.activeNavItem,
          ]}>
          <Text style={styles.activeNavItem}>
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
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white', // Use a vibrant gradient background
    height: 60,
    borderRadius: 5, // Add a subtle border
    borderWidth: 0.5,
  },
  navItem: {
    color: 'grey', // Change text color to white
    fontSize: 18,
    fontWeight: 'bold', // Add subtle bold emphasis
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
    fontWeight: 'bold',
    color: '#4CBB17',
    fontSize: 20,
    borderBottomWidth: 2, // Add a border at the bottom to simulate underline
    borderColor: 'white',
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#42A5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default CommunityForm;