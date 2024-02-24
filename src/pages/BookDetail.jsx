import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import "./BookDetail.css"

const BookDetail = () => {
  const { id } = useParams();
  //const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // トークンを取得
        const token = sessionStorage.getItem('token');
        // 書籍情報を取得するAPIの呼び出し
        const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
          },
        });
        const data = await response.json();
        
        // 取得した書籍情報をセットし、ローディングを終了
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <>
      <Header />
      <div className='detail'>
        {book.isMine && <p className="home__review--mine">これは私のレビューです</p>}
        <h2>{book.title}</h2>
        <p>Reviewer: {book.reviewer}</p>
        <h5>Detail</h5>
        <p>{book.detail}</p>
        <h5>Review</h5>
        <p>{book.review}</p>
        <p>URL: <a href={book.url} target="_blank" rel="noopener noreferrer">{book.url}</a></p>
        <div className='Form-margin'>
          <Link to="/" className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>ホームに戻る</Link>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
