import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {BackButton} from '@/components/common/BackButton';
import {colors, profileNavigations} from '@/constants';
import {
  EditAvatarScreen,
  EditProfileScreen,
  ProfileHomeScreen,
} from '@/screens/profile';
import {EditProfileDetailsScreen} from '@/screens/profile/EditProfileDetails';

export type ProfileStackParamList = {
  [profileNavigations.PROFILE_HOME]: undefined;
  [profileNavigations.EDIT_PROFILE]: undefined;
  [profileNavigations.EDIT_AVATAR]: undefined;
  [profileNavigations.EDIT_PROFILE_DETAILS]: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
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
        options={() => ({
          headerShown: true,
          headerTitle: '프로필 편집',
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={profileNavigations.EDIT_AVATAR}
        component={EditAvatarScreen}
        options={() => ({
          headerShown: true,
          headerTitle: '아바타 변경',
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={profileNavigations.EDIT_PROFILE_DETAILS}
        component={EditProfileDetailsScreen}
        options={{
          title: '프로필 편집',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
