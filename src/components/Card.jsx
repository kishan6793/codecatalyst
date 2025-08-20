import React, { memo } from 'react';
import { useTheme } from '../hooks/useTheme';

const Card = ({ title, description, icon }) => {
  const { GlobalTheme } = useTheme();

  const isDark = GlobalTheme === 'dark';

  return (
    <div
      className={`flex flex-col items-center text-center p-6 rounded-xl border transition-transform transform hover:-translate-y-1 hover:shadow-xl ${
        isDark
          ? 'bg-gray-800 text-gray-200 border-gray-700'
          : 'bg-white text-gray-800 border-gray-200'
      }`}
    >
      {/* Icon */}
      <div className={`text-4xl mb-4 ${isDark ? 'text-teal-400' : 'text-blue-600'}`}>{icon}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm opacity-80 leading-relaxed">{description}</p>
    </div>
  );
};

export default memo(Card);
