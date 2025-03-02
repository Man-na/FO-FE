import {queryKeys} from '@/constants';
import {Feed, UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {getFeeds} from '../api';

export const useGetFeeds = (queryOptions?: UseQueryCustomOptions<Feed[]>) => {
  return useQuery({
    queryFn: getFeeds,
    queryKey: [queryKeys.FEED, queryKeys.GET_FEEDS],
    ...queryOptions,
  });
};
