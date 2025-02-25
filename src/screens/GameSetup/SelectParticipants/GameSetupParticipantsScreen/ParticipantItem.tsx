import React from 'react';

export interface ExtendedPlayer {
  id: string;
  name: string;
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
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? 'bg-green-200' : 'bg-gray-200'}`}
      onClick={onToggle}
    >
      <p className="text-lg">{player.name}</p>
    </div>
  );
}