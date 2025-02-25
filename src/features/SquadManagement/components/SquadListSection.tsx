import React from 'react';
import SquadList from './SquadList';
import type { Squad } from '../../../types/GameTypes';

interface SquadListSectionProps {
  squads: Squad[] | null;
  loading: boolean;
  handleSelectSquad: (squad: Squad) => void;
  handleEditSquad: (squad: Squad) => void;
  selectedSquad: Squad | null;
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
  onAddNewSquad
}: SquadListSectionProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-white">Your Squads</h3>
        <p className="text-white/80">Select a squad to start a game or create a new one.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          {squads && squads.length > 0 ? (
            <>
              <SquadList
                squads={squads}
                onSelect={handleSelectSquad}
                onEdit={handleEditSquad}
                selectedSquad={selectedSquad}
              />
              
              {selectedSquad && (
                <div className="pt-6 border-t border-white/20 mt-6">
                  <button
                    onClick={handleProceedToSetup}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-colors shadow-lg cursor-pointer"
                  >
                    Continue with Selected Squad
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 bg-white/5 rounded-xl">
              <p className="text-white/80 mb-4">You don't have any squads yet.</p>
              <button
                onClick={onAddNewSquad}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-colors shadow-md cursor-pointer"
              >
                Create Your First Squad
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}