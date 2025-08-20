import React, { memo } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const Footer = () => {
  const { GlobalTheme } = useTheme();
  const isDark = GlobalTheme === 'dark';

  return (
    <footer
      className={`w-full py-6 border-t ${
        isDark
          ? 'bg-gray-900 border-gray-800 text-gray-400'
          : 'bg-gray-100 border-gray-300 text-gray-700'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          {/* GitHub Link */}
          <a
            href="https://github.com/kishan6793"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm hover:text-blue-500 transition-colors ${
              isDark ? 'text-teal-400' : 'text-blue-600'
            }`}
          >
            <FaGithub className="w-5 h-5" />
            <span className="font-medium">kishan6793</span>
          </a>

          {/* Copyright */}
          <div className="text-xs opacity-75 text-center">
            &copy; {new Date().getFullYear()} CodeCatalyst. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
