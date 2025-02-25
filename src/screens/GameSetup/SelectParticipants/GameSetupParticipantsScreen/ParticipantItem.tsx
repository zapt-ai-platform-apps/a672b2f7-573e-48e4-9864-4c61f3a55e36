import React from 'react';
import { ExtendedPlayer } from '../../../../features/GameSetup/types/ExtendedPlayer';

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-green-500' : 'bg-gray-800'
      }`}
    >
      <h2 className="text-xl font-semibold text-white">{player.name}</h2>
      <p className="text-white">{isSelected ? 'Selected' : 'Not Selected'}</p>
    </div>
  );
}