import React from 'react';
import { toast } from 'react-toastify';
import StartingLineupSelector from '@/modules/players/ui/StartingLineupSelector.jsx';

function PlayerManager({ players, toggleStartingPlayer, startingPlayersCount }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-brand-500">Select Starting Line-up</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm md:text-lg">
        Select which players will start the match. You have selected {startingPlayersCount} {startingPlayersCount === 1 ? 'player' : 'players'} for the starting lineup.
      </p>
      {players.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No players selected for this match yet.</p>
      ) : (
        <StartingLineupSelector
          players={players}
          startingPlayersCount={startingPlayersCount}
          toggleStartingPlayer={toggleStartingPlayer}
        />
      )}
    </div>
  );
}

export default PlayerManager;