import React from 'react';

export interface ExtendedPlayer {
  id: string;
  isInMatchSquad: boolean;
}

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      className={`p-4 border rounded-md cursor-pointer ${isSelected ? 'bg-blue-200' : 'bg-gray-100'}`}
      onClick={onToggle}
    >
      <p>{player.id}</p>
    </div>
  );
}