import React from 'react';
import { Player } from '../../../../types/GameTypes';

interface PlayerCardProps {
  player: Player;
  selected: boolean;
  onClick: () => void;
  'data-testid'?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, selected, onClick, ...props }) => {
  return (
    <div
      className={`p-4 rounded-lg transition-all transform cursor-pointer ${
        selected
          ? 'bg-blue-600 shadow-lg scale-105'
          : 'bg-white/10 hover:bg-white/20'
      }`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center">
        <div className={`relative w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
          selected ? 'bg-white' : 'bg-gray-300/30'
        }`}>
          {selected ? (
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          ) : (
            <span className="text-white text-sm">{player.number || "?"}</span>
          )}
        </div>
        <div>
          <h3 className={`font-medium ${selected ? 'text-white' : 'text-gray-200'}`}>
            {player.name}
          </h3>
          {player.isGoalkeeper && (
            <span className="inline-block px-2 py-1 mt-1 text-xs bg-yellow-400/30 text-yellow-100 rounded">
              Goalkeeper
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;