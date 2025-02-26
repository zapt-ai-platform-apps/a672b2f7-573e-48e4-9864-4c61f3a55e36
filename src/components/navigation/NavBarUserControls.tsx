import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthSession from '../../hooks/useAuthSession';

/**
 * User controls for the navigation bar
 * @returns NavBarUserControls component
 */
const NavBarUserControls: React.FC = () => {
  const navigate = useNavigate();
  const { session, signOut } = useAuthSession();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div className="flex items-center">
      {session ? (
        <button
          onClick={signOut}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default NavBarUserControls;