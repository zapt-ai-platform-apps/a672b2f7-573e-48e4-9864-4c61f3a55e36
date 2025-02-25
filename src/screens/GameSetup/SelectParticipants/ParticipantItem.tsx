import React from 'react';

export type ExtendedPlayer = {
  id: string;
  isInMatchSquad: boolean;
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
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-green-200 border-green-400' : 'bg-white border-gray-300'}`}
    >
      <h2 className="text-xl font-semibold">{player.id}</h2>
      <p>{isSelected ? 'Selected' : 'Not Selected'}</p>
    </div>
  );
}