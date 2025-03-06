import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '@/modules/ui/components/ThemeToggle';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import { HiMenu, HiX } from 'react-icons/hi';

function NavBar() {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-shadow duration-200 ease-in-out-custom">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop and Mobile top bar */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={handleNavLinkClick}>
            <img
              src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=32&height=32"
              alt="Football Subs Logo"
              className="w-8 h-8"
            />
            <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Football Subs</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <button 
              className="md:hidden text-gray-800 dark:text-white p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/squads" 
                  className="text-gray-800 dark:text-white hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors duration-300 ease-in-out-custom cursor-pointer"
                >
                  My Squads
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-800 dark:text-white hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors duration-300 ease-in-out-custom cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors duration-300 ease-in-out-custom cursor-pointer"
              >
                Sign In
              </Link>
            )}
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-white hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors duration-300 ease-in-out-custom cursor-pointer"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
        
        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link 
                    to="/squads" 
                    className="text-gray-800 dark:text-white hover:text-brand-500 py-2 block"
                    onClick={handleNavLinkClick}
                  >
                    My Squads
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-800 dark:text-white hover:text-brand-500 py-2 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:text-brand-500 py-2 block"
                  onClick={handleNavLinkClick}
                >
                  Sign In
                </Link>
              )}
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-white hover:text-brand-500 py-2 block"
                onClick={handleNavLinkClick}
              >
                Made on ZAPT
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;