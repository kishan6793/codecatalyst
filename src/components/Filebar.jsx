import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createFile, removeFile, modifyFileName, selectFile } from '../store/fileSlice';
import { LANGUAGE_DATA } from '../utils/LANGUAGE_DATA';
import { fetchFiles } from '../store/fileSlice';
import { ClipLoader } from 'react-spinners';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import { Add, Upload, Edit, Delete, Cancel, Check, Search } from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
import SearchFileDialog from './SearchFileDialog';

const Filebar = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);
  const selectedFileId = useSelector((state) => state.file.selectedFileId);
  const userId = useSelector((state) => state.auth.userId);
  const authStatus = useSelector((state) => state.auth.AuthStatus);
  const loading = useSelector((state) => state.file.loading);
  
  const { GlobalTheme } = useTheme();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileLanguage, setNewFileLanguage] = useState('javascript');
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editFileName, setEditFileName] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDeleteId, setFileToDeleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const openSearchDialog = useCallback(() => setIsSearchDialogOpen(true), []);
  const closeSearchDialog = useCallback(() => setIsSearchDialogOpen(false), []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFiles(userId));
    }
  }, [dispatch, files.length, authStatus]);

  useEffect(() => {
    localStorage.setItem('selectedFileId', selectedFileId);
  }, [selectedFileId]);

  useEffect(() => {
    const selectedFile = localStorage.getItem('selectedFileId');
    if (selectedFile) {
      dispatch(selectFile(selectedFile));
    }
  }, [dispatch]);

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setNewFileName('');
    setNewFileLanguage('javascript');
  }, []);

  const openRenameDialog = useCallback((id, name) => {
    setEditingFileId(id);
    setEditFileName(name);
    setIsRenameDialogOpen(true);
  }, []);

  const closeRenameDialog = useCallback(() => {
    setIsRenameDialogOpen(false);
    setEditingFileId(null);
    setEditFileName('');
  }, []);

  const getCodeSnippet = (language) => {
    const languageData = LANGUAGE_DATA.find((lang) => lang.language === language);
    return languageData ? languageData.codeSnippet : '';
  };

  const handleAddFile = useCallback(async () => {
    if (newFileName.trim()) {
      const newFile = {
        name: newFileName.trim(),
        language: newFileLanguage,
        code: getCodeSnippet(newFileLanguage),
      };
      try {
        await dispatch(createFile({ userId, file: newFile }));
        closeDialog();
      } catch (error) {
        console.error('Failed to create file:', error);
      }
    }
  }, [newFileName, newFileLanguage, userId, dispatch, closeDialog]);

  const handleFileUpload = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();

        const languageData = LANGUAGE_DATA.find((lang) => lang.extension === fileExtension);

        if (languageData) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const content = e.target.result;
            const newFile = {
              name: fileName.replace(`.${fileExtension}`, ''),
              language: languageData.language,
              code: content,
            };
            try {
              await dispatch(createFile({ userId, file: newFile }));
            } catch (error) {
              console.error('Failed to upload file:', error);
            }
          };
          reader.readAsText(file);
          setErrorMessage('');
        } else {
          setErrorMessage(`Files with .${fileExtension} extension are not supported.`);
        }
      }
    },
    [dispatch, userId],
  );

  const handleDeleteFile = useCallback((id) => {
    setFileToDeleteId(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (editFileName.trim() && editingFileId) {
      try {
        await dispatch(modifyFileName(userId, editingFileId, editFileName));
        closeRenameDialog();
      } catch (error) {
        console.error('Failed to rename file:', error);
      }
    }
  }, [editFileName, editingFileId, userId, dispatch, closeRenameDialog]);

  const handleSelectFile = useCallback(
    (id) => {
      dispatch(selectFile(id));
    },
    [dispatch],
  );

  const confirmDelete = useCallback(async () => {
    if (fileToDeleteId) {
      try {
        dispatch(removeFile(userId, fileToDeleteId));
        setIsDeleteDialogOpen(false);
        setFileToDeleteId(null);
      } catch (error) {
        console.error('Failed to delete file:', error);
      }
    }
  }, [fileToDeleteId, userId, dispatch]);

  const cancelDelete = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setFileToDeleteId(null);
  }, []);

  const getLanguageIcon = (language) => {
    const languageData = LANGUAGE_DATA.find((lang) => lang.language === language);
    return languageData ? languageData.icon : '';
  };

  return (
    <div
      className="flex flex-col p-4 h-full overflow-y-auto"
      style={{
        background: GlobalTheme === 'dark' ? '#000000' : '#ffffff',
        borderRight: `1px solid ${GlobalTheme === 'dark' ? '#1a1a1a' : '#e5e5e5'}`,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openDialog}
          sx={{
            backgroundColor: GlobalTheme === 'dark' ? '#0ea5e9' : '#3b82f6',
            color: '#fff',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: GlobalTheme === 'dark' ? '#0284c7' : '#2563eb',
            },
          }}
        >
          Add
        </Button>

        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            startIcon={<Upload />}
            component="span"
            sx={{
              backgroundColor: GlobalTheme === 'dark' ? '#0ea5e9' : '#3b82f6',
              color: '#fff',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: GlobalTheme === 'dark' ? '#0284c7' : '#2563eb',
              },
            }}
          >
            Upload
          </Button>
        </label>

        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={openSearchDialog}
          sx={{
            backgroundColor: GlobalTheme === 'dark' ? '#0ea5e9' : '#3b82f6',
            color: '#fff',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: GlobalTheme === 'dark' ? '#0284c7' : '#2563eb',
            },
          }}
        ></Button>
      </Box>

      <SearchFileDialog open={isSearchDialogOpen} onClose={closeSearchDialog} />

      {errorMessage && (
        <Typography variant="body2" sx={{ color: 'error.main', marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Typography
        variant="h6"
        sx={{
          color: GlobalTheme === 'dark' ? '#4ec9b0' : '#3B82F6',
          marginBottom: 2,
        }}
      >
        Files
      </Typography>

      {loading && (
        <div className="flex justify-center items-center p-4">
          <ClipLoader color={GlobalTheme === 'dark' ? '#4ec9b0' : '#3B82F6'} size={30} />
        </div>
      )}

      {!loading && (
        <ul>
          {files.map((file) => (
            <li
              key={file.id}
              className={`mb-2 flex items-center justify-between p-2 rounded-md transition-all duration-200 ${
                selectedFileId === file.id
                  ? GlobalTheme === 'dark'
                    ? 'bg-[#252526] shadow-lg scale-105'
                    : 'bg-gray-200 shadow-lg scale-105'
                  : GlobalTheme === 'dark'
                    ? 'hover:bg-[#2d2d2d] hover:scale-105'
                    : 'hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <Button
                onClick={() => handleSelectFile(file.id)}
                sx={{
                  color: GlobalTheme === 'dark' ? '#d4d4d4' : '#1F2937',
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <img
                  src={getLanguageIcon(file.language)}
                  alt={`${file.language} logo`}
                  className="w-6 h-6"
                />
                {file.name}
              </Button>

              <div className="flex gap-2">
                <IconButton
                  onClick={() => openRenameDialog(file.id, file.name)}
                  sx={{
                    color: GlobalTheme === 'dark' ? '#d4d4d4' : '#1F2937',
                    transition: 'color 0.2s, transform 0.2s',
                    '&:hover': {
                      color: GlobalTheme === 'dark' ? '#6bd8c2' : '#2563EB',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteFile(file.id)}
                  sx={{
                    color: GlobalTheme === 'dark' ? '#d4d4d4' : '#1F2937',
                    transition: 'color 0.2s, transform 0.2s',
                    '&:hover': {
                      color: GlobalTheme === 'dark' ? '#6bd8c2' : '#2563EB',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle
          sx={{
            color: GlobalTheme === 'dark' ? '#4ec9b0' : '#3B82F6',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '16px',
          }}
        >
          Create New File
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="File Name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Language"
            value={newFileLanguage}
            onChange={(e) => setNewFileLanguage(e.target.value)}
            sx={{ marginBottom: 2 }}
          >
            {LANGUAGE_DATA.map((lang) => (
              <MenuItem key={lang.language} value={lang.language}>
                {lang.language} ({lang.version})
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={handleAddFile} startIcon={<Check />}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isRenameDialogOpen} onClose={closeRenameDialog}>
        <DialogTitle
          sx={{
            color: GlobalTheme === 'dark' ? '#22d3ee' : '#2563eb',
            fontWeight: '600',
            textAlign: 'center',
            fontSize: '1.25rem',
          }}
        >
          Rename File
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="New File Name"
            value={editFileName}
            onChange={(e) => setEditFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRenameDialog} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} startIcon={<Check />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle
          sx={{
            color: GlobalTheme === 'dark' ? '#4ec9b0' : '#3B82F6',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '16px',
          }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this file?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} startIcon={<Delete />} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(Filebar);
