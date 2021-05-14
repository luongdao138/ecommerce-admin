import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';
import pageReducer from './page';
import productReducer from './product';

const reducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer,
});

export default reducers;
