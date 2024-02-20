import { configureStore, createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    books: {  // ここが初期状態
      data: [],
      currentPage: 1,
      perPage: 10,
    },
  },
  reducers: {
    // 他のアクションや Reducer をここに追加する
    setBooks: (state, action) => {
      state.books.data = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.books.currentPage = action.payload;
    },
  },
});

export const { setBooks, setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
