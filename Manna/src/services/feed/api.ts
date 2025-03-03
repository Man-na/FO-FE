import {Feed, ImageUri, VoteOption} from '@/types';
import {axiosInstance} from '@/utils';

export type RequestCreateFeed = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string;
  voteOptions?: VoteOption[];
};
export type ResponseFeed = Feed & {images: ImageUri[]};

export const getFeedsWithPagination = async (
  page = 1,
): Promise<ResponseFeed[]> => {
  const {data} = await axiosInstance.get(`/feed/feeds?page=${page}`);

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

export const getMyFeeds = async (): Promise<Feed[]> => {
  const {data} = await axiosInstance.get('/feed/my');
  return data.data;
};

export const deleteFeed = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.delete(`/feed/${id}`);
  return data.data;
};
