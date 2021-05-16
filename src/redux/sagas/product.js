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

function* updateProduct({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.updateProduct, payload);
    console.log(res);
    yield put(actions.updateProductsSuccess());
    toast.success(res.data.message);
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
      yield put(actions.updateProductsFailure(error.response.data.error));
    } else {
      if (error.response.status === 401) {
        yield put(logout());
      } else {
        toast.error('Update product failed! Please try again!');
        yield put(
          actions.updateProductsFailure('Add product failed! Please try again!')
        );
      }
    }
  }
  yield put(actions.removeLoading());
}

function* uploadPhotos({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(
      services.uploadMorePhotos,
      payload.slug,
      payload.data
    );
    console.log(res);
    yield put(actions.uploadPhotosSuccess());
    payload.cb(res.data.images);
    toast.success(res.data.message);
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
      yield put(actions.updateProductsFailure(error.response.data.error));
    } else {
      if (error.response.status === 401) {
        yield put(logout());
      } else {
        toast.error('Update product failed! Please try again!');
        yield put(
          actions.updateProductsFailure('Add product failed! Please try again!')
        );
      }
    }
  }
  yield put(actions.removeLoading());
}

function* updatePhoto({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.updatePhoto, payload.slug, payload.data);
    console.log(res);
    payload.cb(res.data.images);
    toast.success(res.data.message);
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
    } else {
      if (error.response.status === 401) {
        yield put(logout());
      } else {
        toast.error('Update photo failed! Please try again!');
      }
    }
  }
  yield put(actions.removeLoading());
}

function* deletePhoto({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(
      services.deletePhoto,
      payload.slug,
      payload.filename
    );
    console.log(res);
    payload.cb(res.data.images);
    toast.success(res.data.message);
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
    } else {
      if (error.response.status === 401) {
        yield put(logout());
      } else {
        toast.error('Delete photo failed! Please try again!');
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

function* watcherUpdateProduct() {
  yield takeLatest(types.UPDATE_PRODUCT, updateProduct);
}

function* watcherUploadPhotos() {
  yield takeLatest(types.UPLOAD_PHOTOS, uploadPhotos);
}

function* watcherUpdatePhoto() {
  yield takeLatest(types.UPDATE_PHOTO, updatePhoto);
}

function* watcherDeletePhoto() {
  yield takeLatest(types.DELETE_PHOTO, deletePhoto);
}

export default function* productSaga() {
  yield all([
    watcherAddProduct(),
    watcherGetProducts(),
    watcherUpdateProduct(),
    watcherUploadPhotos(),
    watcherUpdatePhoto(),
    watcherDeletePhoto(),
  ]);
}
