import React from 'react';
import type { Player } from '../../../types/GameTypes';

interface ParticipantItemProps {
  player: Player & { isInMatchSquad?: boolean };
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded cursor-pointer hover:shadow-lg ${isSelected ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'}`}
    >
      <p className="text-lg">
        {typeof player.name === 'object'
          ? (player.name as { name?: string }).name || JSON.stringify(player.name)
          : player.name}
      </p>
    </div>
  );
}