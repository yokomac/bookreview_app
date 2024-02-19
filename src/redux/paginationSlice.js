import { createSlice } from '@reduxjs/toolkit';

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
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    selectTotalPages: (state) => {
      return Math.ceil(state.totalItems / state.itemsPerPage);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  selectTotalPages,
  setPage,
} = paginationSlice.actions;

export const selectCurrentPage = (state) => state.pagination.currentPage;
export const selectItemsPerPage = (state) => state.pagination.itemsPerPage;
export const selectTotalItems = (state) => state.pagination.totalItems;

export default paginationSlice.reducer;
