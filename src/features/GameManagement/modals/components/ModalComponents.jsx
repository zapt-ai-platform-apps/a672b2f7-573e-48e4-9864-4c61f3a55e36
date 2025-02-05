import React from 'react';

export function ModalContainer({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
}

export function ManualPlayerForm({ newPlayerName, setNewPlayerName }) {
  return (
    <>
      <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
        Enter the player's name:
      </p>
      <input
        type="text"
        placeholder="Player Name"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-400 mb-4 box-border text-lg"
      />
    </>
  );
}