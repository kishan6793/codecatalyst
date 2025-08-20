import { createSlice } from '@reduxjs/toolkit';
import databaseService from '../firebase/db';

const initialState = {
  files: [],
  selectedFileId: null,
  loading: false,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
      state.loading = false;
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
      if (state.selectedFileId === action.payload) {
        state.selectedFileId = state.files.length ? state.files[0].id : null;
      }
    },
    updateFileCode: (state, action) => {
      const { id, code } = action.payload;
      const file = state.files.find((file) => file.id === id);
      if (file) {
        file.code = code;
      }
    },
    selectFile: (state, action) => {
      state.selectedFileId = action.payload;
    },
    updateFileName: (state, action) => {
      const { id, name } = action.payload;
      const file = state.files.find((file) => file.id === id);
      if (file) {
        file.name = name;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFiles,
  addFile,
  deleteFile,
  updateFileCode,
  selectFile,
  updateFileName,
  setLoading,
} = fileSlice.actions;

// Thunk actions
export const fetchFiles = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const files = await databaseService.getFiles(userId);
    dispatch(setFiles(files));
  } catch (error) {
    console.error('Failed to fetch files:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createFile = (data) => async (dispatch) => {
  const { userId, file } = data;
  if (!file || !file.name || !file.language || !file.code) {
    throw new Error('File data is incomplete.');
  }
  try {
    const fileId = await databaseService.addFile(userId, file);
    if (fileId != null) dispatch(addFile({ id: fileId, ...file }));
  } catch (error) {
    console.error('Failed to create file:', error);
    throw error;
  }
};

export const removeFile = (userId, fileId) => async (dispatch) => {
  try {
    await databaseService.deleteFile(userId, fileId);
    dispatch(deleteFile(fileId));
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
};

export const modifyFileCode = (userId, fileId, code) => async (dispatch) => {
  try {
    await databaseService.updateFile(userId, fileId, { code });
    dispatch(updateFileCode({ id: fileId, code }));
  } catch (error) {
    console.error('Failed to update file code:', error);
  }
};

export const modifyFileName = (userId, fileId, name) => async (dispatch) => {
  try {
    const modified = await databaseService.updateFile(userId, fileId, { name });
    if (modified) dispatch(updateFileName({ id: fileId, name }));
  } catch (error) {
    console.error('Failed to update file name:', error);
  }
};

export default fileSlice.reducer;
