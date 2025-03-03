import React from 'react';

function ScorerSelection({ players, scorerName, setScorerName, handleConfirm, handleCancel }) {
  return (
    <div className="flex-grow overflow-y-auto text-gray-800 dark:text-white">
      <p className="mt-4 mb-2 text-lg">Who scored?</p>
      <ul>
        {[...players.map((player) => player.name), 'Own Goal'].map((name, index) => (
          <li
            key={index}
            className={`p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-2xl ${
              scorerName === name ? 'bg-blue-200 dark:bg-blue-600' : ''
            }`}
            onClick={() => setScorerName(name)}
          >
            {name}
          </li>
        ))}
      </ul>
      {scorerName ? (
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="mt-4 w-full py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default ScorerSelection;