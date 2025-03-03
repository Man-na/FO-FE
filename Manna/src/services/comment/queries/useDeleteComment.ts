import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {queryClient} from '@/utils';
import {useMutation} from '@tanstack/react-query';
import {deleteComment} from '../api';

export const useDeleteComment = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (feedId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FEED, queryKeys.GET_FEED, feedId],
      });
    },
    ...mutationOptions,
  });
};
