import {queryKeys} from '@/constants';
import {Marker, UseMutationCustomOptions} from '@/types';
import {queryClient} from '@/utils';
import {useMutation} from '@tanstack/react-query';
import {createPost} from '../api';

export const useMutateCreatePost = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });

      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
};
