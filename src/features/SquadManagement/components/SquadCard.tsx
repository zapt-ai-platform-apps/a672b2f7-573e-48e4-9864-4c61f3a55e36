import React from 'react';
import type { Squad } from '../../../types/GameTypes'; // Updated import to correct location

interface SquadCardProps {
  squad: Squad;
  isSelected: boolean;
  onSelect: (squad: Squad) => void;
  onEdit: (squad: Squad) => void;
}

export default function SquadCard({ squad, isSelected, onSelect, onEdit }: SquadCardProps): JSX.Element {
  const playerCount = squad.players?.length || 0;

  return (
    <div
      className={`p-4 rounded-xl shadow-lg transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-600/80 to-indigo-700/80 text-white' 
          : 'bg-white/10 text-white/90 backdrop-blur-sm hover:bg-white/20'
      }`}
      onClick={() => onSelect(squad)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{squad.name}</h3>
          <p className="text-sm opacity-80">{playerCount} players</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(squad);
            }}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors cursor-pointer"
          >
            Edit
          </button>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-white text-blue-700' : 'border-2 border-white/50'
          }`}>
            {isSelected && <span>✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
}