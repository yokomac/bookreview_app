import { createSlice }  from '@reduxjs/toolkit';
import { fetchReviews } from './reviewSlice';
import { selectToken } from './authSlice'; // selectTokenを追加

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    selectTotalPages: (state) => {
      // ここでtotalPagesを計算して設定するロジックを追加
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

// セレクターを作成
export const selectCurrentPage = (state) => state.pagination.currentPage;
export const selectItemsPerPage = (state) => state.pagination.itemsPerPage;
export const selectTotalPages = (state) => state.pagination.totalPages; // 追加
export const setPage = (state) => state.pagination.setPage; // 追加

export const fetchReviewsWithPagination = (offset) => async (dispatch, getState) => {
  const token = selectToken(getState()); // トークンはRedux Stateから取得
  dispatch(setCurrentPage(offset / 10 + 1));
  await dispatch(fetchReviews({ offset, token }));
  dispatch(selectTotalPages()); // 追加
};

export default paginationSlice.reducer;