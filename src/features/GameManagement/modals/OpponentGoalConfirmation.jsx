import React from 'react';

function OpponentGoalConfirmation({ handleConfirm, handleCancel }) {
  return (
    <div className="text-gray-800 dark:text-white">
      <p className="mt-4 mb-2 text-lg">Confirm opponent team scored?</p>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default OpponentGoalConfirmation;