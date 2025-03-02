import {ImageUri, Marker} from '@/types';
import {axiosInstance} from '@/utils';

export type RequestCreateMarker = Omit<Marker, 'id'> & {imageUris: ImageUri[]};
export type ResponseMarker = Marker & {images: ImageUri[]};

export const getMarkersWithPagination = async (
  page = 1,
): Promise<ResponseMarker[]> => {
  const {data} = await axiosInstance.get(`/marker/markers/my?page=${page}`);

  return data.data.content;
};

export const createMarker = async (
  body: RequestCreateMarker,
): Promise<ResponseMarker> => {
  const {data} = await axiosInstance.post('/marker', body);
  return data.data;
};

export type ResponseSingleMarker = ResponseMarker & {isFavorite: boolean};

export const getMarker = async (id: number): Promise<ResponseSingleMarker> => {
  const {data} = await axiosInstance.get(`/marker/${id}`);
  return data.data;
};

export const getMarkers = async (): Promise<Marker[]> => {
  const {data} = await axiosInstance.get('/marker/markers/my');
  return data.data;
};

export const uploadImages = async (body: FormData): Promise<string[]> => {
  const {data} = await axiosInstance.post('/marker/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};
