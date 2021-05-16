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

export const getProductBySlug = (slug) => axios.get(`/products/detail/${slug}`);

export const updateProduct = (data) =>
  axios.put(`/products/${data.slug}`, data);

export const uploadMorePhotos = (slug, data) =>
  axios.put(`/products/photos/${slug}`, data);

export const updatePhoto = (slug, data) =>
  axios.put(`/products/photos/update/${slug}`, data);

export const deletePhoto = (slug, filename) =>
  axios.put(`/products/photos/delete/${slug}`, { filename });
