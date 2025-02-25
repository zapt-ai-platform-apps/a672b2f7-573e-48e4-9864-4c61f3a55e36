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
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? 'bg-green-500' : 'bg-gray-200'}`}
      onClick={onToggle}
    >
      <p>{player.name} {player.number && `(#${player.number})`}</p>
    </div>
  );
}