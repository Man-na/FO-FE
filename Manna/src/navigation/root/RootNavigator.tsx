import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {mainNavigations} from '@/constants';
import AuthStackNavigator from '@/navigation/stack/AuthStackNavigator';
import ChatStackNavigator from '@/navigation/stack/ChatStackNavigator';
import MainTabNavigator from '@/navigation/tab/MainTabNavigator';
import {useAuth} from '@/services/auth';

const Stack = createStackNavigator();

function RootNavigator() {
  const {isLogin} = useAuth();

  return (
    <Stack.Navigator>
      {isLogin ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={mainNavigations.CHAT}
            component={ChatStackNavigator}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
