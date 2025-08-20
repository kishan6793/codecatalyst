import React, { useState, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import authService from '../firebase/auth';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Logo from './Logo';
import { useTheme } from '../hooks/useTheme';

const Header = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { GlobalTheme, toggleTheme } = useTheme();
  const authStatus = useSelector((state) => state.auth.AuthStatus);
  const userImgUrl = useSelector((state) => state.auth.userImgUrl);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const logoutHandler = useCallback(() => {
    authService
      .logoutHandler()
      .then(() => {
        dispatch(logout());
        navigate('/');
      })
      .catch((error) => console.error());
  }, [dispatch, navigate]);

  return (
    <>
      <AppBar
        position="static"
        className={`shadow-md ${className}`}
        sx={{
          backgroundColor: GlobalTheme === 'dark' ? '#121212' : '#ffffff',
          color: GlobalTheme === 'dark' ? '#ffffff' : '#000000',
          borderBottom: GlobalTheme === 'dark' ? '1px solid #333' : '1px solid #e0e0e0',
        }}
      >
        <Toolbar className="flex justify-between">
          {/* Logo & Title */}
          <div className="flex items-center">
            <Logo className="h-10 w-10 mr-2" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              CodeCatalyst
            </Typography>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            {authStatus ? (
              <>
                {/* Profile Button */}
                <IconButton onClick={handleProfileClick}>
                  <Avatar
                    src={
                      userImgUrl == null
                        ? 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
                        : userImgUrl
                    }
                    alt=""
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>

                {/* Profile Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: GlobalTheme === 'dark' ? '#333' : '#f5f5f5',
                      border: GlobalTheme === 'dark' ? '1px solid #444' : '1px solid #ddd',
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setShowLogoutModal(true);
                    }}
                    sx={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                      },
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {location.pathname !== '/ide' && (
                  <>
                    {location.pathname === '/guest' && (
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/signup')}
                        sx={{
                          borderColor: GlobalTheme === 'dark' ? '#555' : '#ccc',
                          color: GlobalTheme === 'dark' ? '#fff' : '#000',
                        }}
                      >
                        Sign up
                      </Button>
                    )}
                    {location.pathname === '/' && (
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/guest')}
                        sx={{
                          borderColor: GlobalTheme === 'dark' ? '#555' : '#ccc',
                          color: GlobalTheme === 'dark' ? '#fff' : '#000',
                        }}
                      >
                        Try for free
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={() => navigate('/login')}
                      sx={{
                        backgroundColor: GlobalTheme === 'dark' ? '#333' : '#e0e0e0',
                        color: GlobalTheme === 'dark' ? '#fff' : '#000',
                        '&:hover': {
                          backgroundColor: GlobalTheme === 'dark' ? '#444' : '#d5d5d5',
                        },
                      }}
                    >
                      Login
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Theme Toggle - Updated to ensure visibility */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: GlobalTheme === 'dark' ? '#fff' : '#000',
                '&:hover': {
                  backgroundColor: GlobalTheme === 'dark' ? '#333' : '#e0e0e0',
                },
              }}
            >
              {GlobalTheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Logout Modal */}
      <Modal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: GlobalTheme === 'dark' ? '#333' : '#fff',
            color: GlobalTheme === 'dark' ? '#fff' : '#000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            border: GlobalTheme === 'dark' ? '1px solid #444' : '1px solid #ddd',
          }}
        >
          <Typography id="logout-modal-title" variant="h6" component="h2">
            Are you sure you want to logout?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              onClick={() => setShowLogoutModal(false)}
              variant="outlined"
              sx={{
                mr: 2,
                borderColor: GlobalTheme === 'dark' ? '#555' : '#ccc',
                color: GlobalTheme === 'dark' ? '#fff' : '#000',
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setShowLogoutModal(false);
                logoutHandler();
              }}
              variant="contained"
              sx={{
                backgroundColor: '#f44336',
                '&:hover': { backgroundColor: '#d32f2f' },
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default memo(Header);
