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
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <HiMoon size={24} className="text-gray-800" />
      ) : (
        <HiSun size={24} className="text-yellow-500" />
      )}
    </button>
  );
}

export default ThemeToggle;