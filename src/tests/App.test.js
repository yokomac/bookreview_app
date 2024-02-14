import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('ログインフォームのテスト', () => {
  render(<App />);

  // 入力フォームが存在するか
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();

  // 送信ボタンが存在するか
  expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();

  // バリデーションメッセージが最初は表示されないことを確認
  expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();

  // 不正なメールアドレスを入力して送信
  fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid-email' } });
  fireEvent.click(screen.getByTestId('submit-button'));

  // バリデーションメッセージが表示されることを確認
  expect(screen.getByTestId('error-message')).toHaveTextContent('有効なメールアドレスを入力してください');

  // 正しいメールアドレスを入力して送信
  fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'valid-email@example.com' } });
  fireEvent.click(screen.getByTestId('submit-button'));

  // バリデーションメッセージが表示されないことを確認
  expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
});
