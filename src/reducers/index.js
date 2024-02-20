import { combineReducers } from 'redux';
import booksReducer from './booksReducer'; // 作成したbooksReducerの場所に合わせて変更

const rootReducer = combineReducers({
  books: booksReducer,
  // 他にも必要なreducerがあれば追加
});

export default rootReducer;