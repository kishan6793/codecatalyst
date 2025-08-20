import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_PROFILE_IMG = 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png';

const initialState = {
  AuthStatus: false,
  userId: null,
  userImgUrl: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.AuthStatus = true;
      state.userId = action.payload.userId;
      state.userImgUrl = action.payload.userImgUrl;
    },
    logout: (state) => {
      state.AuthStatus = false;
      state.userId = null;
      state.userImgUrl = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
