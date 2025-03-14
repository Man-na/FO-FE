import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {BackButton} from '@/components/common';
import {colors, matchingNavigations} from '@/constants';
import {
  CustomMatchingScreen,
  MatchingHomeScreen,
  RapidMatchingScreen,
} from '@/screens/matching';

export type MatchingStackParamList = {
  [matchingNavigations.MATCHING_HOME]: undefined;
  [matchingNavigations.RAPID_MATCHING]: undefined;
  [matchingNavigations.CUSTOM_MATCHING]: undefined;
};

const Stack = createStackNavigator<MatchingStackParamList>();

const MatchingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
        headerStyle: {
          shadowColor: colors.GRAY_200,
          backgroundColor: colors.WHITE,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
      }}>
      <Stack.Screen
        name={matchingNavigations.MATCHING_HOME}
        component={MatchingHomeScreen}
        options={() => ({
          headerTitle: '매칭',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={matchingNavigations.RAPID_MATCHING}
        component={RapidMatchingScreen}
        options={() => ({
          headerTitle: '빠른매칭',
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={matchingNavigations.CUSTOM_MATCHING}
        component={CustomMatchingScreen}
        options={() => ({
          headerTitle: '직접매칭',
          headerLeft: () => <BackButton />,
        })}
      />
    </Stack.Navigator>
  );
};

export default MatchingStackNavigator;
