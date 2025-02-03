import React from 'react';

function PlayerSelectionList({ availablePlayers, onSelect, onSwitch }) {
  return (
    <>
      <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
        Select a player from your squad:
      </p>
      <ul className="max-h-60 overflow-y-auto mb-4">
        {availablePlayers.map((name, index) => (
          <li
            key={index}
            className="p-4 mb-2 bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
            onClick={() => onSelect(name)}
          >
            {name}
          </li>
        ))}
      </ul>
      <button
        className="w-full px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom sm:mt-0 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
        onClick={onSwitch}
      >
        Not in Squad? Enter Name Manually
      </button>
    </>
  );
}

export default PlayerSelectionList;