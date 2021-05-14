const initState = {
  auth: {
    token: localStorage.getItem('token'),
    user: null,
    authenticated: false,
    loading: true,
    errorMessage: null,
  },
  category: {
    list: null,
    loading: false,
    errorMessage: null,
  },
  product: {
    data: {
      list: null,
      order: null,
      sortBy: '',
      limit: 0,
      skip: 0,
      total: 0,
    },
    loading: false,
    errorMessage: null,
  },
  page: {
    list: null,
    loading: false,
    errorMessage: null,
  },
};

export default initState;
