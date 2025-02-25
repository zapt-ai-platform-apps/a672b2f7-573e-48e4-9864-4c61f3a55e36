import React from 'react';

export type ExtendedPlayer = {
  id: string;
  name: string;
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
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-green-200 border-green-400' : 'bg-white border-gray-300'
      } hover:shadow-md`}
    >
      <h2 className="text-xl font-semibold">{player.name}</h2>
      <p className="text-sm text-gray-600 mt-1">
        {isSelected ? 'Selected for match' : 'Not selected'}
      </p>
    </div>
  );
}