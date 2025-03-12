import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {getChatRoomsWithPagination, ResponseChatRoom} from '../api';

export const useGetInfiniteChatRooms = (
  queryOptions?: UseInfiniteQueryOptions<
    ResponseChatRoom[],
    ResponseError,
    InfiniteData<ResponseChatRoom[], number>,
    ResponseChatRoom[],
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getChatRoomsWithPagination(pageParam),
    queryKey: [queryKeys.CHAT, queryKeys.GET_CHAT_ROOMS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      const lastFeed = lastPage[lastPage.length - 1];
      return lastFeed ? allpages.length + 1 : undefined;
    },
    ...queryOptions,
  });
};
