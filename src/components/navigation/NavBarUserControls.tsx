import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthSession from '@/hooks/useAuthSession';

const NavBarUserControls: React.FC = () => {
  const navigate = useNavigate();
  const { session, signOut } = useAuthSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      // The navigation is handled inside the signOut function
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div className="flex items-center gap-4">
      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-800 dark:text-gray-100">
            {session.user?.email}
          </span>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default NavBarUserControls;