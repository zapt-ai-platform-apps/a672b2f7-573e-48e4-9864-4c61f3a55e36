import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSquadManagement from '../../features/SquadManagement/hooks/useSquadManagement';
import SquadListSection from '../../features/SquadManagement/components/SquadListSection';
import { useStateContext } from '../../state';

export default function SquadManagementScreen(): JSX.Element {
  const { squads, loading, handleSelectSquad, handleEditSquad } = useSquadManagement();
  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();

  const handleProceedToSetup = () => {
    navigate('/setup/participants');
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