import {Category, Profile} from '@/types/domain';
import {axiosInstance, getEncryptStorage} from '@/utils';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/user/signup', {
    email,
    password,
  });

  return data.data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/user/login', {
    email,
    password,
  });

  return data.data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/user/me');

  return data.data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/user/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data.data;
};

const logout = async () => {
  await axiosInstance.post('/user/logout');
};

export {getAccessToken, getProfile, logout, postLogin, postSignup};
export type {RequestUser, ResponseToken, ResponseProfile};
