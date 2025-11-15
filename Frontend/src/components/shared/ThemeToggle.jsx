import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = "", size = 18, showLabel = false }) => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100 transition-all duration-200 hover:scale-105 ${className}`}
      aria-label={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkTheme ? (
        <Sun size={size} />
      ) : (
        <Moon size={size} />
      )}
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {darkTheme ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;

