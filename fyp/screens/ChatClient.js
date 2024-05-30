// ChatClient.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChannelListScreen from './Channelistscreen';
import ChannelScreen from './ChannelScreen';

const API_KEY = 'dz5f4d5kzrue';
const USER_ID = 'young-pine-4';
const USER_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoieW91bmctcGluZS00IiwiZXhwIjoxNzE3MDY4NDA4fQ.FUkzJy2uwIA4hWgO04c9n04hghsBUs87Ym6-ou5B1Cw';

const chatClient = StreamChat.getInstance(API_KEY);

const Stack = createStackNavigator();

const ChatClient = () => {
  const [isClientReady, setClientReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(
          {
            id: USER_ID,
            name: 'young',
            image: 'https://bit.ly/2u9Vc0r',
          },
          USER_TOKEN,
        );
        setClientReady(true);
      } catch (err) {
        console.error('Error connecting user:', err);
        setError(err.message || 'An error occurred while connecting.');
      }
    };

    setupClient();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!isClientReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <OverlayProvider>
        <Chat client={chatClient}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="ChannelList">
              <Stack.Screen name="ChannelList" component={ChannelListScreen} />
              <Stack.Screen name="Channel" component={ChannelScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Chat>
      </OverlayProvider>
    </SafeAreaProvider>
  );
};

export default ChatClient;
