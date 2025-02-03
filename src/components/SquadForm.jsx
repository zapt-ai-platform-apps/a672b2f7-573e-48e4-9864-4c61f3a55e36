import React, { useState, useEffect } from 'react';
import SquadInputs from './SquadInputs';
import SquadPlayersList from './SquadPlayersList';

function SquadForm({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList,
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  handleCreateSquad,
  onUpdateSquad,
  editMode = false,
  loading
}) {
  const [localName, setLocalName] = useState(squadName);
  const [localPlayers, setLocalPlayers] = useState(squadPlayersList);

  useEffect(() => {
    setLocalName(squadName);
  }, [squadName]);

  useEffect(() => {
    setLocalPlayers(squadPlayersList);
  }, [squadPlayersList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode && onUpdateSquad) {
      onUpdateSquad(localName, localPlayers);
    } else {
      handleCreateSquad(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-6">
      <SquadInputs
        localName={localName}
        setLocalName={setLocalName}
        setSquadName={setSquadName}
        newSquadPlayer={newSquadPlayer}
        setNewSquadPlayer={setNewSquadPlayer}
        handleAddSquadPlayer={handleAddSquadPlayer}
      />
      {localPlayers.length > 0 && (
        <SquadPlayersList
          localPlayers={localPlayers}
          handleDeleteSquadPlayer={handleDeleteSquadPlayer}
        />
      )}
      <button
        type="submit"
        className="mt-6 w-full px-8 py-4 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
        disabled={loading}
      >
        {loading
          ? editMode
            ? 'Updating...'
            : 'Creating...'
          : editMode
          ? 'Update Squad'
          : 'Create Squad'}
      </button>
    </form>
  );
}

export default SquadForm;