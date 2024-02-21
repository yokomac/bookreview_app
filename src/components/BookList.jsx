import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsWithPagination, selectReviews, selectStatus } from '../Slice/reviewSlice';
import { selectToken } from '../Slice/authSlice';
// import { setPage, selectTotalPages } from '../Slice/paginationSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const status = useSelector(selectStatus);
  const token = useSelector(selectToken);

  useEffect(() => {
    const offset = 0; // 初期のオフセットを設定するか、ページネーションロジックから取得してください
    dispatch(fetchReviewsWithPagination(offset));
  }, [dispatch, token]);

  if (status === 'loading') {
    return <p>読み込み中...</p>;
  }

  if (status === 'failed') {
    return <p>レビューの読み込みに失敗しました。</p>;
  }

  return (
    <div>
      <h2>Book List</h2>
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
    </div>
  );
};

export default BookList;