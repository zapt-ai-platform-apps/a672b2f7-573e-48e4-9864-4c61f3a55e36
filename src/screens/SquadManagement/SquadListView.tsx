import React from 'react';
import SquadListSection from '../../features/SquadManagement/components/SquadListSection';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface SquadListViewProps {
  squads: any[];
  loading: boolean;
  selectedSquad: any;
  handleSelectSquad: (squad: any) => void;
  handleEditSquad: (squad: any) => void;
  handleProceedToSetup: () => void;
  onAddNewSquad: () => void;
}

export default function SquadListView({
  squads,
  loading,
  selectedSquad,
  handleSelectSquad,
  handleEditSquad,
  handleProceedToSetup,
  onAddNewSquad,
}: SquadListViewProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Manage Your Squads</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddNewSquad}
          className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-md transition-all duration-200 cursor-pointer flex items-center"
        >
          <FiPlus className="mr-2" /> Create New Squad
        </motion.button>
      </div>
      
      <div className="bg-gradient-to-br from-black/30 to-purple-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10">
        <SquadListSection
          squads={squads}
          loading={loading}
          handleSelectSquad={handleSelectSquad}
          handleEditSquad={handleEditSquad}
          selectedSquad={selectedSquad}
          handleProceedToSetup={handleProceedToSetup}
          onAddNewSquad={onAddNewSquad}
        />
      </div>
    </motion.div>
  );
}