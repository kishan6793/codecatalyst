import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from '../store/themeSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const GlobalTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('theme', GlobalTheme);
  }, [GlobalTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  return {
    GlobalTheme,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (theme) => dispatch(setTheme(theme)),
  };
};
