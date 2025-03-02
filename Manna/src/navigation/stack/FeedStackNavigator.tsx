import {colors, feedNavigations} from '@/constants';
import {AddFeedScreen} from '@/screens/feed/AddFeedScreen';
import {FeedDetailScreen} from '@/screens/feed/FeedDetailScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Pressable} from 'react-native';
import {LatLng} from 'react-native-maps';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_FEED]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
  [feedNavigations.ADD_FEED]: undefined;
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
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
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={() => ({
          headerTitle: '피드',
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: ' ',
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.ADD_FEED}
        component={AddFeedScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '피드 작성',
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

export default FeedStackNavigator;
