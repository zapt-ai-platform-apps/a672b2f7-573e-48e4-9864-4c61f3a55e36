import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSquadManagement from '../../features/SquadManagement/hooks/useSquadManagement';
import CreateSquadForm from '../../features/SquadManagement/CreateSquadForm';
import EditSquadForm from '../../features/SquadManagement/EditSquadForm';
import { useStateContext } from '../../hooks/useStateContext';
import SquadListView from './SquadListView';

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
    <div className="min-h-screen p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Squad Management</h1>
      
      {formMode === 'list' && (
        <SquadListView
          squads={squads}
          loading={loading}
          selectedSquad={selectedSquad}
          handleSelectSquad={handleSelectSquad}
          handleEditSquad={handleEditSquadClick}
          handleProceedToSetup={handleProceedToSetup}
          onAddNewSquad={handleAddNewSquad}
        />
      )}
      
      {formMode === 'create' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <CreateSquadForm onCancel={handleCancelForm} />
        </div>
      )}
      
      {formMode === 'edit' && squadToEdit && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <EditSquadForm onCancel={handleCancelForm} />
        </div>
      )}
    </div>
  );
}