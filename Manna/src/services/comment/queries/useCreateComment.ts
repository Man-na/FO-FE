import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {queryClient} from '@/utils';
import {useMutation} from '@tanstack/react-query';
import {createComment} from '../api';

export const useCreateComment = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (feedId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FEED, queryKeys.GET_FEED, feedId],
      });
    },
    ...mutationOptions,
  });
};
