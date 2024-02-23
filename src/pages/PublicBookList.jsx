import React, { useEffect, useState } from 'react';
import '../components/BookList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header'
import { store } from '../store'; // Reduxストアをインポート
import { Provider } from 'react-redux';
import './PublicBookList.css';

const PublicBookList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 1ページあたりのアイテム数

  useEffect(() => {
    const fetchReviews = async () => {
      const offset = (currentPage - 1) * itemsPerPage;
      const apiUrl = `https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('APIからデータを取得できませんでした。');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error);
        console.error('APIからデータを取得できませんでした:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage, itemsPerPage]); // 依存配列に追加

  const handlePageChange = (newPage) => {
    // ページ1より前には切り替えないように制御
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Provider store={store}>
      <Header />
      <div className="home">
        <h1 className="home__title">Public Book Review List</h1>
        {reviews.map((review) => (
          <div key={review.id} className="home__review" >
            <h2 className="home__review__title" >{review.title}</h2>
            <h4>概要</h4>
            <p>{review.detail}</p>
            <p>レビュアー： {review.reviewer}</p>
            <h4>レビュー</h4>
            <p>{review.review}</p>
            <a href={review.url} target="_blank" rel="noopener noreferrer">
              詳細を見る
            </a>
          </div>
        ))}
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </Provider>
  );
};

// ページネーションコンポーネント
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">

        <li className="page-item">
          <span onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="page-link">前へ</span>
        </li>

        <li className="page-item" aria-current="page"><span className="page-link">{` ページ ${currentPage} `}</span></li>

        <li className="page-item">
          <span onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="page-link">次へ</span>
        </li>

      </ul>
    </nav>
  );
};

export default PublicBookList;
