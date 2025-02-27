import React from 'react';
import { Player } from '../../../types/GameTypes';

interface GoalkeeperSelectorProps {
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  confirmedGoalkeeper: boolean;
  setConfirmedGoalkeeper: (confirmed: boolean) => void;
}

export default function GoalkeeperSelector({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  confirmedGoalkeeper,
  setConfirmedGoalkeeper
}: GoalkeeperSelectorProps): JSX.Element {
  // startingPlayers should already be filtered to only contain players in starting lineup
  
  const handleSelectGoalkeeper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === '') {
      setGoalkeeper(null);
      setConfirmedGoalkeeper(false);
      return;
    }
    
    const selectedPlayer = startingPlayers.find(player => player.id === selectedId);
    if (selectedPlayer) {
      setGoalkeeper(selectedPlayer);
      setConfirmedGoalkeeper(true);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="goalkeeper-select" className="block text-sm font-medium text-white mb-2">
        Select Goalkeeper
      </label>
      <div className="relative">
        <select
          id="goalkeeper-select"
          className="block w-full px-4 py-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white/10 backdrop-blur-sm text-white appearance-none box-border"
          onChange={handleSelectGoalkeeper}
          value={goalkeeper?.id || ''}
          data-testid="goalkeeper-select"
        >
          <option value="" className="bg-blue-900">Select a goalkeeper</option>
          {startingPlayers.length > 0 ? (
            startingPlayers.map(player => (
              <option key={player.id} value={player.id} className="bg-blue-900">
                {player.name}
              </option>
            ))
          ) : (
            <option value="" disabled className="bg-blue-900">
              Select players for starting lineup first
            </option>
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {goalkeeper && (
        <div className="mt-4 p-3 bg-blue-600/30 border border-blue-500 rounded-md backdrop-blur-sm animate-fadeIn">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold">Goalkeeper selected: {goalkeeper.name}</p>
              <p className="text-sm text-blue-200">Ready to take position</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}