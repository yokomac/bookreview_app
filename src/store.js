// Redux ストアが作成される
import { configureStore } from '@reduxjs/toolkit';
import { currentPageReducer } from './Slice/reducers';
import { authSlice } from './Slice/authSlice';
import { paginationSlice } from './Slice/paginationSlice';
console.log(paginationSlice)

export const store = configureStore({
  reducer: {
    currentPage: currentPageReducer,
    auth: authSlice.reducer,
    pagination: paginationSlice.reducer,
  },
});
