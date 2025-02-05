import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SquadManagementContent from './SquadManagementContent';
import useSquadManagement from '../hooks/useSquadManagement';
import { useStateContext } from '../state';

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

  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSquad) {
      navigate('/setup');
    }
  }, [selectedSquad, navigate]);

  return (
    <SquadManagementContent
      squadName={squadName}
      setSquadName={setSquadName}
      newSquadPlayer={newSquadPlayer}
      setNewSquadPlayer={setNewSquadPlayer}
      squadPlayersList={squadPlayersList}
      squads={squads}
      loading={loading}
      editingSquad={editingSquad}
      handleAddSquadPlayer={handleAddSquadPlayer}
      handleDeleteSquadPlayer={handleDeleteSquadPlayer}
      handleCreateSquad={handleCreateSquad}
      handleUpdateSquad={handleUpdateSquad}
      handleSelectSquad={handleSelectSquad}
      handleEditSquad={handleEditSquad}
      cancelEdit={cancelEdit}
    />
  );
}

export default SquadManagement;