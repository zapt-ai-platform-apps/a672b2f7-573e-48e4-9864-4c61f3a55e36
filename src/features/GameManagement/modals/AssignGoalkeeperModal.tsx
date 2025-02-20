import React from 'react';

interface Player {
  name: string;
}

interface AssignGoalkeeperModalProps {
  showGKModal: boolean;
  availablePlayers: Player[] | (() => Player[]);
  setSelectedNewGoalkeeper: (name: string) => void;
  setShowGKConfirmModal: (value: boolean) => void;
  setShowGKModal: (value: boolean) => void;
}

export default function AssignGoalkeeperModal({
  showGKModal,
  availablePlayers,
  setSelectedNewGoalkeeper,
  setShowGKConfirmModal,
  setShowGKModal
}: AssignGoalkeeperModalProps): JSX.Element | null {
  const selectGoalkeeper = (playerName: string): void => {
    setSelectedNewGoalkeeper(playerName);
    setShowGKModal(false);
    setShowGKConfirmModal(true);
  };

  if (!showGKModal) return null;
  const playersArray: Player[] = typeof availablePlayers === 'function' ? availablePlayers() : availablePlayers;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-white">Select a New Goalkeeper</h2>
        <ul>
          {playersArray.map((player, index) => (
            <li key={index} className="mb-2">
              <button
                className="w-full px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
                onClick={() => selectGoalkeeper(player.name)}
              >
                {player.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          onClick={() => setShowGKModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}