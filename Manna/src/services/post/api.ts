import {ImageUri, Marker, Post} from '@/types';
import {axiosInstance} from '@/utils';

export type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
export type ResponsePost = Post & {imageUris: ImageUri[]};

export const createPost = async (
  body: RequestCreatePost,
): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data.data;
};

export const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data.data;
};
