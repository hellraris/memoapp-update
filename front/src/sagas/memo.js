import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { 
  GET_MEMO_LIST_REQUEST,
  GET_MEMO_LIST_SUCCESS,
  GET_MEMO_LIST_FAILURE,
  GET_MEMO_COUNT_REQUEST,
  GET_MEMO_COUNT_SUCCESS,
  GET_MEMO_COUNT_FAILURE,
  GET_MEMO_REQUEST,
  GET_MEMO_SUCCESS,
  GET_MEMO_FAILURE,
  CREATE_MEMO_REQUEST,
  CREATE_MEMO_SUCCESS,
  CREATE_MEMO_FAILURE,
  UPDATE_MEMO_REQUEST,
  UPDATE_MEMO_SUCCESS,
  UPDATE_MEMO_FAILURE,
  REMOVE_MEMO_REQUEST,
  REMOVE_MEMO_SUCCESS,
  REMOVE_MEMO_FAILURE,
  REMOVE_MEMOS_REQUEST,
  REMOVE_MEMOS_SUCCESS,
  REMOVE_MEMOS_FAILURE,
  SEARCH_MEMO_REQUEST,
  SEARCH_MEMO_SUCCESS,
  SEARCH_MEMO_FAILURE,
  RESET_SELECTED_MEMO
} from '../reducers/memo'

import { 
  REMOVE_ALL_LABEL_MEMOS_REQUEST,
  RESET_SELECTED_LABEL,
  SELECT_MEMO_LIST_LABEL,
  ADD_MULTIPLE_LABEL_MEMO_REQUEST
} from '../reducers/label'


function getMemoListApi(sortData) {
  return axios.get('/memos'
    + '?target=' + sortData.target
    + '&type=' + sortData.type);
};

function* getMemoList(action) {
  // 정렬조건 미지정시 디폴트값 설정
  if (typeof action.data === 'undefined' || action.data === null ) {
    action.data = {
      target: 'createdAt',
      type: '-1'
    }
  }
  try {
    const result = yield call(getMemoListApi, action.data);
    yield put({
      type: GET_MEMO_LIST_SUCCESS,
      data: result.data
    });
    yield put({
      type: SELECT_MEMO_LIST_LABEL
    });
  } catch (error) {
    yield put({
      type: GET_MEMO_LIST_FAILURE,
      error: error
    });
  }
};

function* watchGetMemoList() {
  yield takeLatest(GET_MEMO_LIST_REQUEST, getMemoList);
};

function getMemoCountApi() {
  return axios.get('/memos/count/all');
};

function* getMemoCount() {
  try {
    const result = yield call(getMemoCountApi);
    yield put({
      type: GET_MEMO_COUNT_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: GET_MEMO_COUNT_FAILURE,
      error: error
    });
  }
};

function* watchGetMemoCount() {
  yield takeLatest(GET_MEMO_COUNT_REQUEST, getMemoCount);
};

function getMemoApi(id) {
  return axios.get(`/memos/${id}`);
};

function* getMemo(action) {
  try {
    const result = yield call(getMemoApi, action.data);
    yield put({
      type: GET_MEMO_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: GET_MEMO_FAILURE,
      error: error
    });
  };
};

function* watchGetMemo() {
  yield takeLatest(GET_MEMO_REQUEST, getMemo);
};

function createMemoApi(memo) {
  return axios.post('/memos', memo);
};

function* createMemo(action) {
  try {
    const result = yield call(createMemoApi, action.data);
    yield put({
      type: CREATE_MEMO_SUCCESS,
      data: result.data
    });
    yield put({
      type: GET_MEMO_LIST_REQUEST
    });
    yield put({
      type: RESET_SELECTED_LABEL
    });
    // 일괄 지정라벨이 존재 시 액션을 요청
    const labelIds = action.data.AddTargetLabels;
    if (typeof labelIds !== 'undefined' && labelIds !== null) {
      yield put({
        type: ADD_MULTIPLE_LABEL_MEMO_REQUEST,
        data: { memoId: result.data._id, 
          labelIds: labelIds}
      });
    }
  } catch (error) {
    yield put({
      type: CREATE_MEMO_FAILURE,
      error: error
    });
  }
};

function* watchCreateMemo() {
  yield takeLatest(CREATE_MEMO_REQUEST, createMemo);
};

function updateMemoApi(memo) {
  return axios.put(`/memos/${memo.id}`, 
    {title: memo.title, content: memo.content}
  );
};

function* updateMemo(action) {
  try {
    const result = yield call(updateMemoApi, action.data);
    yield put({
      type: UPDATE_MEMO_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: UPDATE_MEMO_FAILURE,
      error: error
    });
  }
};

function* watchUpdateMemo() {
  yield takeLatest(UPDATE_MEMO_REQUEST, updateMemo);
};

function removeMemoApi(id) {
  return axios.delete(`/memos/${id}`);
};

function* removeMemo(action) {
  try {
    const result = yield call(removeMemoApi, action.data);
    yield put({
      type: REMOVE_MEMO_SUCCESS,
      data: result.data
    });
    yield put({
      type: RESET_SELECTED_MEMO
    });
    yield put({
      type: REMOVE_ALL_LABEL_MEMOS_REQUEST,
      data: [result.data._id]
    });
  } catch (error) {
    yield put({
      type: REMOVE_MEMO_FAILURE,
      error: error
    });
  }
};

function* watchRemoveMemo() {
  yield takeLatest(REMOVE_MEMO_REQUEST, removeMemo);
};

function removeMemosApi(memoIds) {
  return axios.delete('/memos', { data: { memoIds: memoIds } });
};

function* removeMemos(action) {
  try {
    yield call(removeMemosApi, action.data);
    yield put({
      type: REMOVE_MEMOS_SUCCESS
    });
    yield put({
      type: RESET_SELECTED_MEMO
    });
    yield put({
      type: REMOVE_ALL_LABEL_MEMOS_REQUEST,
      data: action.data
    });
  } catch (error) {
    yield put({
      type: REMOVE_MEMOS_FAILURE,
      error: error
    });
  }
};

function* watchRemoveMemos() {
  yield takeLatest(REMOVE_MEMOS_REQUEST, removeMemos);
};

function searchMemoApi(searchData) {
  return axios.get(`/memos/search/${searchData.word}`
    + '?target=' + searchData.sortData.target 
    + '&type=' + searchData.sortData.type);
};

function* searchMemo(action) {
  try {
    const result = yield call(searchMemoApi, action.data);
    yield put({
      type: SEARCH_MEMO_SUCCESS,
      data: result.data
    });
  } catch (error) {
    yield put({
      type: SEARCH_MEMO_FAILURE,
      error: error
    });
  }
};

function* watchSearchMemo() {
  yield takeLatest(SEARCH_MEMO_REQUEST, searchMemo);
};

export default function* memoSaga() {
  yield all([
    fork(watchGetMemoList),
    fork(watchCreateMemo),
    fork(watchGetMemo),
    fork(watchRemoveMemo),
    fork(watchRemoveMemos),
    fork(watchUpdateMemo),
    fork(watchGetMemoCount),
    fork(watchSearchMemo)
  ]);
};