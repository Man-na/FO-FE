import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';
import {createCustomMatching} from '../api';

export const useCreateCustomMatching = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createCustomMatching,
    ...mutationOptions,
  });
};
