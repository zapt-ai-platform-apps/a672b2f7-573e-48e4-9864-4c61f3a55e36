import React from 'react';
import SquadList from './SquadList';

interface SquadListSectionProps {
  squads: any[];
  loading: boolean;
  handleSelectSquad: (squad: any) => void;
  handleEditSquad: (squad: any) => void;
  selectedSquad: any;
  handleProceedToSetup: () => void;
  onAddNewSquad: () => void;
}

export default function SquadListSection({
  squads,
  loading,
  handleSelectSquad,
  handleEditSquad,
  selectedSquad,
  handleProceedToSetup,
  onAddNewSquad,
}: SquadListSectionProps): JSX.Element {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="mb-6 md:hidden">
        <button
          onClick={onAddNewSquad}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center"
        >
          <span className="mr-2">+</span> Add New Squad
        </button>
      </div>
      
      <SquadList
        squads={squads}
        loading={loading}
        handleSelectSquad={handleSelectSquad}
        handleEditSquad={handleEditSquad}
      />
      
      {selectedSquad && (
        <div className="mt-8">
          <button
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={handleProceedToSetup}
          >
            <span>Proceed to Game Setup</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}