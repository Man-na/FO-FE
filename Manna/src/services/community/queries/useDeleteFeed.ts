import {useMutation} from '@tanstack/react-query';
import {deleteFeed} from '../api';
import {queryClient} from '@/utils';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';

export const useDeleteFeed = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FEED, queryKeys.GET_FEEDS],
      });
    },
    ...mutationOptions,
  });
};
