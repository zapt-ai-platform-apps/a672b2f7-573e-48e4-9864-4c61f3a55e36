import React from 'react';

function ConfirmAdjustPlayersModal({ showConfirmModal, setShowConfirmModal, selectedPlayer, adjustType, confirmAdjustment }) {
  const actionText = adjustType === 'increase' ? 'add' : 'remove';

  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white">Confirm Action</h2>
        <p className="mb-4 text-base md:text-lg text-gray-700 dark:text-gray-200">
          Are you sure you want to {actionText} <strong>{selectedPlayer.name}</strong> {adjustType === 'increase' ? 'to' : 'from'} the field?
        </p>
        <div className="flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-4">
          <button
            className="px-4 py-2 md:px-6 md:py-3 bg-brand-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400 order-2 md:order-1"
            onClick={confirmAdjustment}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 md:px-6 md:py-3 bg-gray-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400 order-1 md:order-2"
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