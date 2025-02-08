import {Platform} from 'react-native';
import axios from 'axios';

const baseURL =
  Platform.OS === 'ios'
    ? 'http://localhost:9000/api/v1'
    : 'http://10.0.2.2:9000/api/v1';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
