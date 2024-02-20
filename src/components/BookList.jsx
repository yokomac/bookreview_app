import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectCurrentPage } from '../reducers/reducers'; // レデューサから必要なものをインポート

const BookList = ({ reviews }) => {
  //const currentPage = useSelector(selectCurrentPage);

  // ページごとの表示するレビュー数
  const reviewsPerPage = 10;

  // 現在のページに対応するレビューの範囲を計算
  // const startIndex = (currentPage - 1) * reviewsPerPage;
  // const endIndex = startIndex + reviewsPerPage;
  //const displayedReviews = reviews.slice(0, reviewsPerPage);

  // 書籍リストを表示する範囲を計算
  const startIndex = 0;  // 一旦ページネーションの範囲は考慮せずにすべて表示
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = reviews.slice(startIndex, endIndex);


  return (
    <div>
      {displayedReviews.map((review) => (
        <div key={review.id} className="home__review">
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
