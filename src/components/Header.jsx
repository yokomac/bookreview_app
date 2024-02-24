import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../Slice/authSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    // ログアウト処理を実行
    // 例: 認証トークンを削除し、ログイン画面にリダイレクト
    dispatch(logOut());
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogIn = () => {
    navigate('/login');
  };


  return (
    <div className='header'>
      <h1 className='header__title'>書籍レビューアプリ</h1>
      {userName ? (
        <>
          <p className='header__userstatus'>{`ログイン中： ${userName}`}</p>
          <Link to="/profile" className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover header__profileedit'>
            Profile Edit
          </Link>
          <button onClick={handleSignUp} type="button" className="btn btn-outline-light btn-sm">SignUp</button>
          <button onClick={handleLogIn} type="button" className="btn btn-outline-light btn-sm">LogIn</button>
          <button onClick={handleLogout} type="button" className="btn btn-outline-light btn-sm">LogOut</button>
        </>
      ) : (
        <>
          <p className='header__userstatus'>未ログイン</p>
          <Link to="/signup" className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover header__profileedit'>
            SignUp
          </Link> 
          <Link to="/login" className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover header__profileedit'>
            LogIn
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;