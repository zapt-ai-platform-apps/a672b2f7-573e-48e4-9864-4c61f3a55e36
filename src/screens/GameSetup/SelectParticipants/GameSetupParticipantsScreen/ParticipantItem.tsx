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
      className={`p-4 rounded-lg cursor-pointer shadow-md transition-transform transform hover:scale-105 ${
        isSelected ? 'bg-green-500' : 'bg-gray-700'
      }`}
    >
      <h2 className="text-xl font-semibold text-white">{player.name || 'Unnamed Player'}</h2>
      <p className="text-white">ID: {player.id}</p>
      <p className="text-white">{isSelected ? 'Selected' : 'Not Selected'}</p>
    </div>
  );
}