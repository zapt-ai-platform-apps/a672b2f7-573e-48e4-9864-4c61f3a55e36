import React from 'react';

interface ParticipantItemProps {
  player: any;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded cursor-pointer transition-colors ${isSelected ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'}`}
    >
      <p className="text-xl">{player.name}</p>
    </div>
  );
}