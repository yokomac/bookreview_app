import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { paginationReducer } from './reducers/reducers'; // 追加

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pagination: paginationReducer, // 追加
  },
});