import * as types from '../types/page';

export const setLoading = () => {
  return { type: types.SET_LOADING };
};

export const removeLoading = () => {
  return { type: types.REMOVE_LOADING };
};

export const createPage = (data, cb) => {
  return { type: types.CREATE_PAGE, payload: { data, cb } };
};

export const createPageSuccess = () => {
  return { type: types.CREATE_PAGE_SUCCESS };
};

export const createPageFailure = (errorMessage) => {
  return { type: types.CREATE_PAGE_FAILURE, payload: errorMessage };
};
