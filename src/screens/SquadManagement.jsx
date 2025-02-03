import React from 'react';
import SquadForm from '../components/SquadForm';
import SquadList from '../components/SquadList';
import useSquadManagement from '../hooks/useSquadManagement';

function SquadManagement() {
  const {
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
  } = useSquadManagement();

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-brand-500">Squad Management</h1>
      {editingSquad ? (
        <>
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
            className="mb-8 px-6 py-4 bg-gray-500 text-white text-lg rounded cursor-pointer hover:bg-gray-600 transition-all duration-300"
            onClick={cancelEdit}
          >
            Cancel Editing
          </button>
        </>
      ) : (
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
      )}
      <SquadList
        squads={squads}
        loading={loading}
        handleSelectSquad={handleSelectSquad}
        handleEditSquad={handleEditSquad}
      />
    </div>
  );
}

export default SquadManagement;