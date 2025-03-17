import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {colors, mainNavigations} from '@/constants';
import CommunityStackNavigator, {
  CommunityStackParamList,
} from '@/navigation/stack/CommunityStackNavigator';
import HomeStackNavigator from '@/navigation/stack/HomeStackNavigator';
import MatchingStackNavigator from '@/navigation/stack/MatchingStackNavigator';
import ProfileStackNavigator from '@/navigation/stack/ProfileStackNavigator';

export type MainTabParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.MATCHING]: undefined;
  [mainNavigations.COMMUNITY]: NavigatorScreenParams<CommunityStackParamList>;
  [mainNavigations.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabBarIcons = ({
  route,
  focused,
  size,
}: {
  route: RouteProp<MainTabParamList>;
  focused: boolean;
  size: number;
}) => {
  if (route.name === mainNavigations.MATCHING) {
    return (
      <Ionicons
        name="people"
        size={16}
        color={focused ? colors.BLACK : colors.GRAY_500}
      />
    );
  }

  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'home';
      size = 16;
      break;
    }
    case mainNavigations.COMMUNITY: {
      iconName = 'feed';
      size = 16;
      break;
    }
    case mainNavigations.PROFILE: {
      iconName = 'person';
      size = 16;
      break;
    }
  }

  return (
    <MaterialIcons
      name={iconName}
      size={size}
      color={focused ? colors.BLACK : colors.GRAY_500}
    />
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({navigation, route}) => ({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.getParent()?.navigate(mainNavigations.CHAT)
            }
            style={{marginRight: 10}}>
            <MaterialIcons name="chat" size={24} color={colors.BLACK} />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: colors.BLACK,
        tabBarInactiveTintColor: colors.GRAY_500,
        tabBarActiveBackgroundColor: colors.PINK_200,
        tabBarInactiveBackgroundColor: colors.WHITE,
        tabBarStyle: {
          height: 60,
          paddingBottom: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        },
        tabBarIcon: ({size, focused}) => TabBarIcons({route, size, focused}),
      })}>
      <Tab.Screen
        name={mainNavigations.HOME}
        component={HomeStackNavigator}
        options={{title: '홈'}}
      />
      <Tab.Screen
        name={mainNavigations.MATCHING}
        component={MatchingStackNavigator}
        options={{title: '매칭', headerShown: true}}
      />
      <Tab.Screen
        name={mainNavigations.COMMUNITY}
        component={CommunityStackNavigator}
        options={{title: '커뮤니티'}}
      />
      <Tab.Screen
        name={mainNavigations.PROFILE}
        component={ProfileStackNavigator}
        options={{title: '프로필'}}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
