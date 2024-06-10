// pubnubConfig.js
import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: 'pub-c-790a7d6c-bd45-4946-b786-9fe62d33dc55',
  subscribeKey: 'sub-c-785fe2c7-ccbf-4455-b55a-63ed43efda69',
  uuid: 'user-unique-identifier', // Replace with a unique identifier for each user
});

export default pubnub;
