import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-500 flex flex-col items-center justify-center text-white text-center p-4">
      <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-white text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors duration-300"
      >
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
