import React from 'react';

function SquadForm(props) {
  const {
    squadName,
    setSquadName,
    newSquadPlayer,
    setNewSquadPlayer,
    squadPlayersList,
    handleAddSquadPlayer,
    handleDeleteSquadPlayer,
    handleCreateSquad,
    onUpdateSquad,
    editMode,
    loading
  } = props;

  return (
    <div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Squad Name</label>
        <input
          type="text"
          value={squadName}
          onChange={(e) => setSquadName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Add Squad Player</label>
        <div className="flex">
          <input
            type="text"
            value={newSquadPlayer}
            onChange={(e) => setNewSquadPlayer(e.target.value)}
            className="w-full p-2 border rounded-l"
          />
          <button
            onClick={handleAddSquadPlayer}
            className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            disabled={loading}
          >
            Add Player
          </button>
        </div>
      </div>
      {squadPlayersList.length > 0 && (
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Squad Players</label>
          <ul>
            {squadPlayersList.map((player, index) => (
              <li key={index} className="flex justify-between items-center border-b py-1">
                <span>{player}</span>
                <button
                  onClick={() => handleDeleteSquadPlayer(player)}
                  className="text-red-500 hover:text-red-700"
                  disabled={loading}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        {editMode ? (
          <button
            onClick={onUpdateSquad}
            className="px-6 py-4 bg-green-500 text-white text-lg rounded hover:bg-green-600 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            Update Squad
          </button>
        ) : (
          <button
            onClick={handleCreateSquad}
            className="px-6 py-4 bg-green-500 text-white text-lg rounded hover:bg-green-600 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            Create Squad
          </button>
        )}
      </div>
    </div>
  );
}

export default SquadForm;