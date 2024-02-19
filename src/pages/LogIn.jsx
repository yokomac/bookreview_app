import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'; // Bootstrapコンポーネントをインポート
import './LogIn.css';

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogIn = async () => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // コンテンツのタイプを JSON として指定
        },
        body: JSON.stringify({ email, password }),
      });

      // レスポンスが成功しているか確認
      if (response.ok) {
        const loginData = await response.json();
        // 取得したトークンを使って logIn アクションをディスパッチ
        dispatch(logIn(loginData.token));
        navigate('/'); // ログイン後のページに移動
      } else {
        // レスポンスのステータスやコンテンツに基づいてログインの失敗を処理
        setError('ログインに失敗しました。情報を再確認してください。');
      }
    } catch (error) {
      console.error('ログインに失敗しました:', error);
      setError('ログインに失敗しました。情報を再確認してください。');
    }
  };

  return (
    <div>
      <h2 className='Form-margin'>LogIn</h2>
      <Form>
        <Form.Group controlId="formBasicEmail" className='Form-margin'>
          <Form.Label>Email</Form.Label>
          <Form.Control className='Form-width-md' type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="email-input" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='Form-margin'>
          <Form.Label>Password</Form.Label>
          <Form.Control className='Form-width-md' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleLogIn} data-testid="submit-button" className='Form-margin'>
          LogIn
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }} data-testid="error-message">{error}</p>}
      <div className='Form-margin'>
      アカウントをお持ちでないですか？
      <Button variant="primary" onClick={() => navigate('/signup')} data-testid="submit-button">
        SignUp
      </Button>
      </div>
    </div>
  );
};

export default LogIn;
