import React from 'react';
import { Player } from '../../../../shared/models/player';

interface PlayerCardProps {
  player: Player;
  onClick: (player: Player) => void;
  isSelected?: boolean;
  onToggle?: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  onClick, 
  isSelected = false, 
  onToggle 
}) => {
  const nameParts = player.name.split(' ');
  const displayName = nameParts.length > 1 
    ? `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.` 
    : player.name;

  const handleClick = () => {
    if (onToggle) {
      onToggle(player);
    } else {
      onClick(player);
    }
  };

  return (
    <div 
      className={`rounded-lg p-3 shadow-md text-center cursor-pointer transition-all hover:bg-indigo-700 hover:scale-105 ${
        isSelected ? 'bg-indigo-700 scale-105' : 'bg-indigo-800'
      }`}
      onClick={handleClick}
    >
      <div className="text-sm font-medium text-white">
        {displayName}
      </div>
    </div>
  );
};

export default PlayerCard;