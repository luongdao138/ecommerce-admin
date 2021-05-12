import axios from 'axios';

const rootUrl = 'http://localhost:5000/api/v1/categories';

export const getAllCategories = () => {
  return axios.get(rootUrl);
};

export const addCategory = (category) => {
  return axios.post(rootUrl, category, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updatedCategories = (data) => {
  return axios.post(`${rootUrl}/update`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
