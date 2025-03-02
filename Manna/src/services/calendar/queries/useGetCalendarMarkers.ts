import {queryKeys} from '@/constants';
import type {UseQueryCustomOptions} from '@/types';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getCalendarMarkers, ResponseCalendarMarker} from '../api';

export const useGetCalendarMarkers = (
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarMarker>,
) => {
  return useQuery({
    queryFn: () => getCalendarMarkers(year, month),
    queryKey: [queryKeys.MARKER, queryKeys.GET_CALENDAR_MARKERS, year, month],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
};
