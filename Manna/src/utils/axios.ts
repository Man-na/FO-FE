import {Platform} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

export const s3BaseUrl = Config.S3_BASE_URL;

const baseUrl =
  Platform.OS === 'ios'
    ? 'http://localhost:9000/api/v1'
    : 'http://10.0.2.2:9000/api/v1';

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
