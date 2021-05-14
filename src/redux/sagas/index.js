import { all } from 'redux-saga/effects';
import authSaga from './auth';
import categorySaga from './category';
import productSaga from './product';
import pageSaga from './page';

export default function* rootSaga() {
  yield all([authSaga(), categorySaga(), productSaga(), pageSaga()]);
}
