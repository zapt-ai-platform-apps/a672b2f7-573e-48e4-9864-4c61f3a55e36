import React from 'react';
import SquadListSection from '../../features/SquadManagement/components/SquadListSection';

interface SquadListViewProps {
  squads: any[];
  loading: boolean;
  selectedSquad: any;
  handleSelectSquad: (squad: any) => void;
  handleEditSquad: (squad: any) => void;
  handleProceedToSetup: () => void;
  onAddNewSquad: () => void;
}

export default function SquadListView({
  squads,
  loading,
  selectedSquad,
  handleSelectSquad,
  handleEditSquad,
  handleProceedToSetup,
  onAddNewSquad,
}: SquadListViewProps): JSX.Element {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white">Squad Options</h2>
        <button
          onClick={onAddNewSquad}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-md transition-all duration-200 cursor-pointer flex items-center"
        >
          <span className="mr-2">+</span> Add New Squad
        </button>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <SquadListSection
          squads={squads}
          loading={loading}
          handleSelectSquad={handleSelectSquad}
          handleEditSquad={handleEditSquad}
          selectedSquad={selectedSquad}
          handleProceedToSetup={handleProceedToSetup}
          onAddNewSquad={onAddNewSquad}
        />
      </div>
    </>
  );
}