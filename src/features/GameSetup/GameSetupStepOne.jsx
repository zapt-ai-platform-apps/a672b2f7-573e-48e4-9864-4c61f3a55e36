import React from 'react';
import GameIntro from './GameIntro.jsx';
import MatchSquadSelector from '../../components/MatchSquadSelector.jsx';

function GameSetupStepOne({ matchSquadPlayers, selectedMatchPlayers, toggleMatchPlayer, handleNext }) {
  return (
    <>
      <GameIntro />
      <MatchSquadSelector
        allPlayers={matchSquadPlayers}
        selectedPlayers={selectedMatchPlayers}
        togglePlayer={toggleMatchPlayer}
      />
      <div className="flex justify-end mt-4">
        <button
          className="px-8 py-4 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default GameSetupStepOne;