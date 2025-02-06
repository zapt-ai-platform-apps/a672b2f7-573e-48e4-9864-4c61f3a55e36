import React from 'react';
import { supabase } from '../../supabaseClient.js';
import { useAuth } from '../AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

function NavBarUserControls() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300 ease-in-out-custom"
      >
        Sign Out
      </button>
    </>
  );
}

export default NavBarUserControls;