import { createSignal, createEffect } from 'solid-js';
import { HiSolidMoon, HiSolidSun } from 'solid-icons/hi';

function ThemeToggle() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = createSignal(storedTheme || (prefersDarkScheme.matches ? 'dark' : 'light'));

  createEffect(() => {
    const root = document.documentElement;
    if (theme() === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme());
  });

  const toggleTheme = () => {
    setTheme(theme() === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
    >
      {theme() === 'light' ? (
        <HiSolidMoon size={24} class="text-gray-800" />
      ) : (
        <HiSolidSun size={24} class="text-yellow-500" />
      )}
    </button>
  );
}

export default ThemeToggle;