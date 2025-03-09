import React, { useState, useEffect } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

function ThemeToggle() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || (prefersDarkScheme.matches ? 'dark' : 'light'));

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-400"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <HiMoon size={20} className="text-gray-700" />
      ) : (
        <HiSun size={20} className="text-yellow-400" />
      )}
    </button>
  );
}

export default ThemeToggle;