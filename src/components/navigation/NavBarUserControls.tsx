import React from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavBarUserControls(): JSX.Element {
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  if (session?.user) {
    return (
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300 ease-in-out-custom"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300 ease-in-out-custom"
    >
      Sign In
    </button>
  );
}

export default NavBarUserControls;