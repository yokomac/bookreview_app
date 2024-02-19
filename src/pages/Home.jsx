import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLogIn, selectToken } from '../authSlice';
import { useCookies } from 'react-cookie';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../components/Pagination';

const Home = () => {
  const isLogIn = useSelector(selectIsLogIn);
  const token = useSelector(selectToken);
  const [cookies] = useCookies();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 追加: 現在のページ番号

  useEffect(() => {
    // トークンがRedux stateまたはCookieに存在する場合にAPIリクエストを行う
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
        .then(data => setReviews(data))
        .catch(error => {
          setError(error);
          console.error('APIからデータを取得できませんでした:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [isLogIn, token, cookies.token]);

  // ページ切り替えのイベントハンドラ
  const handlePageChange = (page) => {
    console.log(`Page changed to: ${page}`);
    setCurrentPage(page);
  };

  // ページごとの表示するレビュー数
  const reviewsPerPage = 10; // 例として1ページあたり5件表示

  // 現在のページに対応するレビューの範囲を計算
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = reviews.slice(startIndex, endIndex);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="home">
      <h1 className="home__title">書籍一覧</h1>
      <Pagination
        listLength={reviews.length}
        displayCount={reviewsPerPage}
        setStateInfoAction={handlePageChange}
      />
      {displayedReviews.map(review => (
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

export default Home;
