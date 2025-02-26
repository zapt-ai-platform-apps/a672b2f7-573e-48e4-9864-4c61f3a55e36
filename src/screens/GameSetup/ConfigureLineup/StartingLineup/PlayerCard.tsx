import React from 'react';
import { Player } from '../../../../types/GameTypes';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onToggle: () => void;
}

export default function PlayerCard({ player, isSelected, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div 
      className={`relative p-4 rounded-lg shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 border-2 border-blue-300 scale-105' 
          : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {player.name}
          </h3>
          {player.position && (
            <span className="text-sm text-white/70">
              Position: {player.position}
            </span>
          )}
        </div>
        
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
          isSelected ? 'bg-blue-300' : 'bg-white/40'
        }`}>
          {isSelected && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
          <span className="flex h-6 w-6 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 items-center justify-center text-white text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </span>
        </div>
      )}
    </div>
  );
}