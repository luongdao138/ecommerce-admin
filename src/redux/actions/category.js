import * as types from '../types/category';

export const setLoading = () => {
  return { type: types.SET_LOADING };
};

export const removeLoading = () => {
  return { type: types.REMOVE_LOADING };
};

export const getAllCategories = () => {
  return { type: types.GET_ALL_CATEGORIES };
};

export const getAllCategoriesSucess = (data) => {
  return { type: types.GET_ALL_CATEGORIES_SUCCESS, payload: data };
};

export const addCategory = (category, cb) => {
  return { type: types.ADD_CATEGORY, payload: { category, cb } };
};

export const addCategorySuccess = (newCategory) => {
  return { type: types.ADD_CATEGORY_SUCCESS, payload: newCategory };
};

export const addCategoryFailure = (errorMessage) => {
  return { type: types.ADD_CATEGORY_FAILURE, payload: errorMessage };
};

export const updateCategory = (data, cb) => {
  return { type: types.UPDATE_CATEGORY, payload: { data, cb } };
};

export const updateCategorySuccess = (categories) => {
  return { type: types.UPDATE_CATEGORY_SUCCESS, payload: categories };
};

export const updateCategoryFailure = (errorMessage) => {
  return { type: types.UPDATE_CATEGORY_FAILURE, payload: errorMessage };
};

export const deleteCategories = (ids, cb) => {
  return { type: types.DELETE_CATEGORIES, payload: { ids, cb } };
};
