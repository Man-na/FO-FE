import {queryKeys} from '@/constants';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {getMarkersWithPagination, ResponseMarker} from '../api';
import {ResponseError} from '@/types';

export const useGetInfiniteMarkers = (
  queryOptions?: UseInfiniteQueryOptions<
    ResponseMarker[],
    ResponseError,
    InfiniteData<ResponseMarker[], number>,
    ResponseMarker[],
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getMarkersWithPagination(pageParam),
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      const lastMarker = lastPage[lastPage.length - 1];
      return lastMarker ? allpages.length + 1 : undefined;
    },
    ...queryOptions,
  });
};
