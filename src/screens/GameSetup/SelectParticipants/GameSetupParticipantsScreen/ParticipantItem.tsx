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
      className={`p-4 border cursor-pointer ${isSelected ? 'bg-blue-200' : 'bg-gray-100'}`}
    >
      <p>{player.id}</p>
    </div>
  );
}