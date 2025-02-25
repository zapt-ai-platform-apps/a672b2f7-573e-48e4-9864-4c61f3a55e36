import React from 'react';
import type { Player } from '../../../types/GameTypes';

interface SubstitutionConfirmationModalProps {
  selectedSubOffPlayer: Player | null;
  selectedSubOnPlayer: Player | null;
  confirmSubstitution: () => void;
  cancelSubstitution: () => void;
}

function SubstitutionConfirmationModal({
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  confirmSubstitution,
  cancelSubstitution
}: SubstitutionConfirmationModalProps): JSX.Element {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Confirm Substitution
        </h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Are you sure you want to substitute{' '}
          <span className="font-semibold text-red-600 dark:text-red-400">
            {selectedSubOffPlayer?.name}
          </span>{' '}
          for{' '}
          <span className="font-semibold text-green-600 dark:text-green-400">
            {selectedSubOnPlayer?.name}
          </span>
          ?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
            onClick={cancelSubstitution}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            onClick={confirmSubstitution}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubstitutionConfirmationModal;