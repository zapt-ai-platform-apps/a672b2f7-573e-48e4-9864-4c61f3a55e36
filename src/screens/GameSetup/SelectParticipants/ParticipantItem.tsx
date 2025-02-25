import React from 'react';

export interface ExtendedPlayer {
  id: string;
  isInMatchSquad: boolean;
  [key: string]: any;
}

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
      <p className="text-white text-lg">{player.id}</p>
    </div>
  );
}