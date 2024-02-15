import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../authSlice';

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogIn = async () => {
    try {
      // ここで body を JSON 形式に変換する
      const response = await fetch(`https://railway.bookreview.techtrain.dev/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // コンテンツのタイプを JSON として指定
        },
        body: JSON.stringify({ email, password }),
      });

      // レスポンスが成功しているか確認（ステータスコードが 2xx）
      if (response.ok) {
        // ログイン成功時にRedux StoreのisLogInを更新
        dispatch(logIn());
        navigate('/'); // ログイン後のページに移動
      } else {
        // レスポンスのステータスやコンテンツに基づいてログインの失敗を処理
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>LogIn</h2>
      <label>Email:</label>
      <input type="email" className="email-input" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="email-input" />
      <label>Password:</label>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogIn} data-testid="submit-button">LogIn</button>
      {error && <p style={{ color: 'red' }} data-testid="error-message">{error}</p>}
      <div>
        Don't have an account? <button onClick={() => navigate('/signup')}>SignUp</button>
      </div>
    </div>
  );
};

export default LogIn;
