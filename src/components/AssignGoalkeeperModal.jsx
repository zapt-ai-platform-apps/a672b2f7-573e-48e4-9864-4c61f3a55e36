import React from 'react';

function AssignGoalkeeperModal({ showGKModal, availablePlayers, setSelectedNewGoalkeeper, setShowGKConfirmModal, setShowGKModal }) {
  const selectGoalkeeper = (playerName) => {
    setSelectedNewGoalkeeper(playerName);
    setShowGKModal(false);
    setShowGKConfirmModal(true);
  };

  if (!showGKModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-white">Select a New Goalkeeper</h2>
        <ul>
          {availablePlayers.map((player, index) => (
            <li key={index} className="mb-2">
              <button
                className="w-full px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400"
                onClick={() => selectGoalkeeper(player.name)}
              >
                {player.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setShowGKModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AssignGoalkeeperModal;