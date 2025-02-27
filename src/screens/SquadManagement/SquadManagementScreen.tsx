import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSquadManagement from '../../features/SquadManagement/hooks/useSquadManagement';
import CreateSquadForm from '../../features/SquadManagement/CreateSquadForm';
import EditSquadForm from '../../features/SquadManagement/EditSquadForm';
import { useStateContext } from '../../hooks/useStateContext';
import SquadListView from './SquadListView';
import { motion, AnimatePresence } from 'framer-motion';

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

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Squad Management
      </motion.h1>
      
      <AnimatePresence mode="wait">
        {formMode === 'list' && (
          <motion.div
            key="list-view"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SquadListView
              squads={squads}
              loading={loading}
              selectedSquad={selectedSquad}
              handleSelectSquad={handleSelectSquad}
              handleEditSquad={handleEditSquadClick}
              handleProceedToSetup={handleProceedToSetup}
              onAddNewSquad={handleAddNewSquad}
            />
          </motion.div>
        )}
        
        {formMode === 'create' && (
          <motion.div
            key="create-form"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gradient-to-br from-black/30 to-purple-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10"
          >
            <CreateSquadForm onCancel={handleCancelForm} />
          </motion.div>
        )}
        
        {formMode === 'edit' && squadToEdit && (
          <motion.div
            key="edit-form"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gradient-to-br from-black/30 to-purple-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10"
          >
            <EditSquadForm onCancel={handleCancelForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}