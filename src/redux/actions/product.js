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

export const getProductsFailure = (errorMessage) => ({
  type: types.GET_PRODUCTS_FAILURE,
  payload: errorMessage,
});

export const updateProducts = (data) => {
  return { type: types.UPDATE_PRODUCT, payload: data };
};

export const updateProductsSuccess = () => {
  return { type: types.UPDATE_PRODUCT_SUCCESS };
};

export const updateProductsFailure = (errorMessage) => {
  return { type: types.UPDATE_PRODUCT_FAILURE, payload: errorMessage };
};

export const uploadPhotos = (slug, data, cb) => {
  return { type: types.UPLOAD_PHOTOS, payload: { slug, cb, data } };
};

export const uploadPhotosSuccess = () => {
  return { type: types.UPLOAD_PHOTOS_SUCCESS };
};

export const updatePhoto = (slug, data, cb) => {
  return { type: types.UPDATE_PHOTO, payload: { slug, cb, data } };
};

export const deletePhoto = (slug, filename, cb) => {
  return { type: types.DELETE_PHOTO, payload: { slug, filename, cb } };
};
