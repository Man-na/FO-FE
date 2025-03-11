import AuthStackNavigator from '@/navigation/stack/AuthStackNavigator';
import MainTabNavigator from '@/navigation/tab/MainTabNavigator';
import ChatStackNavigator from '@/navigation/stack/ChatStackNavigator';
import {useAuth} from '@/services/auth';
import {mainNavigations} from '@/constants';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function RootNavigator(): React.JSX.Element {
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
