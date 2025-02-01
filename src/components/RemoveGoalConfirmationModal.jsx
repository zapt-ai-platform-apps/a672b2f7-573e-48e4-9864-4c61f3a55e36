import React from 'react';

function RemoveGoalConfirmationModal({ showRemoveGoalConfirm, confirmRemoveGoal, cancelRemoveGoal }) {
  if (!showRemoveGoalConfirm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Confirm Remove Last Goal</h2>
        <p className="mb-4 text-lg text-gray-800 dark:text-gray-200">Are you sure you want to remove the last goal scored?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={confirmRemoveGoal}
          >
            Yes
          </button>
          <button
            className="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
            onClick={cancelRemoveGoal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveGoalConfirmationModal;