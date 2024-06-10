import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Pubnub from 'pubnub';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';

const pubnub = new Pubnub({
    publishKey: "pub-c-175d671e-8966-40b6-a87c-56fc64a6dc8f",
    subscribeKey: "sub-c-32f049ce-1ac9-4028-8e1a-7531d5c0c579",
    userId: "raed" // Set your unique user ID here
});

export default function ChatClient() {
    const [messages, setMessages] = useState([]);
    const [text, onChangeText] = useState("");
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // Set and get user ID on component mount
        const id = pubnub.getUserId();
        setUserId(id);

        const listener = {
            message: (messageEvent) => {
                setMessages((messages) => [
                    ...messages,
                    {
                        id: messageEvent.message.id,
                        text: messageEvent.message.description,
                        sender: messageEvent.publisher,
                        timestamp: new Date(messageEvent.timetoken / 10000) // PubNub timetoken is in microseconds
                    }
                ]);
            },
        };

        pubnub.addListener(listener);
        pubnub.subscribe({ channels: ['hello_world'] });

        return () => {
            pubnub.removeListener(listener);
            pubnub.unsubscribe({ channels: ['hello_world'] });
        };
    }, []);

    const handleLike = (messageId) => {
        const newLikes = { ...likes };
        const newDislikes = { ...dislikes };

        if (newLikes[messageId]) {
            delete newLikes[messageId]; // Remove like if already liked
        } else {
            newLikes[messageId] = 1; // Like the message
            if (newDislikes[messageId]) {
                delete newDislikes[messageId]; // Remove dislike if already disliked
            }
        }

        setLikes(newLikes);
        setDislikes(newDislikes);
    };

    const handleDislike = (messageId) => {
        const newDislikes = { ...dislikes };
        const newLikes = { ...likes };

        if (newDislikes[messageId]) {
            delete newDislikes[messageId]; // Remove dislike if already disliked
        } else {
            newDislikes[messageId] = 1; // Dislike the message
            if (newLikes[messageId]) {
                delete newLikes[messageId]; // Remove like if already liked
            }
        }

        setLikes(newLikes);
        setDislikes(newDislikes);
    };

    const publishMessage = async (message) => {
        const publishPayload = {
            channel: "hello_world",
            message: {
                id: new Date().getTime().toString(), // Generate a unique ID for each message
                title: "greeting",
                description: message
            }
        };
        await pubnub.publish(publishPayload);
        onChangeText("");
    };

    return (
        <View style={styles.container}>
            <Text style={{color:'black'}}>User ID: {userId}</Text>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message, idx) => (
                    <View key={idx} style={styles.messageBubble}>
                        <Text style={styles.messageSender}>{message.sender}</Text>
                        <Text style={styles.messageText}>{message.text}</Text>
                        <Text style={styles.messageTime}>{format(message.timestamp, 'HH:mm')}</Text>
                        <View style={styles.reactionContainer}>
                            <TouchableOpacity onPress={() => handleLike(message.id)}>
                                <Icon name="thumb-up" size={20} color="#888" />
                            </TouchableOpacity>
                            <Text style={styles.countText}>{likes[message.id] || 0}</Text>
                            <TouchableOpacity onPress={() => handleDislike(message.id)}>
                                <Icon name="thumb-down" size={20} color="#888" />
                            </TouchableOpacity>
                            <Text style={styles.countText}>{dislikes[message.id] || 0}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Type a message"
                    placeholderTextColor="#888"
                />
                <TouchableOpacity onPress={() => publishMessage(text)}>
                    <Icon name="send" size={30} color="#841584" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 10,
    },
    countText: {
        color: '#000', // Change the color to black
        marginLeft: 5, // Add some spacing between the count and the icon
    },
    messageBubble: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        maxWidth: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    messageSender: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        color: '#333',
    },
    messageTime: {
        fontSize: 10,
        color: '#888',
        marginTop: 5,
    },
    reactionContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInput: {
        flex: 1,
        height: 45,
        paddingHorizontal: 10,
        color: '#333',
    },
});
