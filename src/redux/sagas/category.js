import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../types/category';
import * as actions from '../actions/category';
import * as services from '../../services/category';
import { toast } from 'react-toastify';

function* getAllCategories() {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.getAllCategories);
    console.log(res);
    yield put(actions.getAllCategoriesSucess(res.data.categories));
  } catch (error) {
    console.log(error);
  }
  yield put(actions.removeLoading());
}

function* addCategory({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.addCategory, payload.category);
    yield put(actions.addCategorySuccess(res.data.category));
    payload.cb();
  } catch (error) {
    toast.error(error.response.data.error);
    yield put(actions.addCategoryFailure(error.response.data.error));
  }
  yield put(actions.removeLoading());
}

function* updateCategories({ payload }) {
  yield put(actions.setLoading());
  try {
    const res = yield call(services.updatedCategories, payload.data);
    console.log(res.data);
    // yield put(actions.addCategorySuccess(res.data.category));
    payload.cb();
  } catch (error) {
    console.log(error);
  }
  yield put(actions.removeLoading());
}

function* watcherGetAllCategories() {
  yield takeLatest(types.GET_ALL_CATEGORIES, getAllCategories);
}

function* watcherAddCategory() {
  yield takeLatest(types.ADD_CATEGORY, addCategory);
}

function* watcherUpdateCategories() {
  yield takeLatest(types.UPDATE_CATEGORY, updateCategories);
}

export default function* categorySaga() {
  yield all([
    watcherGetAllCategories(),
    watcherAddCategory(),
    watcherUpdateCategories(),
  ]);
}
