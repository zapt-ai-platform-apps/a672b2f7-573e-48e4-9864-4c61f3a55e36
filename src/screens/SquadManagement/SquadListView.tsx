import React from 'react';
import { Squad } from '../../types/GameTypes';
import SquadCard from '../../features/SquadManagement/components/SquadCard';

export interface SquadListViewProps {
  squads: Squad[];
  onAddNewSquad: () => void;
  onSelectSquad: (squad: Squad) => void;
  onEdit: (squadId: number) => void; // Changed from onEditSquad to onEdit
}

const SquadListView: React.FC<SquadListViewProps> = ({
  squads,
  onAddNewSquad,
  onSelectSquad,
  onEdit
}) => {
  return (
    <div>
      {/* Add New Squad Button */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={onAddNewSquad}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-lg transition-colors duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Squad
        </button>
      </div>

      {/* Squads List */}
      {squads.length === 0 ? (
        <div className="text-center p-8 bg-white/5 rounded-lg">
          <p className="text-xl text-white mb-4">No squads available</p>
          <p className="text-gray-300">Create a new squad to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {squads.map(squad => (
            <SquadCard
              key={squad.id}
              squad={squad}
              onSelect={() => onSelectSquad(squad)}
              onEdit={() => onEdit(squad.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SquadListView;