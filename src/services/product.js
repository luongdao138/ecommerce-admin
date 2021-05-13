import axios from '../helpers/axios';

export const addProduct = (product) => axios.post('/products', product);

export const getProducts = (config) => {
  const { order, sortBy, limit, skip } = config;
  let queryArray = [];
  if (order) {
    queryArray.push(`order=${order}`);
  }
  if (sortBy) {
    queryArray.push(`sortBy=${sortBy}`);
  }
  if (limit) {
    queryArray.push(`limit=${limit}`);
  }
  if (skip) {
    queryArray.push(`skip=${skip}`);
  }
  return axios.get(`/products?${queryArray.join('&')}`);
};
