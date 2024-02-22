import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 0,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setPage, setTotalPages } = paginationSlice.actions;
export const selectCurrentPage = (state) => state.pagination.currentPage;
export const selectTotalPages = (state) => state.pagination.totalPages;
export default paginationSlice.reducer;
