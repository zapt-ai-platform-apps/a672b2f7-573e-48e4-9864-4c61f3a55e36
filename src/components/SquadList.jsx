import React from 'react';

function SquadList({ squads, loading, handleSelectSquad, handleEditSquad }) {
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Squads</h2>
      {squads.length === 0 ? (
        <div>No squads available.</div>
      ) : (
        <ul>
          {squads.map((squad) => (
            <li key={squad.id} className="mb-4 border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{squad.name}</h3>
                  {squad.players && squad.players.length > 0 && (
                    <ul className="mt-2">
                      {squad.players.map((player, idx) => (
                        <li key={idx} className="text-sm text-gray-700">{player}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleSelectSquad(squad)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleEditSquad(squad)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SquadList;