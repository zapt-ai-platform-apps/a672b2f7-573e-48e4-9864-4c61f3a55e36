import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthSession from '../../hooks/useAuthSession';
import * as Sentry from '@sentry/browser';

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
      Sentry.captureException(error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {session ? (
        <button
          onClick={handleSignOut}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          data-testid="sign-out-button"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          data-testid="sign-in-button"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default NavBarUserControls;