import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {queryClient} from '@/utils';
import {useMutation} from '@tanstack/react-query';
import {createMarker} from '../api';

export const useMutateCreateMarker = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createMarker,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
};
