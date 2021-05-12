import * as types from '../types/product';

export const setLoading = () => {
  return { type: types.SET_LOADING };
};

export const removeLoading = () => {
  return { type: types.REMOVE_LOADING };
};

export const addProduct = (product, cb) => {
  return { type: types.ADD_PRODUCT, payload: { product, cb } };
};

export const addProductSuccess = (newProduct) => {
  return { type: types.ADD_PRODUCT_SUCCESS, payload: newProduct };
};

export const addProductFailure = (errorMessage) => {
  return { type: types.ADD_PRODUCT_FAILURE, payload: errorMessage };
};

export const getProducts = (config) => {
  return { type: types.GET_PRODUCTS, payload: config };
};

export const getProductsSuccess = (result) => {
  return { type: types.GET_PRODUCTS_SUCCESS, payload: result };
};

export const getProductsFailure = (errorMessage) => {
  return { type: types.GET_PRODUCTS_FAILURE, payload: errorMessage };
};
