import React from 'react';
import { ExtendedPlayer } from './useGameSetupParticipantsHandlers';

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-green-200' : 'bg-white'}`}
    >
      <p>{player.id}</p>
    </div>
  );
}