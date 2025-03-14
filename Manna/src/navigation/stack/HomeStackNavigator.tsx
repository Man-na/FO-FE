import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {homeNavigations} from '@/constants';
import {HomeScreen} from '@/screens/home/HomeScreen';

export type HomeStackParamList = {
  [homeNavigations.HOME]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={homeNavigations.HOME}
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
