import React from 'react';
import BookList from '../components/BookList';
import Header from '../components/Header'
import { store } from '../store'; // Reduxストアをインポート
import { Provider } from 'react-redux';

const Home = () => {

  return (
    <Provider store={store}>
      <Header />
      <div className='home'>
        <BookList />
      </div>
  </Provider>
  );
  
};

export default Home;


