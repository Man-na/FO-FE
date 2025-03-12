import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {queryClient} from '@/utils';
import {useMutation} from '@tanstack/react-query';
import {createChatRoom} from '../api';

export const useCreateChatRoom = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CHAT, queryKeys.GET_CHAT_ROOMS],
      });
    },
    ...mutationOptions,
  });
};
