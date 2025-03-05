import React from 'react';
import AddPlayerModal from './AddPlayerModal';

// This adapter component bridges the old interface used in GameManagement
// with the new interface of the AddPlayerModal component
function AddPlayerModalAdapter({
  showAddPlayerModal,
  setShowAddPlayerModal,
  newPlayerName,
  setNewPlayerName,
  addNewPlayer
}) {
  const handleAddPlayer = (name) => {
    // First update the name in the parent state
    setNewPlayerName(name);
    
    // We need to create an improved version of addNewPlayer that uses the name directly
    // Instead of relying on state which might not have updated yet
    if (name.trim() !== '') {
      // Create a new player directly using the provided name
      const playerToAdd = {
        name: name.trim(),
        playIntervals: [],
        isOnField: false,
        isGoalkeeper: false
      };
      
      // We can now call the parent component's setPlayerData directly with this new player
      // This ensures the player is added immediately without waiting for state updates
      return addNewPlayer(playerToAdd);
    }
    return false;
  };

  return (
    <AddPlayerModal
      isOpen={showAddPlayerModal}
      onClose={() => setShowAddPlayerModal(false)}
      onAddPlayer={handleAddPlayer}
    />
  );
}

export default AddPlayerModalAdapter;