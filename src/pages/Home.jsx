import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import './Home.css';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { selectIsLogIn, selectToken } from '../Slice/authSlice';
import { useCookies } from 'react-cookie';

const Home = () => {
  const isLogIn = useSelector(selectIsLogIn);
  const token = useSelector(selectToken);
  const [cookies] = useCookies();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        .then(data => setReviews(data))
        .catch(error => {
          setError(error);
          console.error('APIからデータを取得できませんでした:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [isLogIn, token, cookies.token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    // Provider コンポーネントに store を渡す
    <Provider store={store}>
      <div className='home'>
        <h1 className="home__title">書籍レビューリスト</h1>
        <Pagination totalItems={reviews.length} itemsPerPage={10} />
        <BookList reviews={reviews} />
      </div>
    </Provider>
  );
};

export default Home;


