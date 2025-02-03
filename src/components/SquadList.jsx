import React from 'react';

function SquadList({ squads, loading, handleSelectSquad, handleEditSquad }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Your Squads</h2>
      {loading ? (
        <p>Loading squads...</p>
      ) : squads.length > 0 ? (
        <ul className="space-y-4">
          {squads.map((squad) => (
            <li key={squad.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded">
              <h3 className="text-2xl font-semibold">{squad.name}</h3>
              <p className="mt-2">Players: {Array.isArray(squad.players) ? squad.players.join(', ') : squad.players}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Created at: {new Date(squad.created_at || squad.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-6 py-3 bg-blue-500 text-white text-lg rounded cursor-pointer hover:bg-blue-600 transition-all duration-300"
                  onClick={() => handleSelectSquad(squad)}
                >
                  Select Squad
                </button>
                <button
                  className="px-6 py-3 bg-yellow-500 text-white text-lg rounded cursor-pointer hover:bg-yellow-600 transition-all duration-300"
                  onClick={() => handleEditSquad(squad)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No squads found. Create one above!</p>
      )}
    </div>
  );
}

export default SquadList;