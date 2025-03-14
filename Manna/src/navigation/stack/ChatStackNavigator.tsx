import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {chatNavigations} from '@/constants';
import {ChatHomeScreen, ChatRoomScreen} from '@/screens/chat';

export type ChatStackParamList = {
  [chatNavigations.CHAT_HOME]: undefined;
  [chatNavigations.CHAT_ROOM_SCREEN]: {id: number};
};

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
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
};

export default ChatStackNavigator;
