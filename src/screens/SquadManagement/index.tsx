import React from 'react';
import useSquadManagement from '../../features/SquadManagement/hooks/useSquadManagement';
import SquadListSection from '../../features/SquadManagement/components/SquadListSection';
import { useStateContext } from '../../state';

export default function SquadManagementScreen(): JSX.Element {
  const { squads, loading, handleSelectSquad, handleEditSquad } = useSquadManagement();
  const { selectedSquad } = useStateContext();

  const handleProceedToSetup = () => {
    // Extend functionality to navigate to game setup
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
}