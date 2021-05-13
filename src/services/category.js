import axios from '../helpers/axios';

export const getAllCategories = () => axios.get('/categories');

export const addCategory = (category) => axios.post('/categories', category);

export const updatedCategories = (data) =>
  axios.post('/categories/update', data);

export const deleteCategories = (ids) =>
  axios.post(`/categories/delete`, { ids });
