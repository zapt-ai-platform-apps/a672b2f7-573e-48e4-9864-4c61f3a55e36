import React from 'react';
import SquadList from './SquadList';

interface SquadListSectionProps {
  squads: any[];
  loading: boolean;
  handleSelectSquad: (squad: any) => void;
  handleEditSquad: (squad: any) => void;
  selectedSquad: any;
  handleProceedToSetup: () => void;
}

export default function SquadListSection({
  squads,
  loading,
  handleSelectSquad,
  handleEditSquad,
  selectedSquad,
  handleProceedToSetup,
}: SquadListSectionProps): JSX.Element {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <SquadList
        squads={squads}
        loading={loading}
        handleSelectSquad={handleSelectSquad}
        handleEditSquad={handleEditSquad}
      />
      {selectedSquad && (
        <button
          className="w-full mt-6 px-8 py-4 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-colors disabled:opacity-50"
          onClick={handleProceedToSetup}
        >
          Proceed to Game Setup →
        </button>
      )}
    </div>
  );
}