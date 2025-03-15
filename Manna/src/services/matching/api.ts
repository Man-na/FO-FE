import {RapidMatching} from '@/types';
import {axiosInstance} from '@/utils';

export type RequestCreateRapidMatching = {
  priority1Day: string | null;
  priority2Day: string | null;
  agePreference: string;
};

export type ResponseRapidMatching = RapidMatching;

export const createReapidMatching = async (
  body: RequestCreateRapidMatching,
): Promise<ResponseRapidMatching> => {
  const {data} = await axiosInstance.post('/matching/rapid-matching', body);
  return data.data;
};
