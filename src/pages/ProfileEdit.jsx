import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const navigate = useNavigate();

  // ユーザー情報を保存するステート
  const [userInfo, setUserInfo] = useState({
    name: "",  // 初期値を空の文字列に設定
    // 必要に応じて他のフィールドを追加
  });

  // コンポーネントがマウントされたときにユーザー情報を取得
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const userData = await response.json();
        // 取得したユーザー情報をステートに設定
        setUserInfo({
          name: userData.name,  // APIのレスポンスと一致するように更新
          // 必要に応じて他のフィールドを設定
        });
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました', error);
      }
    };

    fetchUserInfo();
  }, []); // 空の依存配列はマウント時に一度だけ実行されることを保証

  // フォームの変更を処理
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // フォームの送信を処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ユーザー情報更新用のAPIを呼び出す
    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        console.log('ユーザー情報が更新されました');

        // ユーザー情報の更新が成功したらHome画面に遷移
        navigate('/');
      } else {
        console.error('ユーザー情報の更新に失敗しました');
      }
    } catch (error) {
      console.error('ユーザー情報の更新に失敗しました', error);
    }
  };

  return (
    <div>
      <h2>ユーザー情報編集</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ユーザー名:
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* 必要に応じて他のフィールドを追加 */}
        <button type="submit">更新する</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
