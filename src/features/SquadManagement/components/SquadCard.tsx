import React from 'react';
import { SquadCardProps } from '../../types';

export default function SquadCard({ squad, index, onSelectSquad, handleEditSquad }: SquadCardProps): JSX.Element {
  return (
    <div
      key={squad.id || index}
      className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{squad.name}</h3>
        {squad.players && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {squad.players.length} player{squad.players.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <div className="p-4 flex justify-between items-center">
        <button
          type="button"
          onClick={() => onSelectSquad(squad)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200 cursor-pointer flex items-center"
        >
          <span>Select</span>
        </button>
        <button
          type="button"
          onClick={() => handleEditSquad(squad)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm transition-colors duration-200 cursor-pointer flex items-center"
        >
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}