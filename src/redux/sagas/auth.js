import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../types/auth';
import * as actions from '../actions/auth';
import * as services from '../../services/auth';
import { toast } from 'react-toastify';

function* login({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.login, payload);
    yield put(actions.loginSuccess(res.data));
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    toast.error(error.response.data.error);
    yield put(actions.loginFailure(error.response.data.error));
  }
  yield put(actions.removeLoading());
}

function* loadUser({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.getUser, payload);
    yield put(actions.loginSuccess(res.data));
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    localStorage.removeItem('token');
    yield put(actions.loginFailure(error.response.data.error));
  }
  yield put(actions.removeLoading());
}

function* register({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.register, payload.user);
    toast.success('Register success!');
    payload.cb();
  } catch (error) {
    toast.error(error.response.data.error);
    yield put(actions.registerFailure(error.response.data.error));
  }
  yield put(actions.removeLoading());
}

function* watcherLogin() {
  yield takeLatest(types.LOGIN, login);
}

function* watcherRegister() {
  yield takeLatest(types.REGISTER_USER, register);
}

function* watcherLoadUser() {
  yield takeLatest(types.LOAD_USER, loadUser);
}

export default function* authSaga() {
  yield all([watcherLogin(), watcherLoadUser(), watcherRegister()]);
}
