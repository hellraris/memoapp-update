import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_LABEL_LIST_REQUEST,
  GET_LABEL_LIST_SUCCESS,
  GET_LABEL_LIST_FAILURE,
  GET_LABEL_REQUEST,
  GET_LABEL_SUCCESS,
  GET_LABEL_FAILURE,
  CREATE_LABEL_REQUEST,
  CREATE_LABEL_SUCCESS,
  CREATE_LABEL_FAILURE,
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_SUCCESS,
  UPDATE_LABEL_FAILURE,
  ADD_LABEL_MEMOS_REQUEST,
  ADD_LABEL_MEMOS_SUCCESS,
  ADD_LABEL_MEMOS_FAILURE,
  REMOVE_LABEL_REQUEST,
  REMOVE_LABEL_SUCCESS,
  REMOVE_LABEL_FAILURE,
  REMOVE_LABEL_MEMOS_REQUEST,
  REMOVE_LABEL_MEMOS_SUCCESS,
  REMOVE_LABEL_MEMOS_FAILURE,
  REMOVE_ALL_LABEL_MEMOS_REQUEST,
  REMOVE_ALL_LABEL_MEMOS_SUCCESS,
  REMOVE_ALL_LABEL_MEMOS_FAILURE,
} from '../reducers/label'
import { UPDATE_MEMO_LIST_BY_LABEL } from '../reducers/memo'

function getLabelListApi() {
  return axios.get('/labels', {
    params: {
      populate: false
    }
  });
};

function* getLabelList() {
  try {
    const result = yield call(getLabelListApi);
    yield put({
      type: GET_LABEL_LIST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: GET_LABEL_LIST_FAILURE,
      error: error
    });
  }
};

function* watchGetLabelList() {
  yield takeLatest(GET_LABEL_LIST_REQUEST, getLabelList);
};

function getLabelApi(id) {
  return axios.get(`/labels/${id}`);
};

function* getLabel(action) {
  try {
    const result = yield call(getLabelApi, action.data);
    yield put({
      type: GET_LABEL_SUCCESS,
      data: result.data
    });
    // 반환받은 라벨메모리스트를 메모액션으로 전달
    yield put({
      type: UPDATE_MEMO_LIST_BY_LABEL,
      data: result.data.memos
    });
  } catch (error) {
    yield put({
      type: GET_LABEL_FAILURE,
      error: error
    });
  }
};

function* watchGetLabel() {
  yield takeLatest(GET_LABEL_REQUEST, getLabel);
};

function createLabelApi(title) {
  return axios.post('/labels', title);
};

function* createLabel(action) {
  try {
    const result = yield call(createLabelApi, action.data);
    yield put({
      type: CREATE_LABEL_SUCCESS,
      data: result.data
    });
    yield put({
      type: GET_LABEL_LIST_REQUEST
    });
  } catch (error) {
    yield put({
      type: CREATE_LABEL_FAILURE,
      error: error
    });
  }
};

function* watchCreateLabel() {
  yield takeLatest(CREATE_LABEL_REQUEST, createLabel);
};

function updateLabelApi(label) {
  return axios.put(`/labels/${label.id}`, {title: label.title});
};

function* updateLabel(action) {
  try {
    const result = yield call(updateLabelApi, action.data);
    yield put({
      type: UPDATE_LABEL_SUCCESS,
      data: result.data
    });
    yield put({
      type: GET_LABEL_LIST_REQUEST
    });
  } catch (error) {
    yield put({
      type: UPDATE_LABEL_FAILURE,
      error: error
    });
  }
};

function* watchUpdateLabel() {
  yield takeLatest(UPDATE_LABEL_REQUEST, updateLabel);
};

function addLabelMemosApi(addMemosData) {
  return axios.post(`/labels/${addMemosData.labelId}/memos`,
   { memoIds : addMemosData.memoIds });
};

function* addLabelMemos(action) {
  try {
    const result = yield call(addLabelMemosApi, action.data);
    yield put({
      type: ADD_LABEL_MEMOS_SUCCESS,
      data: result.data
    });
    yield put({
      type: GET_LABEL_LIST_REQUEST
    });
  } catch (error) {
    yield put({
      type: ADD_LABEL_MEMOS_FAILURE,
      error: error
    });
  }
};

function* watchAddLabelMemos() {
  yield takeLatest(ADD_LABEL_MEMOS_REQUEST, addLabelMemos);
};

function removeLabelApi(id) {
  return axios.delete(`/labels/${id}`);
};

function* removeLabel(action) {
  try {
    const result = yield call(removeLabelApi, action.data);
    yield put({
      type: REMOVE_LABEL_SUCCESS,
      data: result.data
    });
    yield put({
      type: GET_LABEL_LIST_REQUEST
    });
  } catch (error) {
    yield put({
      type: REMOVE_LABEL_FAILURE,
      error: error
    });
  }
};

function* watchRemoveLabel() {
  yield takeLatest(REMOVE_LABEL_REQUEST, removeLabel);
};

function removeLabelMemosApi(removeMemosData) {
  return axios.delete(`/labels/${removeMemosData.labelId}/memos`, 
  { data:{ memoIds: removeMemosData.memoIds } });
};

function* removeLabelMemos(action) {
  try {
    const result = yield call(removeLabelMemosApi, action.data);
    yield put({
      type: REMOVE_LABEL_MEMOS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: REMOVE_LABEL_MEMOS_FAILURE,
      error: error
    });
  }
};

function* watchRemoveLabelMemos() {
  yield takeLatest(REMOVE_LABEL_MEMOS_REQUEST, removeLabelMemos);
};

function removeAllLabelMemosApi(memoIds) {
  return axios.delete(`/labels/memos/all`, { data:{ _id: null, memoIds: memoIds } });
};

function* removeAllLabelMemos(action) {
  try {
    const result = yield call(removeAllLabelMemosApi, action.data);
    yield put({
      type: REMOVE_ALL_LABEL_MEMOS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: REMOVE_ALL_LABEL_MEMOS_FAILURE,
      error: error
    });
  }
};

function* watchRemoveAllLabelMemos() {
  yield takeLatest(REMOVE_ALL_LABEL_MEMOS_REQUEST, removeAllLabelMemos);
};

export default function* labelSaga() {
  yield all([
    fork(watchGetLabelList),
    fork(watchGetLabel),
    fork(watchCreateLabel),
    fork(watchUpdateLabel),
    fork(watchAddLabelMemos),
    fork(watchRemoveLabelMemos),
    fork(watchRemoveAllLabelMemos),
    fork(watchRemoveLabel)
  ]);
};