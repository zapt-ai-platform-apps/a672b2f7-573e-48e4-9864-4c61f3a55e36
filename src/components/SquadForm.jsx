import React from 'react';

function SquadForm({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList,
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  handleCreateSquad,
  loading
}) {
  return (
    <form onSubmit={handleCreateSquad} className="mb-8 space-y-6">
      <div>
        <label className="block text-lg mb-2">Squad Name:</label>
        <input
          type="text"
          value={squadName}
          onChange={(e) => setSquadName(e.target.value)}
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded box-border text-lg"
          placeholder="Enter squad name"
        />
      </div>
      <div>
        <label className="block text-lg mb-2">Add New Player:</label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newSquadPlayer}
            onChange={(e) => setNewSquadPlayer(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded box-border text-lg"
            placeholder="Player Name"
          />
          <button
            type="button"
            onClick={handleAddSquadPlayer}
            className="px-6 py-4 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Add
          </button>
        </div>
      </div>
      {squadPlayersList.length > 0 && (
        <div>
          <label className="block text-lg mb-2">Players List:</label>
          <ul className="space-y-2">
            {squadPlayersList.map((player, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded"
              >
                <span className="text-lg">{player}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteSquadPlayer(index)}
                  className="px-4 py-2 bg-red-500 text-white text-lg rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="submit"
        className="mt-6 w-full px-8 py-4 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Squad'}
      </button>
    </form>
  );
}

export default SquadForm;