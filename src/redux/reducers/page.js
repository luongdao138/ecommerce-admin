import initState from '../initState';

import * as types from '../types/page';

const pageReducer = (state = initState.page, action) => {
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
    case types.CREATE_PAGE_SUCCESS:
      return {
        ...state,
        errorMessage: null,
      };
    case types.CREATE_PAGE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default pageReducer;
