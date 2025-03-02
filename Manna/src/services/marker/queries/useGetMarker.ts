import {UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {getMarker, ResponseSingleMarker} from '../api';
import {queryKeys} from '@/constants';

export const useGetMarker = (
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSingleMarker>,
) => {
  return useQuery({
    queryFn: () => getMarker(Number(id)),
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKER, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
};
