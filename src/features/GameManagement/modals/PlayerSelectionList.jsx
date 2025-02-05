import React from 'react';

function PlayerSelectionList({ availablePlayers, onSelect, onSwitch }) {
  return (
    <div>
      <ul className="mb-4">
        {availablePlayers.map((player) => (
          <li key={player} className="mb-2">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              onClick={() => onSelect(player)}
            >
              {player}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        onClick={onSwitch}
      >
        Switch to Manual Entry
      </button>
    </div>
  );
}

export default PlayerSelectionList;