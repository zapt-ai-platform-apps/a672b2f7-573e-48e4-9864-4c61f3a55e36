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
    setNewPlayerName(name);
    return addNewPlayer();
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