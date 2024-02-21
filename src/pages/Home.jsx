import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import { fetchReviewsWithPagination, selectCurrentPage, selectItemsPerPage } from '../Slice/paginationSlice';
import { selectToken } from '../Slice/authSlice'; // トークンのセレクターを追加

const Home = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const token = useSelector(selectToken); // トークンをRedux Stateから取得

  useEffect(() => {
    dispatch(fetchReviewsWithPagination((currentPage - 1) * itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage, token]);

  return (
    <div className='home'>
      <h1 className="home__title">書籍レビュー</h1>
      <Pagination />
      <BookList />
    </div>
  );
};

export default Home;


