import {colors, profileNavigations} from '@/constants';
import EditProfileScreen from '@/screens/profile/EditProfileScreen';
import ProfileHomeScreen from '@/screens/profile/ProfileHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type ProfileStackParamList = {
  [profileNavigations.PROFILE_HOME]: undefined;
  [profileNavigations.EDIT_PROFILE]: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.GRAY_100,
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
        name={profileNavigations.PROFILE_HOME}
        component={ProfileHomeScreen}
        options={{
          headerShown: false,
          headerTitle: '내 프로필',
        }}
      />
      <Stack.Screen
        name={profileNavigations.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerShown: false,
          headerTitle: '프로필 편집',
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
