import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import { HiMenu, HiX } from 'react-icons/hi';

function NavBar() {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className={`bg-white dark:bg-gray-800 sticky top-0 z-40 transition-shadow duration-200 ${isScrolled ? 'shadow-md' : 'border-b border-gray-200 dark:border-gray-700'}`}>
      <div className="container mx-auto px-4 py-3">
        {/* Desktop and Mobile top bar */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3" onClick={handleNavLinkClick}>
            <img
              src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=32&height=32"
              alt="Football Subs Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Football Subs</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/squads" 
                  className={`text-gray-700 dark:text-gray-200 hover:text-brand-500 dark:hover:text-brand-400 font-medium ${location.pathname.includes('/squads') ? 'text-brand-500 dark:text-brand-400' : ''}`}
                >
                  My Squads
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 dark:text-gray-200 hover:text-brand-500 dark:hover:text-brand-400 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`text-gray-700 dark:text-gray-200 hover:text-brand-500 dark:hover:text-brand-400 font-medium ${location.pathname === '/login' ? 'text-brand-500 dark:text-brand-400' : ''}`}
              >
                Sign In
              </Link>
            )}
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-200 hover:text-brand-500 dark:hover:text-brand-400 font-medium"
            >
              Made on ZAPT
            </a>
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-3">
            <ThemeToggle />
            <button 
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile navigation menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <>
                <Link 
                  to="/squads" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.includes('/squads') 
                      ? 'bg-brand-50 dark:bg-gray-700 text-brand-500 dark:text-brand-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={handleNavLinkClick}
                >
                  My Squads
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/login' 
                    ? 'bg-brand-50 dark:bg-gray-700 text-brand-500 dark:text-brand-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={handleNavLinkClick}
              >
                Sign In
              </Link>
            )}
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;