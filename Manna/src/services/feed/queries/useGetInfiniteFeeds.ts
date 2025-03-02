import {queryKeys} from '@/constants';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {getFeedsWithPagination, ResponseFeed} from '../api';
import {ResponseError} from '@/types';

export const useGetInfiniteFeeds = (
  queryOptions?: UseInfiniteQueryOptions<
    ResponseFeed[],
    ResponseError,
    InfiniteData<ResponseFeed[], number>,
    ResponseFeed[],
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getFeedsWithPagination(pageParam),
    queryKey: [queryKeys.FEED, queryKeys.GET_FEEDS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      const lastFeed = lastPage[lastPage.length - 1];
      return lastFeed ? allpages.length + 1 : undefined;
    },
    ...queryOptions,
  });
};
