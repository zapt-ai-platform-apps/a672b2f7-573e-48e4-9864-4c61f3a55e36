import React from 'react';
import type { Player } from '../../../context/StateContext';

interface ExtendedPlayer extends Player {
  isInMatchSquad?: boolean;
}

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({
  player,
  isSelected,
  onToggle
}: ParticipantItemProps): JSX.Element {
  const playerName = typeof player.name === 'object'
    ? ((player.name as { name: string }).name || JSON.stringify(player.name))
    : player.name;

  return (
    <div
      onClick={onToggle}
      className={`p-4 rounded-xl shadow-lg transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-600/80 to-indigo-700/80 text-white transform scale-105' 
          : 'bg-white/10 text-white/90 backdrop-blur-sm hover:bg-white/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-medium">{playerName}</div>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-white text-blue-700' : 'border-2 border-white/50'
        }`}>
          {isSelected && <span>✓</span>}
        </div>
      </div>
    </div>
  );
}