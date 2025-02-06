import {axiosInstance} from './axios';

export const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

export const removeHeader = (key: string) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
};
