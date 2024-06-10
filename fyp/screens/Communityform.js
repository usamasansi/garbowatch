import React, {useState, useEffect} from 'react';
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
import {PubNubProvider, usePubNub} from 'pubnub-react'; // Import PubNubProvider and usePubNub

const CommunityForm = ({navigation}) => {
  const pubnub = usePubNub(); // Initialize PubNub client using usePubNub hook
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    fetchPosts();
    // No need to add listeners and subscribe here as pubnub-react handles that internally

    return () => {
      // Unsubscribe from all channels when component unmounts
      pubnub.unsubscribeAllChannels();
    };
  }, []);

  const fetchPosts = () => {
    const fetchedPosts = [
      {id: 1, author: 'User 1', text: 'This is the first post.'},
      {id: 2, author: 'User 2', text: 'Second post here!'},
      {id: 3, author: 'User 3', text: 'Another post for testing.'},
    ];
    setPosts(fetchedPosts);
  };

  const handleMessage = event => {
    const message = event.message;
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        text: inputText,
        user: 'User',
        timestamp: new Date().toLocaleString(),
      };

      pubnub.publish({channel: 'chat', message: newMessage});
      setInputText('');
    }
  };

  const navigateTo = screen => {
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

  const handleReact = (postId, reactionType) => {
    const currentReaction = reactions[postId]?.[reactionType] || 0;
    const updatedReactions = {
      ...reactions,
      [postId]: {
        ...reactions[postId],
        [reactionType]: currentReaction === 1 ? 0 : 1,
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
          onPress={() => navigateTo('Chat')}
          onPressIn={() => handleNavItemPressIn('Chat')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('Chat') && styles.activeabout,
          ]}>
          <LinearGradient
            colors={['#B9E976', '#21453F']}
            style={styles.gradient}>
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
            disabled={!newPostText.trim()}>
            <Text style={styles.ButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.postContainer}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.postText}>{item.text}</Text>
              <View style={styles.reactionsContainer}>
                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={() => handleReact(item.id, 'likes')}>
                  <Icon name="thumb-up-outline" size={20} color="blue" />
                  <Text>{reactions[item.id]?.likes || 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={() => handleReact(item.id, 'dislikes')}>
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
        <Text style={styles.contentText}></Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Text style={styles.navItem}>
            <Icon name="home" size={25} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Report')}>
          <Text style={styles.navItem}>
            <Icon name="web" size={25} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo('CommunityForm')} // Ensure you're navigating to 'CommunityForm'
          onPressIn={() => handleNavItemPressIn('CommunityForm')}
          onPressOut={handleNavItemPressOut}
          style={[
            styles.navItem,
            isNavItemActive('CommunityForm') && styles.activeNavItem,
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

export default CommunityForm;
