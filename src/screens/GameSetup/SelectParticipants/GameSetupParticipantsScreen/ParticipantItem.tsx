import React from 'react';
import { ExtendedPlayer } from './types';

type ParticipantItemProps = {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
};

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-green-500' : 'bg-gray-700'
      }`}
    >
      <h2 className="text-xl text-white">{player.name}</h2>
      <p className="text-sm text-gray-200">{isSelected ? 'Selected' : 'Not Selected'}</p>
    </div>
  );
}