import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '../../hooks';

const NavBarUserControls: React.FC = () => {
  const { session, signOut } = useAuthSession();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center">
      {session ? (
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          aria-label="Sign out"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          aria-label="Sign in"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default NavBarUserControls;