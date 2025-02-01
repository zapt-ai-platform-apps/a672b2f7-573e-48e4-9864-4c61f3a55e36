import React from 'react';

function ConfirmGoalkeeperModal({ showGKConfirmModal, selectedNewGoalkeeper, confirmGoalkeeper, setShowGKConfirmModal }) {
  const handleConfirm = () => {
    confirmGoalkeeper(selectedNewGoalkeeper);
  };

  if (!showGKConfirmModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-white">Confirm Goalkeeper Change</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
          Are you sure you want to make <strong className="font-semibold">{selectedNewGoalkeeper}</strong> the new goalkeeper?
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setShowGKConfirmModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmGoalkeeperModal;