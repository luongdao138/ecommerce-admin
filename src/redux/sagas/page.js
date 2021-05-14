import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../types/page';
import * as actions from '../actions/page';
import * as services from '../../services/page';
import { toast } from 'react-toastify';
import { logout } from '../actions/auth';

function* createPage({ payload }) {
  yield put(actions.setLoading());
  try {
    yield call(services.createPage, payload.data);
    yield put(actions.createPageSuccess());
    payload.cb();
  } catch (error) {
    if (error.response.status === 401) {
      yield put(logout());
    } else {
      toast.error(error.response.data.error);
      yield put(actions.createPageFailure(error.response.data.error));
    }
  }
  yield put(actions.removeLoading());
}

function* watcherCreatePage() {
  yield takeLatest(types.CREATE_PAGE, createPage);
}

export default function* rootSaga() {
  yield all([watcherCreatePage()]);
}
