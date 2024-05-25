import React from 'react';
import { View, Text } from 'react-native';
import { Channel, MessageList, MessageInput } from 'stream-chat-react-native';

const ChannelScreen = ({ route }) => {
  console.log('Route Params:', route?.params); // Log the route params
  const channel = route?.params?.channel;

  if (!channel) {
    return (
      <View>
        <Text>Channel not found. Please go back and select a channel.</Text>
      </View>
    );
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;
