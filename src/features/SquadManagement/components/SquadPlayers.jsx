import React from 'react';

/**
 * SquadPlayers component displays and manages the list of squad players.
 * @param {object} props - Component props.
 * @param {string} props.newSquadPlayer - New squad player's input value.
 * @param {function} props.setNewSquadPlayer - Function to update the squad player's input.
 * @param {Array<Object|string>} props.squadPlayersList - List of squad players. Each player can be a string or an object with keys {id, name, isStartingPlayer}.
 * @param {function} props.handleAddSquadPlayer - Function to handle adding a new squad player.
 * @param {function} props.handleDeleteSquadPlayer - Function to handle deleting a squad player.
 * @returns {JSX.Element} SquadPlayers component.
 */
function SquadPlayers({
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList = [],
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
}) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Add Squad Player</label>
        <div className="flex">
          <input
            type="text"
            value={newSquadPlayer}
            onChange={(e) => setNewSquadPlayer(e.target.value)}
            className="flex-1 p-2 border rounded-l box-border"
          />
          <button
            type="button"
            onClick={handleAddSquadPlayer}
            className="px-4 bg-blue-500 text-white rounded-r cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-4">
        <ul>
          {squadPlayersList.map((player, index) => (
            <li key={index} className="flex items-center justify-between py-1 border-b last:border-0">
              <span className="text-lg">
                {typeof player === 'object' ? player.name : player}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteSquadPlayer(index)}
                className="text-red-500 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SquadPlayers;