import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMatchSquad from '../../../features/GameSetup/hooks/useMatchSquad';
import { useStateContext } from '../../../hooks/useStateContext';
import { ExtendedPlayer } from '../../../features/GameSetup/types/ExtendedPlayer';
import useGameSetupParticipantsHandlers from './useGameSetupParticipantsHandlers';
import { ParticipantsGrid } from './ParticipantsGrid';

export default function GameSetupParticipantsScreen(): JSX.Element {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validPlayers = matchSquadPlayers.filter(
    (player) => player && typeof player.id === 'string'
  ) as ExtendedPlayer[];

  console.log('Valid players for selection:', validPlayers);

  const selectedMatchPlayers = validPlayers.filter(
    (player) => player.isInMatchSquad
  );

  const { handleNext, handleBack } = useGameSetupParticipantsHandlers(
    selectedMatchPlayers,
    setSelectedSquad,
    navigate,
    setErrorMessage
  );

  return (
    <div className="min-h-screen flex flex-col p-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          Select Match Participants
        </h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <ParticipantsGrid
          validPlayers={validPlayers}
          selectedMatchPlayers={selectedMatchPlayers}
          toggleMatchPlayer={toggleMatchPlayer}
        />
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl rounded-xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Continue to Setup →
          </button>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-md transition-colors cursor-pointer backdrop-blur-sm"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}