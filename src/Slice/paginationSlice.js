import { createSlice } from '@reduxjs/toolkit';
import { fetchReviews } from './reviewSlice';
import { selectToken } from './authSlice';

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 0, // 追加
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
    },
  },
});

export const { setCurrentPage, setPage } = paginationSlice.actions;

// セレクターを作成
export const selectCurrentPage = (state) => state.pagination.currentPage;
export const selectItemsPerPage = (state) => state.pagination.itemsPerPage;
export const selectTotalPages = (state) => state.pagination.totalPages;

export const fetchReviewsWithPagination = (offset) => async (dispatch, getState) => {
  const token = selectToken(getState());
  dispatch(setPage(offset / 10 + 1));
  await dispatch(fetchReviews({ offset, token }));
};

export default paginationSlice.reducer;
