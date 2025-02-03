import React, { useState } from 'react';
import { useStateContext } from '../state';
import { useAvailablePlayers } from '../hooks/useAvailablePlayers';
import PlayerSelectionList from './PlayerSelectionList';
import ModalContainer from './ModalContainer';

function AddPlayerModal({
  showAddPlayerModal,
  setShowAddPlayerModal,
  newPlayerName,
  setNewPlayerName,
  addNewPlayer,
  currentGamePlayers
}) {
  const { selectedSquad } = useStateContext();
  const [mode, setMode] = useState('manual');
  const availablePlayers = useAvailablePlayers(selectedSquad, currentGamePlayers);

  const handleSelectPlayer = (playerName) => {
    addNewPlayer(playerName);
    setShowAddPlayerModal(false);
  };

  const handleManualAdd = () => {
    if (newPlayerName.trim() !== '') {
      addNewPlayer(newPlayerName.trim());
      setNewPlayerName('');
      setShowAddPlayerModal(false);
    }
  };

  const switchToManual = () => {
    setMode('manual');
  };

  if (!showAddPlayerModal) return null;

  return (
    <ModalContainer>
      <h2 className="text-2xl font-bold mb-4 text-brand-500">Add New Player</h2>
      {mode === 'select' && availablePlayers.length > 0 ? (
        <PlayerSelectionList
          availablePlayers={availablePlayers}
          onSelect={handleSelectPlayer}
          onSwitch={switchToManual}
        />
      ) : (
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
      )}
      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-3 bg-brand-500 text-white text-lg rounded-md cursor-pointer hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400"
          onClick={mode === 'manual' ? handleManualAdd : () => setShowAddPlayerModal(false)}
        >
          {mode === 'manual' ? 'Confirm' : 'Close'}
        </button>
        <button
          className="px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setShowAddPlayerModal(false)}
        >
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
}

export default AddPlayerModal;