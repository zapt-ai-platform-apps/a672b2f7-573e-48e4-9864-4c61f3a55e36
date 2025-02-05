import React, { useState } from 'react';
import { useStateContext } from '../../../state';
import { useAvailablePlayers } from '../../../hooks/useAvailablePlayers';
import PlayerSelectionList from './PlayerSelectionList.jsx';
import { ModalContainer, ManualPlayerForm } from './components/ModalComponents.jsx';

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
        <ManualPlayerForm 
          newPlayerName={newPlayerName} 
          setNewPlayerName={setNewPlayerName} 
        />
      )}
      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-3 bg-brand-500 text-white text-lg rounded-md cursor-pointer hover:bg-brand-600 transition-all duration-300 ease-in-out-custom"
          onClick={mode === 'manual' ? handleManualAdd : () => setShowAddPlayerModal(false)}
        >
          {mode === 'manual' ? 'Confirm' : 'Close'}
        </button>
        <button
          className="px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom"
          onClick={() => setShowAddPlayerModal(false)}
        >
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
}

export default AddPlayerModal;