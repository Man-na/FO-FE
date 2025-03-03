import {colors, feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigation/stack/FeedStackNavigator';
import {useAuth} from '@/services/auth';
import {ResponseFeed} from '@/services/feed';
import {useDeleteFeed} from '@/services/feed/queries/useDeleteFeed';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import {Profile} from './Profile';
interface FeedListProps {
  feed: ResponseFeed;
  isDetail?: boolean;
}

export const FeedItem = ({
  feed,
  isDetail = false,
}: FeedListProps): React.JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  const {getProfileQuery} = useAuth();
  const likeUsers = feed.likes?.map(like => Number(like.userId));
  const isLiked = likeUsers.includes(getProfileQuery.data?.id ?? -1);
  const deleteFeed = useDeleteFeed();

  const handlePressOption = () => {
    const options = ['삭제', '수정', '취소'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case destructiveButtonIndex:
            deleteFeed.mutate(feed.id, {
              onSuccess: () => isDetail && navigation.goBack(),
            });
            break;
          case 1:
            // 수정 페이지로 이동
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      },
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      navigation.navigate(feedNavigations.FEED_DETAIL, {id: feed.id});
    }
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <Profile
          imageUri={feed.author?.imageUri}
          nickname={feed.author?.nickname}
          createdAt={feed?.createdAt}
          onPress={() => {}}
          option={
            getProfileQuery.data?.id === feed.author?.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
        <Text style={styles.title}>{feed.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {feed.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={16}
            color={isLiked ? colors.PINK_700 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {feed.likes.length || '좋아요'}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>
            {(feed.comments && feed.comments.length) || '댓글'}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{feed.viewCount}</Text>
        </Pressable>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: '600',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 14,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: '33%',
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  activeMenuText: {
    fontWeight: '500',
    color: colors.PINK_500,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.PINK_500,
    backgroundColor: colors.PINK_200,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  voteTextContainer: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PINK_500,
  },
  voteCountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
});
