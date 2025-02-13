import React from 'react';
import useSquadManagement from './hooks/useSquadManagement.js';
import SquadListSection from './components/SquadListSection.jsx';
import { useStateContext } from '../../state';

const SquadOptionsScreen = () => {
  const { squads, loading, handleSelectSquad, handleEditSquad } = useSquadManagement();
  const { selectedSquad } = useStateContext();

  const handleProceedToSetup = () => {
    // This function can be expanded to navigate to the game setup if a squad is selected.
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Squad Options</h1>
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

export default SquadOptionsScreen;