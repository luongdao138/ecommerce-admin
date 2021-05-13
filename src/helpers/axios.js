import axios from 'axios';
import { rootUrl } from '../constants/urlConfig';
import { logout } from '../redux/actions/auth';
import configureStore from '../redux/store';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: rootUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return req;
});

export default axiosInstance;
