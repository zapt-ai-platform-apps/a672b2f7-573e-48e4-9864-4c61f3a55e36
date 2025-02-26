import React from 'react';
import { Player } from '../../../../types/GameTypes';

interface PlayerCardProps {
  player: Player;
  selected: boolean;
  onClick: (player: Player) => void;
}

/**
 * Player card component for the starting lineup selection
 * @param props - Component props
 * @returns Player card component
 */
const PlayerCard: React.FC<PlayerCardProps> = ({ player, selected, onClick }) => {
  return (
    <div
      data-testid={`player-card-${player.id}`}
      className={`
        border rounded-lg p-3 cursor-pointer transition-all
        ${selected ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300'}
        hover:shadow-md
      `}
      onClick={() => onClick(player)}
    >
      <div className="font-medium text-center">
        {player.name}
      </div>
    </div>
  );
};

export default PlayerCard;