import React from 'react';
import SquadNameInput from './SquadNameInput';
import SquadPlayers from './SquadPlayers';

/**
 * SquadForm component renders the form for creating or editing a squad.
 *
 * @param {Object} props - Component props.
 * @param {string} props.squadName - The current squad name.
 * @param {Function} props.setSquadName - Function to update the squad name.
 * @param {string} props.newSquadPlayer - The current new squad player input.
 * @param {Function} props.setNewSquadPlayer - Function to update the new squad player input.
 * @param {Array} props.squadPlayersList - Array of squad players.
 * @param {Function} props.handleAddSquadPlayer - Function to add a new player to the squad.
 * @param {Function} props.handleDeleteSquadPlayer - Function to delete a player from the squad.
 * @param {Function} [props.onUpdateSquad] - Optional function to update an existing squad.
 * @param {Function} [props.handleCreateSquad] - Optional function to create a new squad.
 * @param {boolean} [props.editMode] - Flag indicating if the form is in edit mode.
 * @param {boolean} props.loading - Flag indicating if a submission is in progress.
 * @returns {JSX.Element} Rendered squad form component.
 */
function SquadForm({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList = [],
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  onUpdateSquad,
  handleCreateSquad,
  editMode,
  loading
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      return onUpdateSquad && onUpdateSquad();
    } else {
      return handleCreateSquad && handleCreateSquad();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SquadNameInput squadName={squadName} setSquadName={setSquadName} />
      <SquadPlayers
        newSquadPlayer={newSquadPlayer}
        setNewSquadPlayer={setNewSquadPlayer}
        squadPlayersList={squadPlayersList}
        handleAddSquadPlayer={handleAddSquadPlayer}
        handleDeleteSquadPlayer={handleDeleteSquadPlayer}
      />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : editMode ? "Update Squad" : "Create Squad"}
      </button>
    </form>
  );
}

export default SquadForm;