import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LatLng} from 'react-native-maps';

import {BackButton} from '@/components/common';
import {colors, communityNavigations} from '@/constants';
import {
  AddFeedScreen,
  CommunityHomeScreen,
  FeedDetailScreen,
  FreeFeedScreen,
  PremiumPartyFeedScreen,
  StudentFeedScreen,
  WorkerFeedScreen,
} from '@/screens/community';

export type CommunityStackParamList = {
  [communityNavigations.COMMUNITY_HOME]: undefined;
  [communityNavigations.FREE_FEED]: undefined;
  [communityNavigations.STUDENT_FEED]: undefined;
  [communityNavigations.WORKER_FEED]: undefined;
  [communityNavigations.PREMIUM_PARTY_FEED]: undefined;
  [communityNavigations.FEED_DETAIL]: {id: number};
  [communityNavigations.EDIT_FEED]: {location: LatLng};
  [communityNavigations.IMAGE_ZOOM]: {index: number};
  [communityNavigations.ADD_FEED]: undefined;
};

const Stack = createStackNavigator<CommunityStackParamList>();

const CommunityStackNavigator = () => {
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
        name={communityNavigations.COMMUNITY_HOME}
        component={CommunityHomeScreen}
        options={() => ({
          headerTitle: '피드',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={communityNavigations.FREE_FEED}
        component={FreeFeedScreen}
        options={() => ({
          headerTitle: '자유게시판',
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={communityNavigations.STUDENT_FEED}
        component={StudentFeedScreen}
        options={() => ({
          headerTitle: '대학생게시판',
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={communityNavigations.WORKER_FEED}
        component={WorkerFeedScreen}
        options={() => ({
          headerTitle: '직장인게시판',
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={communityNavigations.PREMIUM_PARTY_FEED}
        component={PremiumPartyFeedScreen}
        options={() => ({
          headerTitle: '프리미엄파티',
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={communityNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={() => ({
          headerShown: true,
          headerTitle: '피드 상세',
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
          headerLeft: () => <BackButton />,
        })}
      />
      <Stack.Screen
        name={communityNavigations.ADD_FEED}
        component={AddFeedScreen}
        options={() => ({
          headerShown: true,
          headerTitle: '글쓰기',
          headerLeft: () => <BackButton />,
        })}
      />
    </Stack.Navigator>
  );
};

export default CommunityStackNavigator;
