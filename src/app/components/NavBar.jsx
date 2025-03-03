import React from 'react';
import ThemeToggle from './ThemeToggle';

function NavBar() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-shadow duration-200 ease-in-out-custom">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=32&height=32"
            alt="Football Subs Logo"
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">Football Subs</span>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors duration-300 ease-in-out-custom cursor-pointer"
          >
            Made on ZAPT
          </a>
          <a
            href="mailto:footballsubs@zapt.ai"
            className="text-gray-800 dark:text-white hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors duration-300 ease-in-out-custom cursor-pointer"
          >
            Contact Us
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;