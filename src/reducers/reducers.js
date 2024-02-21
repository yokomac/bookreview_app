const initialState = {
  bookReviews: {
    data: [], // 書籍のデータ
    currentPage: 1, // 現在のページ
    perPage: 10, // 1ページあたりの書籍数
  },
};

const reducer = (state = initialState, action) => {
  // 必要なアクションに対する処理を実装
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, bookReviews: { ...state.bookReviews, data: action.payload } };
    case 'SET_CURRENT_PAGE':
      return { ...state, bookReviews: { ...state.bookReviews, currentPage: action.payload } };
    default:
      return state;
  }
};

export const currentPageReducer = reducer;

export default reducer;
