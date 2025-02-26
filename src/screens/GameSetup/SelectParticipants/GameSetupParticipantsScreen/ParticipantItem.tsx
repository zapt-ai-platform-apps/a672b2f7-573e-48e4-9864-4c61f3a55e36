import React from 'react';
import type { ExtendedPlayer } from './types';

type ParticipantItemProps = {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
};

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-green-500' : 'bg-gray-200'}`}
    >
      <h2 className="text-xl font-bold">{player.name}</h2>
      <p>ID: {player.id}</p>
    </div>
  );
}