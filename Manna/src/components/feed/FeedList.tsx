import {useGetInfinitePosts} from '@/services/post';
import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {FeedItem} from './FeedItem';

interface FeedListProps {}

export const FeedList = ({}: FeedListProps): React.JSX.Element => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
