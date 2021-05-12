import initState from '../initState';
import * as types from '../types/product';

const productReducer = (state = initState.product, action) => {
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
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default productReducer;
