import { combineReducers } from "redux";
import label from './label';
import memo from './memo';

const rootReducer = combineReducers({
  label,
  memo
});

export default rootReducer;