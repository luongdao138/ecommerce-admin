import axios from 'axios';

export const createPage = (data) =>
  axios.post('http://localhost:5000/api/v1/admin/pages', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
