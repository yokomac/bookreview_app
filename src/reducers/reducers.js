/*
export const selectCurrentPage = (state) => state.currentPage;

const initialState = {
  currentPage: 1,
};
*/
export const currentPageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return action.payload;
    default:
      return state;
  }
};
