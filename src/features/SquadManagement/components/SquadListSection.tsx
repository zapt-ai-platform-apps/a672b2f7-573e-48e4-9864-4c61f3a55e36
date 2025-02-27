import React from 'react';
import SquadList from './SquadList';
import type { Squad } from '../../../types/GameTypes';
import { FiUsers, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface SquadListSectionProps {
  squads: Squad[] | null;
  loading: boolean;
  handleSelectSquad: (squad: Squad) => void;
  handleEditSquad: (squad: Squad) => void;
  selectedSquad: Squad | null;
  handleProceedToSetup: () => void;
  onAddNewSquad: () => void;
}

export default function SquadListSection({
  squads,
  loading,
  handleSelectSquad,
  handleEditSquad,
  selectedSquad,
  handleProceedToSetup,
  onAddNewSquad
}: SquadListSectionProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
          <FiUsers className="mr-2" /> Your Squads
        </h3>
        <p className="text-white/80">Select a squad to start a game or create a new one.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          {squads && squads.length > 0 ? (
            <>
              <SquadList
                squads={squads}
                onSelect={handleSelectSquad}
                onEdit={handleEditSquad}
                selectedSquad={selectedSquad}
              />
              
              {selectedSquad && (
                <motion.div 
                  className="pt-6 border-t border-white/20 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={handleProceedToSetup}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-colors shadow-lg cursor-pointer flex items-center justify-center"
                  >
                    <span className="mr-2">Continue with {selectedSquad.name}</span>
                    <FiArrowRight />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div 
              className="text-center py-16 bg-white/5 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mx-auto w-16 h-16 mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <FiUsers className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-white/80 mb-6 text-lg">You don't have any squads yet.</p>
              <button
                onClick={onAddNewSquad}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-colors shadow-md cursor-pointer"
              >
                Create Your First Squad
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}