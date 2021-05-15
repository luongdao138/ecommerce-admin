import { combineReducers } from 'redux';
import authReducer from './auth';
import categoryReducer from './category';
import pageReducer from './page';
import productReducer from './product';
import bannerReducer from './banner';

const reducers = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer,
  banner: bannerReducer,
});

export default reducers;
