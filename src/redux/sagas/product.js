import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../types/product';
import * as actions from '../actions/product';
import * as services from '../../services/product';
import { toast } from 'react-toastify';
import { logout } from '../actions/auth';

function* addProduct({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.addProduct, payload.product);
    console.log(res);
    payload.cb();
    yield put(actions.addProductSuccess(res.data.product));
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
      yield put(actions.addProductFailure(error.response.data.error));
    } else {
      if (error.response.status === 401) {
        yield put(logout());
      } else {
        toast.error('Add product failed! Please try again!');
        yield put(
          actions.addProductFailure('Add product failed! Please try again!')
        );
      }
    }
  }
  yield put(actions.removeLoading());
}

function* getProducts({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.getProducts, payload);
    yield put(actions.getProductsSuccess(res.data.result));
  } catch (error) {
    toast.error('Add product failed! Please try again!');
    yield put(
      actions.getProductsFailure('Add product failed! Please try again!')
    );
  }
  yield put(actions.removeLoading());
}

function* watcherAddProduct() {
  yield takeLatest(types.ADD_PRODUCT, addProduct);
}

function* watcherGetProducts() {
  yield takeLatest(types.GET_PRODUCTS, getProducts);
}

export default function* productSaga() {
  yield all([watcherAddProduct(), watcherGetProducts()]);
}
