import {CustomMatching, RapidMatching} from '@/types';
import {axiosInstance} from '@/utils';

export type RequestCreateRapidMatching = {
  priority1Day: string | null;
  priority2Day: string | null;
  agePreference: string;
};

export type ResponseRapidMatching = RapidMatching;

export const createRapidMatching = async (
  body: RequestCreateRapidMatching,
): Promise<ResponseRapidMatching> => {
  const {data} = await axiosInstance.post('/matching/rapid-matching', body);
  return data.data;
};

export type RequestCreateCustomMatching = {
  meetingDate: string;
  location: string;
  agePreference: string;
  atmospheres: string[];
};

export type ResponseCustomMatching = CustomMatching;

export const createCustomMatching = async (
  body: RequestCreateCustomMatching,
): Promise<ResponseCustomMatching> => {
  const {data} = await axiosInstance.post('/matching/custom-matching', body);
  return data.data;
};
