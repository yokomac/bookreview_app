import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ProfileEdit from '../pages/ProfileEdit';
import PublicBookList from "../pages/PublicBookList";

export const Router = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLogIn)
  const token = sessionStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/public/books" element={<PublicBookList />} />
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
      </Routes>
    </BrowserRouter>
  )
}

// <Route path="/login" element={<LogIn />} />
// <Route path="/signup" element={<SignUp />} />