import React, { useState } from 'react';
import Logo from './Logo';
import authService from '../firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme'; // Custom hook for GlobalTheme
import { Button, Typography } from '@mui/material'; // Material-UI components
import { Google as GoogleIcon } from '@mui/icons-material'; // Material-UI Google icon

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { GlobalTheme } = useTheme(); // Access the global GlobalTheme

  const signupHandler = async (name, email, password) => {
    try {
      const user = await authService.signupHandler(email, password);
      dispatch(
        login({
          userId: user.uid,
          userImgUrl: user.photoURL,
        }),
      );
      navigate('/ide');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const SignUpWithGoogle = () => {
    authService
      .SignUpWithGoogle()
      .then((user) => {
        dispatch(
          login({
            userId: user.uid,
            userImgUrl: user.photoURL,
          }),
        );
        navigate('/ide');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        GlobalTheme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-100' // VS Code dark background
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-lg w-full max-w-md border ${
          GlobalTheme === 'dark' ? 'bg-[#252526] border-[#333333]' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex justify-center">
          <Logo className="h-10 w-10 mr-2" />
          <Typography
            variant="h4"
            className={`font-bold bg-clip-text ${
              GlobalTheme === 'dark'
                ? 'text-transparent bg-gradient-to-r from-cyan-400 to-blue-500'
                : 'text-transparent bg-gradient-to-r from-cyan-600 to-blue-700'
            }`}
          >
            CodeCatalyst
          </Typography>
        </div>

        <Typography
          variant="h5"
          className={`text-center mt-3 ${
            GlobalTheme === 'dark' ? 'text-[#d4d4d4]' : 'text-gray-900'
          }`}
        >
          Sign Up
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signupHandler(name, email, password);
          }}
        >
          <div className="mb-4">
            <Typography
              variant="body1"
              className={`${GlobalTheme === 'dark' ? 'text-[#d4d4d4]' : 'text-gray-700'}`}
            >
              Name
            </Typography>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className={`mt-1 block w-full px-3 py-2 rounded-md outline-none focus:ring-2 ${
                GlobalTheme === 'dark'
                  ? 'bg-[#333333] text-[#d4d4d4] focus:ring-cyan-500 focus:border-cyan-500'
                  : 'bg-gray-100 text-gray-900 focus:ring-cyan-600 focus:border-cyan-600'
              }`}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <Typography
              variant="body1"
              className={`${GlobalTheme === 'dark' ? 'text-[#d4d4d4]' : 'text-gray-700'}`}
            >
              Email
            </Typography>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className={`mt-1 block w-full px-3 py-2 rounded-md outline-none focus:ring-2 ${
                GlobalTheme === 'dark'
                  ? 'bg-[#333333] text-[#d4d4d4] focus:ring-cyan-500 focus:border-cyan-500'
                  : 'bg-gray-100 text-gray-900 focus:ring-cyan-600 focus:border-cyan-600'
              }`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <Typography
              variant="body1"
              className={`${GlobalTheme === 'dark' ? 'text-[#d4d4d4]' : 'text-gray-700'}`}
            >
              Password
            </Typography>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 rounded-md outline-none focus:ring-2 ${
                GlobalTheme === 'dark'
                  ? 'bg-[#333333] text-[#d4d4d4] focus:ring-cyan-500 focus:border-cyan-500'
                  : 'bg-gray-100 text-gray-900 focus:ring-cyan-600 focus:border-cyan-600'
              }`}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={`mt-4 ${
              GlobalTheme === 'dark'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800'
            }`}
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center p-2">
          <div
            className={`w-full border-t ${GlobalTheme === 'dark' ? 'border-[#333333]' : 'border-gray-300'}`}
          ></div>
          <Typography
            variant="body2"
            className={`px-2 ${GlobalTheme === 'dark' ? 'text-[#a9a9a9]' : 'text-gray-500'}`}
          >
            or
          </Typography>
          <div
            className={`w-full border-t ${GlobalTheme === 'dark' ? 'border-[#333333]' : 'border-gray-300'}`}
          ></div>
        </div>

        <Button
          onClick={SignUpWithGoogle}
          variant="contained"
          fullWidth
          startIcon={<GoogleIcon />}
          className={`mt-6  transition-all duration-300 ${
            GlobalTheme === 'dark'
              ? 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg'
              : 'bg-[#4285F4] text-white hover:bg-[#357ABD] hover:shadow-lg'
          }`}
          style={{
            background: GlobalTheme === 'dark' ? 'white' : '#4285F4',
            color: GlobalTheme === 'dark' ? 'black' : 'white',
            border: GlobalTheme === 'dark' ? '1px solid #333333' : 'none',
            boxShadow: GlobalTheme === 'dark' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          Sign up with Google
        </Button>

        <div className="mt-6 text-center">
          <Typography
            variant="body2"
            className={`${GlobalTheme === 'dark' ? 'text-[#a9a9a9]' : 'text-gray-600'}`}
          >
            Already have an account?{' '}
            <Button
              onClick={() => navigate('/login')}
              variant="text"
              className={`${
                GlobalTheme === 'dark'
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : 'text-cyan-600 hover:text-cyan-700'
              }`}
            >
              Login
            </Button>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Signup;
