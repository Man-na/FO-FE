import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';
import {uploadImages} from '../api';

export const useUploadImages = (mutateOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: uploadImages,
    ...mutateOptions,
  });
};
