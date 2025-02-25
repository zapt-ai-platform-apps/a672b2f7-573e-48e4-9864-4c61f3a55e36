import React from 'react';
import { Player } from '../../../types/GameTypes';

export type ExtendedPlayer = Player;

type ParticipantItemProps = {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
};

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-5 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected 
          ? 'bg-gradient-to-r from-green-500/80 to-emerald-600/80 border-2 border-green-400/50 shadow-lg' 
          : 'bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-white">
            {player.name}
          </h2>
          <p className={`text-sm mt-2 ${isSelected ? 'text-green-100' : 'text-blue-100'}`}>
            {isSelected ? 'Selected for match' : 'Click to select for match'}
          </p>
        </div>
        
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isSelected 
            ? 'bg-white text-green-600' 
            : 'border-2 border-white/50'
        }`}>
          {isSelected && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}