import React from 'react';
import { ExtendedPlayer } from '../../../../features/GameSetup/types/ExtendedPlayer';
import ParticipantItem from './ParticipantItem';

interface ParticipantsGridProps {
  validPlayers: ExtendedPlayer[];
  selectedMatchPlayers: ExtendedPlayer[];
  toggleMatchPlayer: (id: string) => void;
}

export function ParticipantsGrid({ 
  validPlayers, 
  selectedMatchPlayers, 
  toggleMatchPlayer 
}: ParticipantsGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {validPlayers.map((player) => (
        <ParticipantItem
          key={player.id}
          player={player}
          isSelected={selectedMatchPlayers.some(p => p.id === player.id)}
          onToggle={() => toggleMatchPlayer(player.id)}
        />
      ))}
    </div>
  );
}