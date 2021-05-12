import * as types from '../types/auth';

export const setLoading = () => {
  return { type: types.SET_LOADING };
};

export const removeLoading = () => {
  return { type: types.REMOVE_LOADING };
};

export const login = (user) => {
  return { type: types.LOGIN, payload: user };
};

export const loadUser = (token) => {
  return { type: types.LOAD_USER, payload: token };
};

export const loginSuccess = (data) => {
  return { type: types.LOGIN_SUCCESS, payload: data };
};

export const loginFailure = (errorMessage) => {
  return { type: types.LOGIN_FAILURE, payload: errorMessage };
};

export const register = (user, cb) => {
  return { type: types.REGISTER_USER, payload: { user, cb } };
};

export const registerSuccess = () => {
  return { type: types.REGISTER_USER_SUCCESS };
};

export const registerFailure = (errorMessage) => {
  return { type: types.REGISTER_USER_FAILURE, payload: errorMessage };
};

export const logout = () => {
  return { type: types.LOGOUT };
};
