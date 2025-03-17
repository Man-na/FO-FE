import Ionicons from '@react-native-vector-icons/ionicons';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet} from 'react-native';

import {FeedList} from '@/components/community/feed';
import {colors, communityNavigations, mainNavigations} from '@/constants';
import {CommunityStackParamList} from '@/navigation/stack/CommunityStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {useAuth} from '@/services/auth';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof mainNavigations.COMMUNITY>,
  StackNavigationProp<CommunityStackParamList>
>;

export const WorkerFeedScreen = () => {
  const navigation = useNavigation<Navigation>();
  const {getProfileQuery} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <FeedList categoryId={3} />
      {getProfileQuery.data?.id && (
        <Pressable
          style={styles.writeButton}
          onPress={() => navigation.navigate(communityNavigations.ADD_FEED)}>
          <Ionicons name="pencil" size={20} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  writeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.PINK_500,
    width: 48,
    height: 48,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
