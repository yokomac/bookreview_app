import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ProfileEdit from '../pages/ProfileEdit';
import PublicBookList from "../pages/PublicBookList";
import BookReviewForm from "../pages/BookReviewForm";
import BookDetail from "../pages/BookDetail";
import BookEdit from "../pages/BookEdit";

export const Router = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLogIn)
  const token = sessionStorage.getItem('token');
  console.log(token, isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/public/books" element={<PublicBookList />} />
        <Route path="/new" element={<BookReviewForm />} />
        <Route path="/detail/:id" element={<BookDetail />} />
        <Route path="/edit/:id" element={<BookEdit />} />

        {token || isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/public/books" />} />
        )}

        {token || isLoggedIn ? (
          <Route path="/login" element={<Navigate replace to="/" />} />
        ) : (
          <Route path="/login" element={<LogIn />} />
        )}

        {token || isLoggedIn ? (
          <Route path="/signup" element={<Navigate replace to="/" />} />
        ) : (
          <Route path="/signup" element={<SignUp />} />
        )}

        {token || isLoggedIn ? (
          <Route path="/public/books" element={<Navigate replace to="/" />} />
        ) : (
          <Route path="/public/books" element={<PublicBookList />} />
        )}

        {token || isLoggedIn ? (
          <Route path="/profile" element={<ProfileEdit />} />
        ) : (
          <Route path="/profile" element={<Navigate replace to="/" />} />
        )}

        
      </Routes>
    </BrowserRouter>
  )
}

// <Route path="/login" element={<LogIn />} />
// <Route path="/signup" element={<SignUp />} />