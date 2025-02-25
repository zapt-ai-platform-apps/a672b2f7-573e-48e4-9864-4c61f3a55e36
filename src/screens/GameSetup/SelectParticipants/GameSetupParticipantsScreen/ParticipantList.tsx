import React from 'react';
import ParticipantItem from '../ParticipantItem';
import { ExtendedPlayer } from '../types';

interface ParticipantListProps {
  validPlayers: ExtendedPlayer[];
  selectedMatchPlayers: ExtendedPlayer[];
  toggleMatchPlayer: (id: string) => void;
}

export default function ParticipantList({
  validPlayers,
  selectedMatchPlayers,
  toggleMatchPlayer,
}: ParticipantListProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {validPlayers.length > 0 ? (
        validPlayers.map((player) => (
          <ParticipantItem
            key={player.id}
            player={player}
            isSelected={selectedMatchPlayers.some((p) => p.id === player.id)}
            onToggle={() => toggleMatchPlayer(player.id)}
          />
        ))
      ) : (
        <p className="text-white text-lg col-span-3">
          No players available. Please go back and select a squad with players.
        </p>
      )}
    </div>
  );
}