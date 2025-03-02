import {FeedList} from '@/components/feed/FeedList';
import {colors, feedNavigations, mainNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigation/stack/FeedStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {useAuth} from '@/services/auth';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof mainNavigations.FEED>,
  StackNavigationProp<FeedStackParamList>
>;

interface FeedHomeScreenProps {}

function FeedHomeScreen({}: FeedHomeScreenProps): React.JSX.Element {
  const navigation = useNavigation<Navigation>();
  const {getProfileQuery} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      {getProfileQuery.data?.id && (
        <Pressable
          style={styles.writeButton}
          onPress={() => navigation.navigate(feedNavigations.ADD_FEED)}>
          <Ionicons name="pencil" size={20} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

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

export default FeedHomeScreen;
