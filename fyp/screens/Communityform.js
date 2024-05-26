import React, {useState,useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Example icon library

import LinearGradient from 'react-native-linear-gradient';


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
        user: 'User', 
        timestamp: new Date().toLocaleString(), 
      };

      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    // Listen for incoming messages from the backend
    fetchPosts();

  }, []);

  const fetchPosts = () => {
    // Example fetch function to get posts from an API or database
    // Replace this with your actual fetch logic
    const fetchedPosts = [
      { id: 1, author: 'User 1', text: 'This is the first post.' },
      { id: 2, author: 'User 2', text: 'Second post here!' },
      { id: 3, author: 'User 3', text: 'Another post for testing.' },
    ];
    setPosts(fetchedPosts);
  };
  const [reactions, setReactions] = useState({});

  const handleReact = (postId, reactionType) => {
    const currentReaction = reactions[postId]?.[reactionType] || 0;
    const updatedReactions = {
      ...reactions,
      [postId]: {
        ...reactions[postId],
        [reactionType]: currentReaction === 1 ? 0 : 1, // Toggle between 0 and 1
      },
    };
    setReactions(updatedReactions);
  };
  
  
  const handlePostSubmit = () => {
    const newPost = {
      id: posts.length + 1,
      author: 'Current User', 
      text: newPostText,
    };
    setPosts([...posts, newPost]);
    setNewPostText('');
  };
  return (
    <View style={styles.container}>
       <View style={styles.garbowatch}>
      <TouchableOpacity
          onPress={() => navigateTo('ChatClient')}
          onPressIn={() => handleNavItemPressIn('ChatClient')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('ChatClient') && styles.activeabout,
          ]}>
            <LinearGradient 
         colors={['#B9E976', '#21453F']}
         style={styles.gradient}
        >
                     <Text style={styles.garbowatch}>Community Chat</Text>
                     </LinearGradient>
        </TouchableOpacity>
        
      </View>
      <ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your post here..."
          value={newPostText}
          onChangeText={setNewPostText}
        />
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePostSubmit}
          disabled={!newPostText.trim()}
        >
          <Text style={styles.ButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.postText}>{item.text}</Text>
            <View style={styles.reactionsContainer}>
                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={() => handleReact(item.id, 'likes')}
                >
                  <Icon name="thumb-up-outline" size={20} color="blue" />
                  <Text>{reactions[item.id]?.likes || 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={() => handleReact(item.id, 'dislikes')}
                >
                  <Icon name="thumb-down-outline" size={20} color="red" />
                  <Text>{reactions[item.id]?.dislikes || 0}</Text>
                </TouchableOpacity>
              </View>
          </View>
        )}
        data={posts}
      />
      </ScrollView>
      
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
  garbowatch: {
    
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
    justifyContent: 'space-between',
    height:55
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
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postText: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
     height:30,
     fontSize:20
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
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    height:'100%',
    fontSize:20
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#4CBB17',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,

    
  },
});
export default CommunityForm;