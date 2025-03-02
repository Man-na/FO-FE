import {Feed, ImageUri} from '@/types';
import {axiosInstance} from '@/utils';

export type RequestCreateFeed = Omit<Feed, 'id'> & {imageUris: ImageUri[]};
export type ResponseFeed = Feed & {images: ImageUri[]};

export const getFeedsWithPagination = async (
  page = 1,
): Promise<ResponseFeed[]> => {
  const {data} = await axiosInstance.get(`/feed/my?page=${page}`);

  return data.data.content;
};

export const createFeed = async (
  body: RequestCreateFeed,
): Promise<ResponseFeed> => {
  const {data} = await axiosInstance.post('/feed', body);
  return data.data;
};

export type ResponseSingleFeed = ResponseFeed & {isFavorite: boolean};

export const getFeed = async (id: number): Promise<ResponseSingleFeed> => {
  const {data} = await axiosInstance.get(`/feed/${id}`);
  return data.data;
};

export const getFeeds = async (): Promise<Feed[]> => {
  const {data} = await axiosInstance.get('/feed/my');
  return data.data;
};
