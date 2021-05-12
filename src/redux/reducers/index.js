import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';
import productReducer from './product';

const reducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export default reducers;
