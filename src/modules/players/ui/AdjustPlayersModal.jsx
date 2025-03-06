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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {adjustType === 'increase' ? 'Add Player to Field' : 'Remove Player from Field'}
        </h2>
        <div className="max-h-60 md:max-h-96 overflow-y-auto">
          <ul className="space-y-2">
            {playersList.map((player, index) => (
              <li
                key={index}
                className="p-3 md:p-4 bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                onClick={() => handlePlayerSelection(player)}
              >
                {player.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-4 px-4 py-2 md:px-6 md:py-3 bg-gray-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
          onClick={() => setShowAdjustModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AdjustPlayersModal;