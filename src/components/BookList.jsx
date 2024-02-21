import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsWithPagination, selectReviews, selectStatus } from '../Slice/reviewSlice';
//import { selectToken } from '../Slice/authSlice';
import { selectCurrentPage, selectTotalPages, setPage } from '../Slice/paginationSlice';
import Pagination from './Pagination';

const BookList = () => {
  const dispatch = useDispatch();
  //const token = useSelector(selectToken);
  const reviews = useSelector(selectReviews);
  const status = useSelector(selectStatus);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

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

  return (
    <div>
      <h2>Book List</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching reviews.</p>}
      {status === 'succeeded' && (
        <>
          {/* 書籍レビューを表示するコンポーネント（レビューの内容やデザインは適切に記述） */}
          {reviews.map((review) => (
            <div key={review.id} className="home__review" >
              <h2>「{review.title}」</h2>
              <h4>概要</h4>
              <p>{review.detail}</p>
              <p>レビュアー: {review.reviewer}</p>
              <h4>レビュー</h4>
              <p>{review.review}</p>
              {review.isMine && <p className="home__review--mine">これは私のレビューです</p>}
              <a href={review.url} target="_blank" rel="noopener noreferrer">
                詳細を見る
              </a>
            </div>
          ))}

          {/* ページネーションコンポーネント */}
          <div className='Pagination'>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}  />
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;