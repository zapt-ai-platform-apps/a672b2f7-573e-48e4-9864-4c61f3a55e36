import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMatchSquad from '../../../features/GameSetup/hooks/useMatchSquad';
import { useStateContext } from '../../../state';
import ParticipantItem from './ParticipantItem';
import type { Player } from '../../../context/StateContext';
import type { Squad } from '../../../components/StateProvider';

interface ExtendedPlayer extends Player {
  isInMatchSquad?: boolean;
}

export default function GameSetupParticipantsScreen(): JSX.Element {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const selectedMatchPlayers = matchSquadPlayers.filter((player: Player) => (player as ExtendedPlayer).isInMatchSquad) as ExtendedPlayer[];

  const handleNext = (): void => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one player for the match.');
      return;
    }
    
    const playersWithIds = selectedMatchPlayers.map((player: ExtendedPlayer, index: number) => ({
      id: player.id ? player.id : index + 1,
      name: typeof player.name === 'object'
        ? ((player.name as { name: string }).name || JSON.stringify(player.name))
        : player.name,
      isStartingPlayer: true
    }));

    setSelectedSquad((prev: Squad | null) => ({
      id: prev?.id ?? '',
      name: prev?.name ?? '',
      players: playersWithIds
    }));
    
    navigate('/setup/configuration');
  };

  const handleBack = (): void => {
    navigate('/squads');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-green-600">Select Match Participants</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {matchSquadPlayers.map((player: Player) => (
            <ParticipantItem
              key={player.id}
              player={player as ExtendedPlayer}
              isSelected={selectedMatchPlayers.some((p: ExtendedPlayer) => p.id === player.id)}
              onToggle={() => toggleMatchPlayer(String(player.id))}
            />
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
      <div className="p-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}