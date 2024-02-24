import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsWithPagination, selectReviews, selectStatus } from '../Slice/reviewSlice';
import { selectCurrentPage, selectTotalPages, setPage } from '../Slice/paginationSlice';
import Pagination from './Pagination';
import './BookList.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BookList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const status = useSelector(selectStatus);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const navigate = useNavigate();

  // 初回ロード時に書籍レビューを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 非同期操作やディスパッチ
        dispatch(fetchReviewsWithPagination(currentPage * 10));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchData();
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    // ページ変更時に新しいページの書籍レビューを取得
    dispatch(setPage(newPage));
    dispatch(fetchReviewsWithPagination(newPage * 10));
  };

  const handleCreateReview = () => {
    navigate('/new');
  };

  return (
    <div className='home'>
      <h2 className="home__title">Book Review List</h2>
      <Button variant="primary" onClick={handleCreateReview}>新しいレビューをつくる</Button>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching reviews.</p>}
      {status === 'succeeded' && (
        <>
          {/* 書籍レビューを表示するコンポーネント（レビューの内容やデザインは適切に記述） */}
          {reviews.map((review) => (
            <div key={review.id} className="home__review" >
              <h2 className="home__review__title" >{review.title}</h2>
              {review.isMine && 
                <div className="home__ismine">
                  <p className="home__review--mine">これは私のレビューです</p>
                  <Link to={`/edit/${review.id}`} className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">レビューを編集する</Link>
                </div>
              }
              <Link to={`/detail/${review.id}`} className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>
                詳細を見る
              </Link>
            </div>
          ))}

          {/* ページネーションコンポーネント */}
          <div className='home__pagination'>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}  />
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;