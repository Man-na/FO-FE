import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {queryClient} from '@/utils';
import {useMutation} from '@tanstack/react-query';
import {createPost} from '..';

export const useMutateCreatePost = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
};
