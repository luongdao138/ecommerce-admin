import initState from '../initState';
import * as types from '../types/auth';

const authReducer = (state = initState.auth, action) => {
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
    case types.LOGIN_SUCCESS:
      const { token, user } = action.payload;
      return {
        ...state,
        authenticated: true,
        token,
        user,
        errorMessage: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        token: null,
        user: null,
        errorMessage: action.payload,
      };
    case types.REGISTER_USER_FAILURE:
      return {
        ...state,
        authenticated: false,
        token: null,
        user: null,
        errorMessage: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null,
        user: null,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default authReducer;
