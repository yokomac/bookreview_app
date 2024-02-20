import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks, setCurrentPage } from '../actions/actions';
import Pagination from './Pagination'; // ここを追加
import { useCookies } from 'react-cookie';
import { selectIsLogIn, selectToken } from '../Slice/authSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const [, setReviews] = useState([]);
  const isLogIn = useSelector(selectIsLogIn);
  const token = useSelector(selectToken);
  const books = useSelector((state) => state.pagination.books.data);
  const currentPage = useSelector((state) => state.pagination.books.currentPage);
  const booksPerPage = useSelector((state) => state.pagination.books.perPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(books)

  // ページ変更時の処理
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  // APIから書籍データを取得する処理
  useEffect(() => {
    // トークンがCookieに存在する場合にAPIリクエスト
    if ((isLogIn && token) || cookies.token) {
      const apiUrl = 'https://railway.bookreview.techtrain.dev/books';

      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token || cookies.token}`, // トークンを含める
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('APIからデータを取得できませんでした。');
          }
          return response.json();
        })
        .then(data => {
          dispatch(setBooks(data)); // Reduxアクションを介して書籍データをセット
        })
        .catch(error => {
          setError(error);
          console.error('APIからデータを取得できませんでした:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [isLogIn, token, cookies.token]);

  // 表示する書籍の範囲を計算
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <Pagination
        currentPage={currentPage}
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        onPageChange={handlePageChange}
      />
      {currentBooks.map((review) => (
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
