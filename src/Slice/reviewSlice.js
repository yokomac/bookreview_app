import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectToken } from './authSlice'; // authSlicekからselectToken
import { setPage, setTotalPages } from './paginationSlice';

// 非同期データの取得用のThunkを作成
export const fetchReviews = createAsyncThunk('review/fetchReviews', async ({ offset, token }) => {
  const response = await fetch(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
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

// ページネーションと組み合わせた非同期データの取得用のThunkを作成
export const fetchReviewsWithPagination = (offset) => async (dispatch, getState) => {
  const token = selectToken(getState());
  dispatch(setPage(offset / 10 + 1)); // ページを設定
  await dispatch(fetchReviews({ offset, token })); // レビューの非同期取得をディスパッチ
  dispatch(setTotalPages()); // 合計ページ数を設定
};

// スライスの初期状態を定義
const initialState = {
  reviews: [],
  status: 'idle',
};

// スライスを作成
export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {}, // 通常の同期アクションはここで定義
  extraReducers: (builder) => {
    // 非同期アクションの結果に対するリデューサーを定義
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

// スライスのセレクターを作成
export const selectReviews = (state) => state.review.reviews;
export const selectStatus = (state) => state.review.status;

export default reviewSlice.reducer; // スライスのリデューサーをエクスポート
