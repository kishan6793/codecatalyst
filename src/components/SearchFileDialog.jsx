import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import databaseService from '../firebase/db';
import { selectFile } from '../store/fileSlice';

const SearchFileDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [searchPrefix, setSearchPrefix] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchFiles = async () => {
      if (!searchPrefix.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const results = await databaseService.searchFilesByPrefix(userId, searchPrefix.trim());
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching files:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchFiles();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchPrefix, userId]);

  const handleFileClick = useCallback(
    (fileId) => {
      dispatch(selectFile(fileId));
      onClose();
    },
    [dispatch, onClose],
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Search Files</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          value={searchPrefix}
          onChange={(e) => setSearchPrefix(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {loading ? (
          <Typography variant="body2">Searching...</Typography>
        ) : searchResults.length > 0 ? (
          <List>
            {searchResults.map((file) => (
              <ListItem key={file.id} button onClick={() => handleFileClick(file.id)}>
                <ListItemText primary={file.name} secondary={file.language} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            No files found.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(SearchFileDialog);
