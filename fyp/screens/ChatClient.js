// ChatClient.js
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react-native';
import { OverlayProvider } from 'react-native-elements';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChannelListScreen from './Channelistscreen';
import ChannelScreen from './ChannelScreen';

const API_KEY = 'dz5f4d5kzrue';
const USER_ID = 'old-meadow-1';
const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2xkLW1lYWRvdy0xIiwiZXhwIjoxNzE1ODgwOTEyfQ.Aa42WUTl9eANTm2S_cNx8PwpUYfsuNd4OlTE3sYWzss';

const chatClient = StreamChat.getInstance(API_KEY);

const Stack = createStackNavigator();

const ChatClient = () => {
  const [isClientReady, setClientReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(
        {
          id: USER_ID,
          name: 'old',
          image: 'https://bit.ly/2u9Vc0r',
        },
        USER_TOKEN,
      );
      setClientReady(true);
    };

    setupClient();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  if (!isClientReady) {
    return null; // or a loading spinner
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
