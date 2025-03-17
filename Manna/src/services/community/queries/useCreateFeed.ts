import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {queryClient} from '@/utils';
import {useMutation} from '@tanstack/react-query';
import {createFeed} from '../api';

export const useCreateFeed = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FEED, queryKeys.GET_FEEDS],
      });
    },
    ...mutationOptions,
  });
};
