import React from 'react';
import useEditSquadForm from './useEditSquadForm';
import Loading from '../../components/Loading.jsx';
import SquadPlayersList from './components/SquadPlayersList.jsx';

function EditSquadForm() {
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
    handleBack
  } = useEditSquadForm();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Edit Squad</h1>
      <form onSubmit={handleUpdateSquad} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-lg mb-2">Squad Name</label>
          <input
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-4 border rounded box-border text-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Squad Players:</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name"
              className="flex-1 p-4 border rounded text-lg box-border"
            />
            <button
              type="button"
              onClick={handleAddPlayer}
              className="px-4 py-2 bg-blue-500 text-white rounded text-lg cursor-pointer"
            >
              Add
            </button>
          </div>
          <SquadPlayersList
            localPlayers={squadPlayersList}
            handleDeleteSquadPlayer={handleDeletePlayer}
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full py-4 bg-yellow-500 text-white text-lg rounded-md cursor-pointer hover:bg-yellow-600 transition-colors"
            disabled={loading}
          >
            {loading ? <Loading /> : 'Update Squad'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSquadForm;