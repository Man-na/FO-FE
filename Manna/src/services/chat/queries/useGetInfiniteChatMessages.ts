import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {ChatMessagesResponse, getChatMessagesWithPagination} from '../api';

export const useGetInfiniteChatMessages = (
  chatRoomId: number,
  queryOptions?: UseInfiniteQueryOptions<
    ChatMessagesResponse,
    ResponseError,
    InfiniteData<ChatMessagesResponse, number>,
    ChatMessagesResponse,
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam = 1}) =>
      getChatMessagesWithPagination(chatRoomId, pageParam),
    queryKey: [queryKeys.CHAT, queryKeys.GET_CHAT_MESSAGES, chatRoomId],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasNext) {
        return allPages.length + 1;
      }
      return undefined;
    },
    ...queryOptions,
  });
};
