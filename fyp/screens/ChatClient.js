// ChatClient.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Chat} from 'stream-chat-react-native'
import { OverlayProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChannelListScreen from './Channelistscreen';
import ChannelScreen from './ChannelScreen';

const API_KEY = 'dz5f4d5kzrue';
const USER_ID = 'wispy-wind-6';
const USER_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoid2lzcHktd2luZC02IiwiZXhwIjoxNzE3MTgwOTg4fQ.Q1iOtnhe-Sp7xschGdIZRexHC28nyWs-Uh9lcodf8_E';

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
            name: 'wisp',
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
          console.log(client)
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
