import React from 'react';
import { ChannelList } from 'stream-chat-react-native';
import { useNavigation } from '@react-navigation/native';

const ChannelListScreen = () => {
  const navigation = useNavigation();

  const onSelectChannel = (channel) => {
    console.log('Selected Channel:', channel); // Log the selected channel
    navigation.navigate('Channel', { channel });
  };

  return (
    <ChannelList onSelect={onSelectChannel} />
  );
};

export default ChannelListScreen;
