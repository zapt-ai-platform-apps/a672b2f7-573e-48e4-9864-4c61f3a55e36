import React from 'react';
import useEditSquadForm from '../../features/SquadManagement/hooks/useEditSquadForm.js';

const EditSquadView = ({ goToOptions }) => {
  const {
    squadName,
    setSquadName,
    squadPlayersList,
    newPlayerName,
    setNewPlayerName,
    loading,
    error,
    handleAddPlayer,
    handleDeletePlayer,
    handleUpdateSquad,
    handleBack,
  } = useEditSquadForm();
  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 text-gray-800">
      <button
        onClick={goToOptions}
        className="mb-4 px-4 py-2 bg-gray-300 rounded cursor-pointer"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Squad</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdateSquad} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-lg mb-2 text-gray-800">
            Squad Name
          </label>
          <input
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-2 border rounded box-border text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2 text-gray-800">Players</label>
          <ul>
            {squadPlayersList.map((player, idx) => (
              <li key={idx} className="flex justify-between items-center mb-2">
                <span className="text-gray-800">{player}</span>
                <button
                  type="button"
                  onClick={() => handleDeletePlayer(idx)}
                  className="text-red-500 cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            className="w-full p-2 border rounded mt-2 box-border text-gray-800"
            placeholder="Add player..."
          />
          <button
            type="button"
            onClick={handleAddPlayer}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Add Player
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Updating...' : 'Update Squad'}
        </button>
      </form>
    </div>
  );
};

export default EditSquadView;