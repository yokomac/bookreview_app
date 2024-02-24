import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Bootstrapコンポーネントをインポート
import { Link } from 'react-router-dom';

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    detail: '',
    review: '',
  });

  useEffect(() => {
    // 書籍取得APIを使って書籍情報を取得
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleInputChange = (e) => {
    // フォームの入力変更時にstateを更新
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 書籍更新APIを使って書籍情報を更新
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(book),
      });

      // 成功したら一覧画面に戻る
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to update book details');
      }
    } catch (error) {
      console.error('Error updating book details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div >
      <h2 className='Form-margin' >Edit Book Review</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Label className='Form-margin' >Title</Form.Label>
        <Form.Control type="text" name="title" value={book.title} onChange={handleInputChange} className='Form-width-md' required />

        <Form.Label className='Form-margin' >Detail</Form.Label>
        <Form.Control name="detail" value={book.detail} onChange={handleInputChange} className='Form-width-md' required />

        <Form.Label className='Form-margin' >Review</Form.Label>
        <Form.Control name="review" value={book.review} onChange={handleInputChange} className='Form-width-md' required />
        
        <Button variant="primary" type="submit" className='Form-margin' >Update Review</Button>
      </Form>
      <Button variant="primary" onClick={handleDelete} type="button" className='Form-margin' >Delete Review</Button>
      <div className='Form-margin'>
        <Link to="/" className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>ホームに戻る</Link>
      </div>
    </div>
  );
};

export default BookEdit;
