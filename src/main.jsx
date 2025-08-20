import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StartPage, LoginPage, SignupPage, Editor, NotFoundPage } from './pages';
import { AuthLayout } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authRequired={false}>
            <StartPage />
          </AuthLayout>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthLayout authRequired={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authRequired={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: '/ide',
        element: (
          <AuthLayout authRequired={true}>
            <Editor />
          </AuthLayout>
        ),
      },
      {
        path: '/guest',
        element: (
          <AuthLayout authRequired={false}>
            <Editor />
          </AuthLayout>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
