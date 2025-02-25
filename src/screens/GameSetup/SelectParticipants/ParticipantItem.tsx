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
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? 'bg-green-500' : 'bg-gray-800'}`}
      onClick={onToggle}
    >
      <p className="text-white text-lg">{player.name || player.id}</p>
      {player.number && <p className="text-white text-sm">#{player.number}</p>}
    </div>
  );
}