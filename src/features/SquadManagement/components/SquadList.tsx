import React from 'react';
import SquadCard from './SquadCard';
import { Squad } from '../types';

interface SquadListProps {
  squads: Squad[];
  onEditSquad: (id: number) => void;
  onDeleteSquad: (id: number) => void;
  onSelectSquad: (id: number) => void;
}

const SquadList: React.FC<SquadListProps> = ({
  squads,
  onEditSquad,
  onDeleteSquad,
  onSelectSquad,
}) => {
  if (!squads || squads.length === 0) {
    return (
      <div className="flex justify-center items-center h-32 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">
          No squads available. Create your first squad!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {squads.map((squad) => (
        <SquadCard
          key={squad.id}
          squad={squad}
          onEdit={() => onEditSquad(squad.id)}
          onDelete={() => onDeleteSquad(squad.id)}
          onSelect={() => onSelectSquad(squad.id)}
        />
      ))}
    </div>
  );
};

export default SquadList;