import React from 'react';
import SquadCard from './SquadCard';
import type { Squad } from '../../../types/GameTypes';

interface SquadListProps {
  squads: Squad[];
  onSelect: (squad: Squad) => void;
  onEdit: (squad: Squad) => void;
  selectedSquad: Squad | null;
}

export default function SquadList({ squads, onSelect, onEdit, selectedSquad }: SquadListProps): JSX.Element {
  return (
    <div className="space-y-3">
      {squads.map((squad) => (
        <SquadCard
          key={squad.id}
          squad={squad}
          isSelected={selectedSquad?.id === squad.id}
          onSelect={onSelect}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}