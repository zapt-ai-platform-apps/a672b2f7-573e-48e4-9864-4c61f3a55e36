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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Confirm Substitution</h2>
        <p>
          Are you sure you want to substitute{' '}
          {selectedSubOffPlayer ? selectedSubOffPlayer.name : 'Unknown Player'} with{' '}
          {selectedSubOnPlayer ? selectedSubOnPlayer.name : 'Unknown Player'}?
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={cancelSubstitution}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmSubstitution}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubstitutionConfirmationModal;