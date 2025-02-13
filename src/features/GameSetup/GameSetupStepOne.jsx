import React from 'react';
import Checkbox from './components/Checkbox.jsx';

export function GameSetupStepOne({ matchSquadPlayers, selectedMatchPlayers, toggleMatchPlayer, handleNext, errorMessage }) {
  return (
    <div className="p-8 flex-grow">
      <h1 className="text-4xl font-bold mb-6 text-green-600">Select Match Participants</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {matchSquadPlayers.map((player) => (
          <div
            key={player.id}
            onClick={() => toggleMatchPlayer(player.id)}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedMatchPlayers.some(p => p.id === player.id)
                ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-800">{player.name}</span>
              <Checkbox
                checked={selectedMatchPlayers.some(p => p.id === player.id)}
                onChange={() => toggleMatchPlayer(player.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-8 py-4 bg-green-500 text-white text-xl rounded-full hover:bg-green-600 transition-colors shadow-lg cursor-pointer"
        >
          Continue to Setup →
        </button>
      </div>
    </div>
  );
}