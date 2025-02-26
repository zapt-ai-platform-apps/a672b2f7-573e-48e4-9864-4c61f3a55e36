import React from 'react';
import { Player as PlayerType } from '../../../shared/models/player';

interface PlayerProps {
  player: PlayerType;
  onSelect?: (player: PlayerType) => void;
  isActive?: boolean;
  showStatus?: boolean;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
}

const Player: React.FC<PlayerProps> = ({ 
  player, 
  onSelect, 
  isActive = false,
  showStatus = true,
  onPointerDown
}) => {
  const statusColor = player.status === 'playing' 
    ? 'bg-green-500' 
    : player.status === 'substitute' 
      ? 'bg-yellow-500' 
      : 'bg-gray-500';

  // Ensure we're displaying player name as a string, not rendering the position object
  const nameParts = player.name.split(' ');
  const displayName = nameParts.length > 1 
    ? `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.` 
    : player.name;
    
  return (
    <div 
      className={`rounded-lg p-3 mb-2 cursor-pointer transition-all ${
        isActive ? 'bg-indigo-700 scale-105' : 'bg-indigo-800 hover:bg-indigo-700'
      }`}
      onClick={() => onSelect && onSelect(player)}
      onPointerDown={onPointerDown}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{displayName}</span>
        {showStatus && (
          <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
        )}
      </div>
    </div>
  );
};

export default Player;