
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { StreamChat } from 'stream-chat';

const ChatScreen = () => {
  useEffect(() => {
    const setupChat = async () => {
      const client = StreamChat.getInstance("dz5f4d5kzrue");
      try {
        await client.connectUser({
          id: "old-meadow-1",
          name: "old",
          image: "https://bit.ly/2u9Vc0r",
        }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2xkLW1lYWRvdy0xIiwiZXhwIjoxNzE1ODgwOTEyfQ.Aa42WUTl9eANTm2S_cNx8PwpUYfsuNd4OlTE3sYWzss");
        
        const channel = client.channel('messaging', 'the-small-council_Jh3mc-6U1f', {
          name: "Private Chat About the Kingdom",
          image: "https://bit.ly/2F3KEoM",
          members: ["old-meadow-1"],
          session: 8
        });

        await channel.watch();
        
        console.log("Channel created and watched:", channel.data);

        // Send a message
        const message = await channel.sendMessage({
          text: "Did you already see the trailer? https://www.youtube.com/watch?v=wA38GCX4Tb0",
        });
        
        console.log("Message sent:", message);
        const messageId = "18d8a7b6-e1f4-4b97-b8a4-3b5281447d0c";
        const reaction = await channel.sendReaction(messageId, {
          type: "love"
        });
        
        console.log("Reaction sent:", reaction);
      } catch (error) {
        console.error("Error setting up chat:", error);
      }
    };

    setupChat();

    return () => {
      console.log("Cleaning up...");
    };
  }, []);

  return (
    <Text>Chat Screen</Text>
  );
};

export default ChatScreen;