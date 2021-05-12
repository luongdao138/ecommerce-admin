import axios from 'axios';

const rootUrl = 'http://localhost:5000/api/v1/products';

export const addProduct = (product) => {
  return axios.post(rootUrl, product, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

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
  return axios.get(`${rootUrl}?${queryArray.join('&')}`);
};
