import {colors, profileNavigations} from '@/constants';
import EditAvatarScreen from '@/screens/profile/EditAvatarScreen';
import EditProfileScreen from '@/screens/profile/EditProfileScreen';
import ProfileHomeScreen from '@/screens/profile/ProfileHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Pressable} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export type ProfileStackParamList = {
  [profileNavigations.PROFILE_HOME]: undefined;
  [profileNavigations.EDIT_PROFILE]: undefined;
  [profileNavigations.EDIT_AVATAR]: undefined;
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
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '프로필 편집',
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={28} color="black" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name={profileNavigations.EDIT_AVATAR}
        component={EditAvatarScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '아바타 변경',
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={28} color="black" />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
