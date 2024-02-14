/*
import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    // 例: Emailのバリデーション
    if (!email.includes('@')) {
      setErrorMessage('有効なメールアドレスを入力してください');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div>
      <label htmlFor="email-input">Email:</label>
      <input
        id="email-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-testid="email-input"
      />
      <button onClick={handleSubmit} data-testid="submit-button">
        送信
      </button>
      {errorMessage && <div data-testid="error-message">{errorMessage}</div>}
    </div>
  );
}

export default App;
*/

import './App.css';
import { Router } from './routes/Router';

function App() {
  return (
    <div className="App">
        <Router />
    </div>
  );
}

export default App;