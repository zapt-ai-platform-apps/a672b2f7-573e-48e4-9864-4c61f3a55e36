import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSquadManagement from '../../features/SquadManagement/hooks/useSquadManagement.js';
import SquadListSection from '../../features/SquadManagement/components/SquadListSection.jsx';
import { useStateContext } from '../../state.jsx';

const SquadSelectionScreen = () => {
  const { squads, loading, handleSelectSquad, handleEditSquad } = useSquadManagement();
  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();

  const handleProceedToSetup = () => {
    if (selectedSquad) {
      navigate('/setup');
    } else {
      alert('Please select a squad to proceed.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Select a Squad</h1>
      <SquadListSection
        squads={squads}
        loading={loading}
        handleSelectSquad={handleSelectSquad}
        handleEditSquad={handleEditSquad}
        selectedSquad={selectedSquad}
        handleProceedToSetup={handleProceedToSetup}
      />
    </div>
  );
};

export { SquadSelectionScreen };