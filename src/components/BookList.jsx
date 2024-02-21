import React from 'react';
import { useSelector } from 'react-redux';
import { selectReviews } from '../Slice/reviewSlice';

const BookList = ({ start, end }) => {
  const reviews = useSelector(selectReviews).slice(start, end);

  console.log()

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
