export const selectCurrentPage = (state) => state.currentPage;

const initialState = {
  currentPage: 1,
};

export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
