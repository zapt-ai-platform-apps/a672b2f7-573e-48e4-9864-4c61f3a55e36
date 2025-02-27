import React from 'react';
import { Squad } from '../../../types/GameTypes';
import { FiEdit2, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface SquadCardProps {
  squad: Squad;
  isSelected: boolean;
  onSelect: (squad: Squad) => void;
  onEdit: (squad: Squad) => void;
}

export default function SquadCard({ squad, isSelected, onSelect, onEdit }: SquadCardProps): JSX.Element {
  const playerCount = squad.players?.length || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl shadow-lg transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-2 border-white' 
          : 'bg-white/10 text-white/90 backdrop-blur-sm hover:bg-white/20 border-2 border-transparent'
        }
      `}
      onClick={() => onSelect(squad)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
          <FiCheckCircle className="text-blue-600 w-5 h-5" />
        </div>
      )}

      <div className="p-6">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-1">{squad.name}</h3>
          
          <div className="mt-2 flex items-center space-x-2">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${isSelected ? 'bg-blue-500/30' : 'bg-white/20'}
            `}>
              <span className="font-semibold">{playerCount}</span>
            </div>
            <p className="opacity-80">
              {playerCount === 1 ? 'player' : 'players'}
            </p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(squad);
            }}
            className="mt-4 flex items-center self-start px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
          >
            <FiEdit2 className="mr-1 w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/5"></div>
      <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/5"></div>
    </motion.div>
  );
}