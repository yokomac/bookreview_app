import React from 'react';
import './Home.css';
import BookList from '../components/BookList';
import { store } from '../store'; // Reduxストアをインポート
import { Provider } from 'react-redux';

const Home = () => {

  return (
    <Provider store={store}>
    <div className='home'>
      <h1 className="home__title">書籍レビュー</h1>
      <BookList />
    </div>
  </Provider>
  );
};

export default Home;


