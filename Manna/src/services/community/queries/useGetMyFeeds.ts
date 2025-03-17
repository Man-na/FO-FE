import {queryKeys} from '@/constants';
import {Feed, UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {getMyFeeds} from '../api';

export const useGetMyFeeds = (queryOptions?: UseQueryCustomOptions<Feed[]>) => {
  return useQuery({
    queryFn: getMyFeeds,
    queryKey: [queryKeys.FEED, queryKeys.GET_FEEDS],
    ...queryOptions,
  });
};
