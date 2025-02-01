import React from 'react';

function ConfirmAdjustPlayersModal({ showConfirmModal, setShowConfirmModal, selectedPlayer, adjustType, confirmAdjustment }) {
  const actionText = adjustType === 'increase' ? 'add' : 'remove';

  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Confirm Action</h2>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
          Are you sure you want to {actionText} <strong>{selectedPlayer.name}</strong> {adjustType === 'increase' ? 'to' : 'from'} the field?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-brand-500 text-white text-lg rounded-md cursor-pointer hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400"
            onClick={confirmAdjustment}
          >
            Yes
          </button>
          <button
            className="px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setShowConfirmModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAdjustPlayersModal;