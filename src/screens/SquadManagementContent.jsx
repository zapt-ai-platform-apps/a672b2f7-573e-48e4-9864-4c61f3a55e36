import React from 'react';
import SquadForm from '../components/SquadForm';
import SquadList from '../components/SquadList';

function SquadManagementContent({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList,
  squads,
  loading,
  editingSquad,
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  handleCreateSquad,
  handleUpdateSquad,
  handleSelectSquad,
  handleEditSquad,
  cancelEdit
}) {
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-brand-500">Squad Management</h1>
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <SquadList
          squads={squads}
          loading={loading}
          handleSelectSquad={handleSelectSquad}
          handleEditSquad={handleEditSquad}
        />
      </div>
      <div className="fixed bottom-4 right-4 text-sm text-gray-600 dark:text-gray-400">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="underline">
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}

export default SquadManagementContent;