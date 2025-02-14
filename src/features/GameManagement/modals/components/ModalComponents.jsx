import React from 'react';
import ModalContainer from '../../../components/ModalContainer.jsx';

export function ModalContainerWrapper({ children }) {
  return <ModalContainer>{children}</ModalContainer>;
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