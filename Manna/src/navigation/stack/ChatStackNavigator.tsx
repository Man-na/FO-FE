import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {chatNavigations} from '@/constants';
import {ChatHomeScreen, ChatRoomScreen} from '@/screens/chat';
import {BackButton} from '@/components/common';

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
        options={{headerTitle: '채팅 홈', headerLeft: () => <BackButton />}}
      />
      <Stack.Screen
        name={chatNavigations.CHAT_ROOM_SCREEN}
        component={ChatRoomScreen}
        options={{headerTitle: '채팅방', headerLeft: () => <BackButton />}}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
