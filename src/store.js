// Redux ストアが作成される
import { configureStore } from '@reduxjs/toolkit';
import { currentPageReducer } from './reducers/reducers';
import { authSlice } from './authSlice';
import { paginationSlice } from './redux/paginationSlice';

export const store = configureStore({
  reducer: {
    currentPage: currentPageReducer,
    auth: authSlice.reducer,
    pagination: paginationSlice.reducer,
  },
});
