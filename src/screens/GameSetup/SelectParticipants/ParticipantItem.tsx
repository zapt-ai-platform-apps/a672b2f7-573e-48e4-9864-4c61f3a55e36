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
      className={`p-4 border rounded-lg cursor-pointer ${
        isSelected ? 'bg-green-500/80 text-white' : 'bg-gray-200 dark:bg-gray-700'
      } transition-colors duration-200 hover:scale-102 shadow-md`}
      onClick={onToggle}
    >
      <p className="font-medium">
        {player.name} {player.number && `(#${player.number})`}
      </p>
    </div>
  );
}