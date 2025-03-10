import {colors, mainNavigations} from '@/constants';
import FeedStackNavigator, {
  FeedStackParamList,
} from '@/navigation/stack/FeedStackNavigator';
import MapStackNavigator, {
  MapStackParamList,
} from '@/navigation/stack/MapStackNavigator';
import SettingStackNavigator, {
  SettingStackParamList,
} from '@/navigation/stack/SettingStackNavigator';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import React from 'react';
import ProfileStackNavigator from '../stack/ProfileStackNavigator';

export type MainTabParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedStackParamList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.PROFILE]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
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
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'location-on';
      size = 16;
      break;
    }
    case mainNavigations.FEED: {
      iconName = 'book';
      size = 16;
      break;
    }
    case mainNavigations.CALENDAR: {
      iconName = 'event-note';
      size = 16;
      break;
    }
    case mainNavigations.PROFILE: {
      iconName = 'person';
      size = 16;
      break;
    }
    case mainNavigations.SETTING: {
      iconName = 'settings';
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

function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
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
        component={MapStackNavigator}
        options={{title: '홈'}}
      />
      <Tab.Screen
        name={mainNavigations.FEED}
        component={FeedStackNavigator}
        options={{title: '피드'}}
      />
      <Tab.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{title: '캘린더', headerShown: true}}
      />
      <Tab.Screen
        name={mainNavigations.PROFILE}
        component={ProfileStackNavigator}
        options={{title: '프로필'}}
      />
      <Tab.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={{title: '설정'}}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
