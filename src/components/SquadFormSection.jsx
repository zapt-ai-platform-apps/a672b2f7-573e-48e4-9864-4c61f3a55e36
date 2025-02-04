import React from 'react';
import SquadForm from './SquadForm';

function SquadFormSection({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList,
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  handleCreateSquad,
  handleUpdateSquad,
  editingSquad,
  cancelEdit,
  loading
}) {
  return (
    <div>
      {editingSquad ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Edit Squad</h2>
          <SquadForm
            squadName={squadName}
            setSquadName={setSquadName}
            newSquadPlayer={newSquadPlayer}
            setNewSquadPlayer={setNewSquadPlayer}
            squadPlayersList={squadPlayersList}
            handleAddSquadPlayer={handleAddSquadPlayer}
            handleDeleteSquadPlayer={handleDeleteSquadPlayer}
            onUpdateSquad={handleUpdateSquad}
            editMode={true}
            loading={loading}
          />
          <button
            className="mt-4 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-lg rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={cancelEdit}
          >
            Cancel Editing
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Create New Squad</h2>
          <SquadForm
            squadName={squadName}
            setSquadName={setSquadName}
            newSquadPlayer={newSquadPlayer}
            setNewSquadPlayer={setNewSquadPlayer}
            squadPlayersList={squadPlayersList}
            handleAddSquadPlayer={handleAddSquadPlayer}
            handleDeleteSquadPlayer={handleDeleteSquadPlayer}
            handleCreateSquad={handleCreateSquad}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}

export default SquadFormSection;