import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Squad, SquadListProps } from '../../types';
import SquadCard from './SquadCard';

export default function SquadList({ squads = [], loading, handleSelectSquad, handleEditSquad }: SquadListProps): JSX.Element {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">Loading squads...</span>
      </div>
    );
  }

  if (!loading && squads.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-2">No squads found.</p>
        <p className="text-gray-600 dark:text-gray-300">Please create a new squad to get started.</p>
      </div>
    );
  }

  const handleSelect = (squad: Squad) => {
    handleSelectSquad(squad);
    navigate('/setup/participants');
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {squads.map((squad, index) => (
        <SquadCard 
          key={squad.id || index} 
          squad={squad} 
          index={index} 
          onSelectSquad={handleSelect} 
          handleEditSquad={handleEditSquad} 
        />
      ))}
    </div>
  );
}