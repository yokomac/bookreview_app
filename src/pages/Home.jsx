import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import './Home.css';
import BookList from '../components/BookList';

const Home = () => {

  return (
    // Provider コンポーネントに store を渡す
    <Provider store={store}>
      <div className='home'>
        <h1 className="home__title">書籍レビュー</h1>
        <BookList />
      </div>
    </Provider>
  );
};

export default Home;


