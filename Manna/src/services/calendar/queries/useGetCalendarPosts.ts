import {queryKeys} from '@/constants';
import type {UseQueryCustomOptions} from '@/types';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getCalendarPosts, ResponseCalendarPost} from '../api';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
