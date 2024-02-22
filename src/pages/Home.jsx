import React from 'react';
import BookList from '../components/BookList';
import Header from '../components/Header'
import { store } from '../store'; // Reduxストアをインポート
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <Provider store={store}>
      <Header />
      <div className='home'>
      <Link to="/new" >新しいレビューをつくる</Link>
        <BookList />
      </div>
  </Provider>
  );
  
};

export default Home;


