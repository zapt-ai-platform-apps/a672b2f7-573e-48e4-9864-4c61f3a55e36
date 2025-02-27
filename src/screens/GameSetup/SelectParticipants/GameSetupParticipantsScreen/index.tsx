import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMatchSquad from '../../../../features/GameSetup/hooks/useMatchSquad';
import { useStateContext } from '../../../../hooks/useStateContext';
import ParticipantItem from './ParticipantItem';
import { ExtendedPlayer } from './types';
import useGameSetupParticipantsHandlers from './useGameSetupParticipantsHandlers';

export function GameSetupParticipantsScreen(): JSX.Element {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('GameSetupParticipantsScreen mounted, selectedSquad:', selectedSquad);
    setIsInitialized(true);
  }, [selectedSquad]);

  // Ensure matchSquadPlayers is always an array before filtering
  const validPlayers = (matchSquadPlayers || []).filter(
    player => player && typeof player.id === 'string'
  ) as ExtendedPlayer[];

  console.log('Valid players for selection:', validPlayers);

  const selectedMatchPlayers = validPlayers.filter(
    (player) => player.isInMatchSquad
  );

  const { handleNext, handleBack } = useGameSetupParticipantsHandlers(
    selectedMatchPlayers,
    useStateContext().setSelectedSquad,
    navigate,
    setErrorMessage
  );

  return (
    <div className="min-h-screen flex flex-col p-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          Select Match Participants
        </h1>
        {errorMessage && (
          <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}
        
        {!isInitialized ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : validPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {validPlayers.map((player) => (
              <ParticipantItem
                key={player.id}
                player={player}
                isSelected={player.isInMatchSquad}
                onToggle={() => toggleMatchPlayer(player.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8">
            <p className="text-white text-lg">
              No players available. Please go back and select a squad with players.
            </p>
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-md transition-colors cursor-pointer backdrop-blur-sm"
            >
              ← Back to Squads
            </button>
          </div>
        )}
        
        {validPlayers.length > 0 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-md transition-colors cursor-pointer backdrop-blur-sm"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl rounded-xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
              disabled={selectedMatchPlayers.length === 0}
            >
              Continue to Setup →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameSetupParticipantsScreen;