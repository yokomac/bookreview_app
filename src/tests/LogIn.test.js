import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LogIn from '../LogIn';

test('ログインフォームのテスト', () => {
  render(<LogIn />);

  // 入力フォームが存在するか
  expect(screen.getByLabelText('Email:')).toBeTruthy();

  // 送信ボタンが存在するか
  expect(screen.getByRole('button')).toBeTruthy();

  // バリデーションメッセージが最初は表示されないことを確認
  expect(screen.queryByTestId('error-message')).not.toBeTruthy();
});