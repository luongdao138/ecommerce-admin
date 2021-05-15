import * as types from '../types/banner';
import initState from '../initState';

const bannerReducer = (state = initState.banner, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.REMOVE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case types.CREATE_BANNER_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list],
        errorMessage: null,
      };

    case types.UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        list: state.list.map((banner) => {
          if (banner._id === action.payload._id) return action.payload;
          else return banner;
        }),
        errorMessage: null,
      };
    case types.DELETE_BANNER_SUCCESS:
      return {
        ...state,
        list: state.list.filter((banner) => banner._id !== action.payload),
      };
    case (types.UPDATE_BANNER_FAILURE,
    types.DELETE_BANNER_FAILURE,
    types.CREATE_BANNER_FAILURE):
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.GET_BANNERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default bannerReducer;
