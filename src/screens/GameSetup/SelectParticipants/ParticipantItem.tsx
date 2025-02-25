import React from 'react';
import { ExtendedPlayer } from './types';

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded cursor-pointer transition-colors ${
        isSelected ? 'bg-green-200' : 'bg-gray-200'
      }`}
    >
      <p className="text-lg font-medium">Player {player.id}</p>
      <p className="text-sm">{isSelected ? 'Selected' : 'Not Selected'}</p>
    </div>
  );
}