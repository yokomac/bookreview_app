import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const userData = await response.json();
        // ユーザー名を表示する処理
        console.log('ユーザー名:', userData.name);
        // ユーザー名をstateにセット
        setUserName(userData.name);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました', error);
      }
    };

    // ログイン済みかどうかの確認
    const isLoggedIn = !!sessionStorage.getItem('token');

    // ログイン済みの場合はユーザー情報を取得
    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, []); // 空の依存配列は、コンポーネントがマウントされた時に一度だけ実行するようにします

  return (
    <div className='header'>
      <h1 className='header__title'>書籍レビューアプリ</h1>
      {userName ? (
        <>
          <p className='header__userstatus'>{`ログイン中： ${userName}`}</p>
          <Link to="/profile" className='header__profileedit'>ユーザー情報編集</Link>
        </>
      ) : (
        <p className='header__userstatus'>未ログイン</p>
      )}
    </div>
  );
};

export default Header;