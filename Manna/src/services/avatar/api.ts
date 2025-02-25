import {axiosInstance} from '@/utils';

export const getHats = async (): Promise<string[]> => {
  const {data} = await axiosInstance.get('/avatar/hats');

  return data.data;
};

export const getFaces = async (): Promise<string[]> => {
  const {data} = await axiosInstance.get('/avatar/faces');

  return data.data;
};

export const getTops = async (): Promise<string[]> => {
  const {data} = await axiosInstance.get('/avatar/tops');

  return data.data;
};

export const getBottoms = async (): Promise<string[]> => {
  const {data} = await axiosInstance.get('/avatar/bottoms');

  return data.data;
};

export const getHands = async (): Promise<string[]> => {
  const {data} = await axiosInstance.get('/avatar/hands');

  return data.data;
};

export const getSkins = async (): Promise<string[]> => {
  const {data} = await axiosInstance.get('/avatar/skins');

  return data.data;
};
