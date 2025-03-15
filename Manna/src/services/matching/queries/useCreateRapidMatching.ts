import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';
import {createReapidMatching} from '../api';

export const useCreateRapidMatching = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createReapidMatching,
    ...mutationOptions,
  });
};
