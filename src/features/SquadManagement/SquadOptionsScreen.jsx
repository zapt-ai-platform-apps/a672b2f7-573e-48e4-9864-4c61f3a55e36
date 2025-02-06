import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state';

function SquadOptionsScreen() {
  const navigate = useNavigate();
  const { selectedSquad } = useStateContext();

  if (!selectedSquad) {
    navigate('/squads', { replace: true });
    return null;
  }

  const handleSetupGame = () => {
    navigate('/setup');
  };

  const handleEditSquad = () => {
    navigate('/squads/edit');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <h1 className="text-4xl font-bold mb-8">{selectedSquad.name}</h1>
      <p className="text-xl mb-8">What would you like to do?</p>
      <div className="flex space-x-8">
        <button
          onClick={handleSetupGame}
          className="px-8 py-4 bg-blue-500 text-white text-lg rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Set up for a Game
        </button>
        <button
          onClick={handleEditSquad}
          className="px-8 py-4 bg-yellow-500 text-white text-lg rounded-md cursor-pointer hover:bg-yellow-600 transition-colors"
        >
          Edit Squad
        </button>
      </div>
    </div>
  );
}

export default SquadOptionsScreen;