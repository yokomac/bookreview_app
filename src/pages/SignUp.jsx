import React, { useState } from 'react';
import Compressor from 'compressorjs';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [iconUrl, setIconUrl] = useState(null);
  const [error, setError] = useState('');

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const resizedImage = await compressImage(file);
      setIconUrl(resizedImage);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          resolve(result);
        },
        error(err) {
          console.error(err.message);
          resolve(file);
        },
      });
    });
  };

  const handleSignUp = async () => {
    try {
      // 名前、Email、パスワードのリクエスト
      const userResponse = await fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (userResponse.ok) {
        await userResponse.json();

        // 画像のリクエスト
        const formData = new FormData();
        formData.append('iconUrl', iconUrl);

        const iconUrlResponse = await fetch(`https://railway.bookreview.techtrain.dev/uploads`, {
          method: 'POST',
          body: formData,
        });

        if (iconUrlResponse.ok) {
          // 新規登録成功時の処理を追加
          navigate('/dashboard'); // ログイン後のページにリダイレクト
        } else {
          // iconUrlのアップロードが失敗した場合の処理
          // ...
        }
      } else {
        // レスポンスのステータスやコンテンツに基づいて新規登録の失敗を処理
        setError('Signup failed. Please check your information.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      // エラーハンドリング
    }
  };

  return (
    <div>
      <h2>SignUp</h2>
      <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleAvatarChange} />
      <button onClick={handleSignUp}>SignUp</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        Already have an account? <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default SignUp;
