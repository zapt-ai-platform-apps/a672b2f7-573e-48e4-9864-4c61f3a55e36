import React from 'react';
import { Player } from '../../../../types/GameTypes';

interface PlayerCardProps {
  player: Player;
  selected: boolean;
  onClick: () => void;
  'data-testid'?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  selected, 
  onClick,
  'data-testid': dataTestId = 'player-card' 
}) => {
  if (!player) {
    console.error('PlayerCard received null player');
    return null;
  }

  return (
    <div 
      className={`
        p-4 rounded-lg border shadow-sm transition-all cursor-pointer
        ${selected 
          ? 'bg-blue-100 border-blue-500 shadow-md' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow'}
      `}
      onClick={onClick}
      data-testid={dataTestId}
      data-player-id={player.id}
    >
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {player.number || 
           (player.name && player.name.charAt(0).toUpperCase())}
        </div>
        <div className="flex-grow">
          <h3 className="font-medium text-gray-800">{player.name}</h3>
          {player.isGoalkeeper && (
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              Goalkeeper
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;