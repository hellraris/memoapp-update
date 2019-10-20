  
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import memo from './memo';
import label from './label';

axios.defaults.baseURL = 'http://localhost:3000';

export default function* rootSaga() {
  yield all([
    fork(memo),
    fork(label)
  ]);
}