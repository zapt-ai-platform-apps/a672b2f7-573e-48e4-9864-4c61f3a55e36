import React from 'react';

function AddPlayerForm({ playerName, setPlayerName, handleAddPlayer }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlayer();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow mb-8">
      <h2 className="text-2xl font-bold mb-4 text-brand-500">Add Players</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <input
          type="text"
          className="sm:flex-1 p-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:rounded-l-md rounded-t-md sm:rounded-tr-none sm:rounded-bl-md focus:outline-none focus:ring-2 focus:ring-brand-400 box-border text-lg"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          type="submit"
          className="sm:px-8 px-4 py-4 bg-brand-500 text-white text-lg sm:rounded-r-md rounded-b-md sm:rounded-bl-none cursor-pointer hover:bg-brand-600 hover:scale-105 transition-all duration-300 ease-in-out-custom sm:mt-0 mt-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddPlayerForm;