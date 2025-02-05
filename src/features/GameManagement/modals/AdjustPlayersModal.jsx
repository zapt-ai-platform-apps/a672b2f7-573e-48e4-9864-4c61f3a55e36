import React from 'react';

function AdjustPlayersModal({ showAdjustModal, setShowAdjustModal, adjustType, onFieldPlayers, offFieldPlayers, setSelectedPlayer, setShowConfirmModal }) {
  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player);
    setShowAdjustModal(false);
    setShowConfirmModal(true);
  };

  const playersList = adjustType === 'increase' ? offFieldPlayers : onFieldPlayers;

  if (!showAdjustModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {adjustType === 'increase' ? 'Add Player to Field' : 'Remove Player from Field'}
        </h2>
        <ul>
          {playersList.map((player, index) => (
            <li
              key={index}
              className="p-4 mb-2 bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
              onClick={() => handlePlayerSelection(player)}
            >
              {player.name}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setShowAdjustModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AdjustPlayersModal;