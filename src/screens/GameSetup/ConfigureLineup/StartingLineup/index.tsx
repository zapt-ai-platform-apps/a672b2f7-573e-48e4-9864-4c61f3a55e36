import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../../state';
import type { Player } from '../../../context/StateContext';
import PlayerCard from './PlayerCard';

export default function StartingLineup(): JSX.Element {
  const { selectedSquad, setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (selectedSquad && selectedSquad.players) {
      setStartingPlayers(selectedSquad.players);
    } else {
      navigate('/setup/participants');
    }
  }, [selectedSquad, navigate]);

  const toggleStartingPlayer = (playerId: string | number): void => {
    setStartingPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, isStartingPlayer: !player.isStartingPlayer }
          : player
      )
    );
  };

  const handleContinue = (): void => {
    if (!selectedSquad) return;
    const updatedSquad = {
      ...selectedSquad,
      players: startingPlayers,
    };
    setSelectedSquad(updatedSquad);
    navigate('/setup/configuration');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-2 text-green-600">Select Starting Lineup</h1>
        <p className="text-sm text-gray-600 mb-6">Tap on a player to toggle selection.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {startingPlayers.map((player, index) => (
            <PlayerCard 
              key={player.id || index}
              player={player}
              onToggle={toggleStartingPlayer}
            />
          ))}
          {startingPlayers.length === 0 && (
            <div className="text-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-100">
              <p className="text-yellow-700">No players in starting lineup</p>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-green-500 text-white text-xl rounded-full hover:bg-green-600 transition-colors shadow-lg cursor-pointer"
          >
            Continue to Configuration →
          </button>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={() => navigate('/setup/participants')}
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}