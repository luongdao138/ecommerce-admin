import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../types/banner';
import * as actions from '../actions/banner';
import * as services from '../../services/banner';
import { logout } from '../actions/auth';
import { toast } from 'react-toastify';

function* createBanner({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.createBanner, payload.data);
    console.log(res);
    yield put(actions.createBannerSuccess(res.data.banner));
    payload.cb();
  } catch (error) {
    if (error.response.status === 401) {
      yield put(logout());
    } else {
      toast.error(error.response.data.error);
      yield put(actions.createBannerFailure(error.response.data.error));
    }
  }
  yield put(actions.removeLoading());
}

function* getBanners() {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.getAllBanners);
    console.log(res);
    yield put(actions.getBannerSuccess(res.data.banners));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(logout());
    } else {
      console.log(error);
    }
  }
  yield put(actions.removeLoading());
}

function* updateBanner({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.updateBanner, payload.id, payload.data);
    console.log(res);
    yield put(actions.updateBannerSuccess(res.data.banner));
    payload.cb();
  } catch (error) {
    if (error.response.status === 401) {
      yield put(logout());
    } else {
      toast.error(error.response.data.error);
      yield put(actions.updateBannerFailure(error.response.data.error));
    }
  }
  yield put(actions.removeLoading());
}

function* deleteBanner({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.deleteBanner, payload.id);
    console.log(res);
    yield put(actions.deleteBannerSuccess(res.data.id));
    payload.cb();
  } catch (error) {
    if (error.response.status === 401) {
      yield put(logout());
    } else {
      toast.error(error.response.data.error);
      yield put(actions.deleteBannerFailure(error.response.data.error));
    }
  }
  yield put(actions.removeLoading());
}

function* watcherCreateBanner() {
  yield takeLatest(types.CREATE_BANNER, createBanner);
}

function* watcherGetBanners() {
  yield takeLatest(types.GET_BANNERS, getBanners);
}

function* watcherUpdateBanner() {
  yield takeLatest(types.UPDATE_BANNER, updateBanner);
}

function* watcherDeleteBanner() {
  yield takeLatest(types.DELETE_BANNER, deleteBanner);
}

export default function* bannerSaga() {
  yield all([
    watcherCreateBanner(),
    watcherGetBanners(),
    watcherUpdateBanner(),
    watcherDeleteBanner(),
  ]);
}
