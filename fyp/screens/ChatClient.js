import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { MessageList, MessageInput} from "@pubnub/react-native-chat-components";
import { Chat } from "@pubnub/react-native-chat-components";

// Creates and configures your PubNub instance. Be sure to replace "myPublishKey" and "mySubscribeKey"
// with your own keyset. If you wish, modify the default "myFirstUser" userId value for the chat user.
const pubnub = new PubNub({
  publishKey: "pub-c-b6483555-6cf8-4959-8663-2055e3fbe93f",
  subscribeKey: "sub-c-444dd0dc-a5eb-4f70-ac33-cda6916e5a02",
  userId: "myFirstUser",
});
const currentChannel = "Default";
const theme = "light";

export function ChatClient() {
  return (
    <PubNubProvider client={pubnub}>
    <Chat currentChannel={currentChannel} theme={theme}>
      <MessageList />
      <MessageInput />
    </Chat>
  </PubNubProvider>
  );
}
export default ChatClient;
