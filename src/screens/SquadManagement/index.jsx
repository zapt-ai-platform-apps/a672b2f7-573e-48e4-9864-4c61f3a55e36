import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSquadManagement from '../../features/SquadManagement/hooks/useSquadManagement.js';
import SquadListSection from '../../features/SquadManagement/components/SquadListSection.jsx';
import CreateSquadView from './CreateSquadView';
import EditSquadView from './EditSquadView';
import { useStateContext } from '../../state';

const SquadManagementScreen = () => {
  const { squads, loading, handleSelectSquad, handleEditSquad } = useSquadManagement();
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('options');

  const goToOptions = () => setCurrentView('options');

  const handleProceedToSetup = () => {
    navigate('/setup');
  };

  const handleEditSquadWrapper = (squad) => {
    setSelectedSquad(squad);
    handleEditSquad(squad);
    setCurrentView('edit');
  };

  if (currentView === 'options') {
    return (
      <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Select a Squad</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('create')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300"
            >
              Create Squad
            </button>
          </div>
        </div>
        <SquadListSection
          squads={squads}
          loading={loading}
          handleSelectSquad={handleSelectSquad}
          handleEditSquad={handleEditSquadWrapper}
          handleProceedToSetup={handleProceedToSetup}
        />
      </div>
    );
  } else if (currentView === 'create') {
    return <CreateSquadView goToOptions={goToOptions} setCurrentView={setCurrentView} />;
  } else if (currentView === 'edit') {
    return <EditSquadView goToOptions={goToOptions} />;
  }

  return null;
};

export default SquadManagementScreen;