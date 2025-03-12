import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatRoomScreen} from '@/screens/chat/ChatRoomScreen';
import {chatNavigations} from '@/constants';
import {ChatHomeScreen} from '@/screens/chat/ChatHomeScreen';

export type ChatStackParamList = {
  [chatNavigations.CHAT_HOME]: undefined;
  [chatNavigations.CHAT_ROOM_SCREEN]: {id: number};
};

const Stack = createStackNavigator<ChatStackParamList>();

function ChatStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={chatNavigations.CHAT_HOME}
        component={ChatHomeScreen}
        options={{title: '채팅 홈'}}
      />
      <Stack.Screen
        name={chatNavigations.CHAT_ROOM_SCREEN}
        component={ChatRoomScreen}
        options={{title: '채팅방'}}
      />
    </Stack.Navigator>
  );
}

export default ChatStackNavigator;
