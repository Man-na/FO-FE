import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {getFeed, ResponseSingleFeed} from '../api';

export const useGetFeed = (
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSingleFeed>,
) => {
  return useQuery({
    queryFn: () => getFeed(Number(id)),
    queryKey: [queryKeys.FEED, queryKeys.GET_FEED, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
};
