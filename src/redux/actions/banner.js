import * as types from '../types/banner';

export const setLoading = () => {
  return { type: types.SET_LOADING };
};

export const removeLoading = () => {
  return { type: types.REMOVE_LOADING };
};

export const createBanner = (data, cb) => ({
  type: types.CREATE_BANNER,
  payload: { data, cb },
});

export const createBannerSuccess = (newBanner) => ({
  type: types.CREATE_BANNER_SUCCESS,
  payload: newBanner,
});

export const createBannerFailure = (errorMessage) => ({
  type: types.CREATE_BANNER_FAILURE,
  payload: errorMessage,
});

export const getBanners = () => ({
  type: types.GET_BANNERS,
});

export const getBannerSuccess = (banners) => ({
  type: types.GET_BANNERS_SUCCESS,
  payload: banners,
});

export const updateBanner = (id, data, cb) => ({
  type: types.UPDATE_BANNER,
  payload: { id, data, cb },
});

export const updateBannerSuccess = (updatedBanner) => ({
  type: types.UPDATE_BANNER_SUCCESS,
  payload: updatedBanner,
});

export const updateBannerFailure = (errorMessage) => ({
  type: types.UPDATE_BANNER_FAILURE,
  payload: errorMessage,
});

export const deleteBanner = (id, cb) => ({
  type: types.DELETE_BANNER,
  payload: { id, cb },
});

export const deleteBannerSuccess = (id) => ({
  type: types.DELETE_BANNER_SUCCESS,
  payload: id,
});

export const deleteBannerFailure = (errorMessage) => ({
  type: types.DELETE_BANNER_FAILURE,
  payload: errorMessage,
});
