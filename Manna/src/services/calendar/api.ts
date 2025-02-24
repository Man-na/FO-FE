import {axiosInstance} from '@/utils';

export type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

export type ResponseCalendarPost = Record<number, CalendarPost[]>;

export const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPost> => {
  const {data} = await axiosInstance.get(
    `/post/calendar?year=${year}&month=${month}`,
  );

  return data.data;
};
