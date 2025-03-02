import {axiosInstance} from '@/utils';

export type CalendarMarker = {
  id: number;
  title: string;
  address: string;
};

export type ResponseCalendarMarker = Record<number, CalendarMarker[]>;

export const getCalendarMarkers = async (
  year: number,
  month: number,
): Promise<ResponseCalendarMarker> => {
  const {data} = await axiosInstance.get(
    `/marker/calendar?year=${year}&month=${month}`,
  );

  return data.data;
};
