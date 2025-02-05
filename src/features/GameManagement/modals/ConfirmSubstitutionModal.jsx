import React from 'react';

function ConfirmSubstitutionModal({ showModal, selectedSubOffPlayer, selectedSubOnPlayer, confirmSubstitution, cancelSubstitution }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-brand-500">Confirm Substitution</h2>
        <p className="mb-4 text-lg">
          Are you sure you want to substitute {selectedSubOffPlayer.name} with {selectedSubOnPlayer.name}?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-brand-500 text-white text-lg rounded-md cursor-pointer hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400"
            onClick={confirmSubstitution}
          >
            Yes
          </button>
          <button
            className="px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={cancelSubstitution}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSubstitutionModal;