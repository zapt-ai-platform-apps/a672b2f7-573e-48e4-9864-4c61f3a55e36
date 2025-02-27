import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthSession from '../../hooks/useAuthSession';

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
    <div className="flex items-center space-x-4">
      {session ? (
        <button
          onClick={handleSignOut}
          className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default NavBarUserControls;