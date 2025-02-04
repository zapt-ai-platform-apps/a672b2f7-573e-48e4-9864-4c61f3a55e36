import React from 'react';

function SquadForm({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList,
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  onUpdateSquad,
  handleCreateSquad,
  editMode,
  loading
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      if (onUpdateSquad) onUpdateSquad();
    } else {
      if (handleCreateSquad) handleCreateSquad();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Squad Name</label>
        <input
          type="text"
          value={squadName}
          onChange={(e) => setSquadName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Add Squad Player</label>
        <div className="flex">
          <input
            type="text"
            value={newSquadPlayer}
            onChange={(e) => setNewSquadPlayer(e.target.value)}
            className="flex-1 p-2 border rounded-l"
          />
          <button
            type="button"
            onClick={handleAddSquadPlayer}
            className="px-4 bg-blue-500 text-white rounded-r"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-4">
        <ul>
          {squadPlayersList.map((player, index) => (
            <li key={index} className="flex justify-between items-center border-b py-1">
              <span>{player}</span>
              <button
                type="button"
                onClick={() => handleDeleteSquadPlayer(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : editMode ? "Update Squad" : "Create Squad"}
      </button>
    </form>
  );
}

export default SquadForm;