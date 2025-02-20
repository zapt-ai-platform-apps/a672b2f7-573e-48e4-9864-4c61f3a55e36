import React from 'react';

interface EndGameConfirmationModalProps {
  showEndGameConfirm: boolean;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
}

function EndGameConfirmationModal({
  showEndGameConfirm,
  confirmEndGame,
  cancelEndGame
}: EndGameConfirmationModalProps): JSX.Element | null {
  if (!showEndGameConfirm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Confirm End Game
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Are you sure you want to end the game? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={cancelEndGame}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md font-medium transition-colors cursor-pointer hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={confirmEndGame}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-medium transition-colors cursor-pointer hover:bg-red-600"
          >
            End Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndGameConfirmationModal;