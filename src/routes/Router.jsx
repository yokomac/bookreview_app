import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isLogIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {auth ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}