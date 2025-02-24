import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSquadManagement from '../../features/SquadManagement/hooks/useSquadManagement';
import SquadListSection from '../../features/SquadManagement/components/SquadListSection';
import CreateSquadForm from '../../features/SquadManagement/CreateSquadForm';
import EditSquadForm from '../../features/SquadManagement/EditSquadForm';
import { useStateContext } from '../../hooks/useStateContext';

type FormMode = 'list' | 'create' | 'edit';

export default function SquadManagementScreen(): JSX.Element {
  const { squads, loading, handleSelectSquad, handleEditSquad } = useSquadManagement();
  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();
  
  const [formMode, setFormMode] = useState<FormMode>('list');
  const [squadToEdit, setSquadToEdit] = useState<any>(null);

  const handleProceedToSetup = () => {
    navigate('/setup/participants');
  };

  const handleAddNewSquad = () => {
    setFormMode('create');
  };

  const handleEditSquadClick = (squad: any) => {
    setSquadToEdit(squad);
    setFormMode('edit');
    handleEditSquad(squad);
  };

  const handleCancelForm = () => {
    setFormMode('list');
    setSquadToEdit(null);
  };

  return (
    <div className="min-h-screen p-6 md:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Squad Management</h1>
      
      {formMode === 'list' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Squad Options</h2>
            <button
              onClick={handleAddNewSquad}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-200 cursor-pointer flex items-center"
            >
              <span className="mr-2">+</span> Add New Squad
            </button>
          </div>
          <SquadListSection
            squads={squads}
            loading={loading}
            handleSelectSquad={handleSelectSquad}
            handleEditSquad={handleEditSquadClick}
            selectedSquad={selectedSquad}
            handleProceedToSetup={handleProceedToSetup}
            onAddNewSquad={handleAddNewSquad}
          />
        </>
      )}
      
      {formMode === 'create' && (
        <CreateSquadForm onCancel={handleCancelForm} />
      )}
      
      {formMode === 'edit' && squadToEdit && (
        <EditSquadForm onCancel={handleCancelForm} />
      )}
    </div>
  );
}