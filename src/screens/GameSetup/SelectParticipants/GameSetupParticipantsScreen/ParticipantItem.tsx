import React from 'react';
import { ExtendedPlayer } from '../../../../features/GameSetup/types/ExtendedPlayer';

type ParticipantItemProps = {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
};

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? 'bg-green-300' : 'bg-gray-200'}`}
      onClick={onToggle}
    >
      <h2 className="text-xl font-semibold">{player.name}</h2>
    </div>
  );
}