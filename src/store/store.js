import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import fileSlice from './fileSlice';
import themeSlice from './themeSlice';
import codeExecutionSlice from './codeExecutionSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    file: fileSlice,
    theme: themeSlice,
    execution: codeExecutionSlice,
  },
});

export default store;
