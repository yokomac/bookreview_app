import React from 'react';
import './Home.css';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import { store } from '../store'; // Reduxストアをインポート
import { Provider } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReviewsWithPagination, selectCurrentPage, selectItemsPerPage } from '../Slice/paginationSlice';
// import { selectToken } from '../Slice/authSlice'; // トークンのセレクターを追加

const Home = () => {
  /*
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const token = useSelector(selectToken); // トークンをRedux Stateから取得

  useEffect(() => {
    dispatch(fetchReviewsWithPagination((currentPage - 1) * itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage, token]);
  */

  return (
    <Provider store={store}>
    <div className='home'>
      <h1 className="home__title">書籍レビュー</h1>
      <Pagination />
      <BookList />
    </div>
  </Provider>
  );
};

export default Home;


