import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookReviewForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    detail: '',
    review: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitReview = async () => {
    const apiUrl = 'https://railway.bookreview.techtrain.dev/books';
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('書籍レビューが投稿されました！');
        navigate('/'); // ログイン後のページに移動
      } else {
        alert('書籍レビューの投稿に失敗しました。');
      }
    } catch (error) {
      console.error('エラー:', error);
      alert('予期せぬエラーが発生しました。');
    }
  };

  return (
    <div>
      <h1>書籍レビュー投稿</h1>
      <form>
        <label htmlFor="title">タイトル:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required /><br />

        <label htmlFor="url">URL:</label>
        <input type="text" id="url" name="url" value={formData.url} onChange={handleInputChange} required /><br />

        <label htmlFor="detail">詳細情報:</label>
        <textarea id="detail" name="detail" value={formData.detail} onChange={handleInputChange} required></textarea><br />

        <label htmlFor="review">レビュー内容:</label>
        <textarea id="review" name="review" value={formData.review} onChange={handleInputChange} required></textarea><br />

        <button type="button" onClick={submitReview}>投稿する</button>
      </form>
    </div>
  );
};

export default BookReviewForm;
