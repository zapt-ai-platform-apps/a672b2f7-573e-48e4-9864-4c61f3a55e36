import React from 'react';

function PlayerSelectionList({ availablePlayers, onSelect, onSwitch }) {
  return (
    <div className="p-4">
      <ul className="mb-4">
        {availablePlayers.map((player, index) => (
          <li
            key={index}
            className="py-2 px-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            onClick={() => onSelect(player)}
          >
            {player}
          </li>
        ))}
      </ul>
      <button
        onClick={onSwitch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Switch to manual entry
      </button>
    </div>
  );
}

export default PlayerSelectionList;