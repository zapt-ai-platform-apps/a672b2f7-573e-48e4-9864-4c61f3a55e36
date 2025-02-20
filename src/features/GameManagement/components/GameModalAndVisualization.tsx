import React from 'react';

interface EndGameConfirmationModalProps {
  showEndGameConfirm: boolean;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
}

export function EndGameConfirmationModal({
  showEndGameConfirm,
  confirmEndGame,
  cancelEndGame,
}: EndGameConfirmationModalProps): JSX.Element | null {
  if (!showEndGameConfirm) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
        <p className="mb-4">Are you sure you want to end the game?</p>
        <div className="flex justify-end">
          <button 
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
            onClick={cancelEndGame}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
            onClick={confirmEndGame}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}