import {colors} from '@/constants';
import {useGetInfiniteFeeds} from '@/services/feed';
import {useScrollToTop} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {FeedItem} from './FeedItem';

interface FeedListProps {}

export const FeedList = ({}: FeedListProps): React.JSX.Element => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const {
    data: feeds,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFeeds();

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
      ref={ref}
      data={feeds?.pages.flat()}
      renderItem={({item}) => <FeedItem feed={item} />}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
