import axios from 'axios';

const rootUrl = 'http://localhost:5000/api/v1/auth';

export const login = (user) => {
  return axios.post(`${rootUrl}/login`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const register = (user) => {
  return axios.post(`${rootUrl}/register`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getUser = (token) => {
  return axios.post(
    `${rootUrl}/getuser`,
    { token },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
