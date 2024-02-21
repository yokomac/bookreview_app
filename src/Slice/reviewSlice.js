import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReviews = createAsyncThunk('review/fetchReviews', async ({ offset, token }) => {
  const response = await fetch(`https://api.example.com/books?offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data); // レスポンスの内容を確認
  return data;
});

const initialState = {
  reviews: [],
  status: 'idle',
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectReviews = (state) => state.review.reviews;
export const selectStatus = (state) => state.review.status;

export default reviewSlice.reducer;