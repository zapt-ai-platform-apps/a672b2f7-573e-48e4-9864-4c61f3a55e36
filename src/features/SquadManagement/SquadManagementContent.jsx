import React from 'react';
import SquadFormSection from './components/SquadFormSection.jsx';
import SquadListSection from './components/SquadListSection.jsx';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state.jsx';

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
  const navigate = useNavigate();
  const { selectedSquad } = useStateContext();

  const handleProceedToSetup = () => {
    if (selectedSquad) {
      navigate('/setup');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-brand-500">Squad Management</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <SquadFormSection
          squadName={squadName}
          setSquadName={setSquadName}
          newSquadPlayer={newSquadPlayer}
          setNewSquadPlayer={setNewSquadPlayer}
          squadPlayersList={squadPlayersList}
          handleAddSquadPlayer={handleAddSquadPlayer}
          handleDeleteSquadPlayer={handleDeleteSquadPlayer}
          handleCreateSquad={handleCreateSquad}
          handleUpdateSquad={handleUpdateSquad}
          editingSquad={editingSquad}
          cancelEdit={cancelEdit}
          loading={loading}
        />
        <SquadListSection
          squads={squads}
          loading={loading}
          handleSelectSquad={handleSelectSquad}
          handleEditSquad={handleEditSquad}
          selectedSquad={selectedSquad}
          handleProceedToSetup={handleProceedToSetup}
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