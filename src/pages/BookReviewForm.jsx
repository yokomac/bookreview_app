import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Bootstrapコンポーネントをインポート
import { Link } from 'react-router-dom';

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
      <h2 className='Form-margin'>Book Review Form</h2>
      <Form>
        <Form.Label className='Form-margin' htmlFor="title">タイトル</Form.Label>
        <Form.Control className='Form-width-md' type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required /><br />

        <Form.Label className='Form-margin' htmlFor="url">URL</Form.Label>
        <Form.Control className='Form-width-md' type="text" id="url" name="url" value={formData.url} onChange={handleInputChange} required /><br />

        <Form.Label className='Form-margin' htmlFor="detail">詳細情報</Form.Label>
        <Form.Control className='Form-width-md' id="detail" name="detail" value={formData.detail} onChange={handleInputChange} required /><br />

        <Form.Label className='Form-margin' htmlFor="review">レビュー内容</Form.Label>
        <Form.Control className='Form-width-md' id="review" name="review" value={formData.review} onChange={handleInputChange} required /><br />

        <Button className='Form-margin' variant="primary" type="button" onClick={submitReview}>投稿する</Button>
      </Form>
      <div className='Form-margin'>
        <Link to="/" className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>ホームに戻る</Link>
      </div>
    </div>
  );
};

export default BookReviewForm;
