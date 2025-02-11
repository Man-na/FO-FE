import {Marker, UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {getMarkers} from '../api';
import {queryKeys} from '@/constants';

export const useGetMarkers = (
  queryOptions?: UseQueryCustomOptions<Marker[]>,
) => {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
};
