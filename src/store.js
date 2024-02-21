import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Slice/authSlice';
import  reviewReducer  from './Slice/reviewSlice';
import paginationReducer from './Slice/paginationSlice'; // 追加
console.log()

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    reviews: reviewReducer,
    pagination: paginationReducer, // 追加
  },
});