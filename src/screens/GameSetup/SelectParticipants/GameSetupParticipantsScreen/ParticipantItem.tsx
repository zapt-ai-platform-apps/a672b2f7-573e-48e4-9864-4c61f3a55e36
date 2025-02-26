import React from 'react';
import { ExtendedPlayer } from './helpers';

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105 ${
        isSelected ? 'bg-green-500' : 'bg-gray-700'
      }`}
    >
      <p className="text-white">{player.name || 'Unnamed Player'}</p>
    </div>
  );
}