import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ProfileEdit from '../pages/ProfileEdit';

export const Router = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLogIn)
  const token = sessionStorage.getItem('authToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfileEdit />} />
        {token || isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}