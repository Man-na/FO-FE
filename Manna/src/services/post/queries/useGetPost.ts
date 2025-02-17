import {UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {getPost, ResponseSinglePost} from '../api';
import {queryKeys} from '@/constants';

export const useGetPost = (
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) => {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
};
