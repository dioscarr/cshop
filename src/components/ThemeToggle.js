import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 
                 text-gray-800 dark:text-white shadow-lg hover:shadow-xl
                 transition-all duration-200 z-50 flex items-center space-x-2"
    >
      {isDark ? (
        <>
          <span className="text-xl">🌞</span>
          <span className="hidden md:inline">Light Mode</span>
        </>
      ) : (
        <>
          <span className="text-xl">🌙</span>
          <span className="hidden md:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
