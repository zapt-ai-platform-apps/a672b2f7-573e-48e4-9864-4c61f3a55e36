import React from 'react';
import { Player as PlayerType } from '@/types/GameTypes';

interface PlayerProps {
  player: PlayerType;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  'data-testid'?: string;
  'data-player-id'?: string;
  showStatus?: boolean; // Added optional showStatus prop
}

/**
 * Component to represent a player on the pitch
 */
const Player: React.FC<PlayerProps> = ({ 
  player, 
  onPointerDown,
  'data-testid': dataTestId,
  'data-player-id': dataPlayerId,
  showStatus
}) => {
  const { name, position, isGoalkeeper } = player;
  
  // Calculate position styles based on player position
  const positionStyle = {
    left: `${position.x}%`,
    top: `${position.y}%`,
  };

  return (
    <div
      className={`absolute w-16 h-16 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-transform`}
      style={positionStyle}
      onPointerDown={onPointerDown}
      data-testid={dataTestId || `player-${player.id}`}
      data-player-id={dataPlayerId || player.id}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md
          ${isGoalkeeper ? 'bg-yellow-500' : 'bg-blue-600'}`}
      >
        <span className="pointer-events-none">{name}</span>
      </div>
      {showStatus && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/70 text-xs text-white px-2 py-1 rounded-full">
          {isGoalkeeper ? 'GK' : ''}
        </div>
      )}
    </div>
  );
};

export default Player;