import axios from '../helpers/axios';

export const login = (user) => {
  return axios.post(`/admin/auth/login`, user);
};

export const register = (user) => axios.post(`/admin/auth/register`, user);

export const getUser = (token) => axios.post(`/admin/auth/getuser`, { token });
