import React from 'react';
import { ExtendedPlayer } from '../../../../features/GameSetup/types/ExtendedPlayer';

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded cursor-pointer ${isSelected ? 'bg-green-200' : 'bg-white'}`}
    >
      <h2 className="text-xl font-semibold">{player.name || 'Unnamed Player'}</h2>
    </div>
  );
}