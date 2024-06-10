// Chat.js
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import pubnub from './pubnubconfig';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [channel] = useState('chat-channel'); // Replace with your desired channel

  useEffect(() => {
    pubnub.subscribe({channels: [channel]});

    pubnub.addListener({
      message: event => {
        setMessages(prevMessages => [
          ...prevMessages,
          {text: event.message, timetoken: event.timetoken},
        ]);
      },
    });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, [channel]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      pubnub.publish({
        channel,
        message,
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.timetoken.toString()}
        renderItem={({item}) => <Text style={styles.message}>{item.text}</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Chat;
