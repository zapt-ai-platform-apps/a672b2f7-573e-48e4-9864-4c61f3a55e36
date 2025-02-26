import React from 'react';

export type ExtendedPlayer = {
  id: string;
  isInMatchSquad: boolean;
  name?: string;
};

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
      <p className="text-white text-lg">{player.name || `Player ${player.id}`}</p>
    </div>
  );
}