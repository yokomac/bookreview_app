import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

const initialState = {
  isLogIn: cookie.get('token') !== undefined,
  token: cookie.get('token') || null, // 新しく追加：トークンを保持するstate
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLogIn = true;
      state.token = action.payload; // ログイン時にトークンをstateに保存
    },
    logOut: (state) => {
      state.isLogIn = false;
      state.token = null; // ログアウト時にトークンをnullに設定
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const { setToken } = authSlice.actions;

export const selectIsLogIn = (state) => state.auth.isLogIn;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;