import axios from 'axios';
import { notification } from 'antd';

const AniApiConfig = axios.create({
    baseURL: 'https://api.aniapi.com/v1',
    timeout: 5000
  });

// Add a request interceptor
AniApiConfig.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    console.error(JSON.stringify(error));
    notification.error({ message: "Ocurrió un error al comunicarse con AniApi: " + error?.message});
    return Promise.reject(error);
  });

// Add a response interceptor
AniApiConfig.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error(JSON.stringify(error));
    notification.error({ message: "Ocurrió un error al comunicarse con AniApi: " + error?.message});
    return Promise.reject(error);
  });

export { AniApiConfig };