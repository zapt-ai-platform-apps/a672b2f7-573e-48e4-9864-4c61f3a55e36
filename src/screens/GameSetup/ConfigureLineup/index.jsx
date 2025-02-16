import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parsePlayers } from '../../../utils/parsePlayers';
import { useStateContext } from '../../../state';
import useGameSetup from '../../../features/GameSetup/hooks/useGameSetup';
import StartingLineup from './StartingLineup';
import GoalkeeperSettings from './GoalkeeperSettings';

export default function GameSetupConfiguration() {
  const {
    playerName,
    setPlayerName,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
    errorMessage,
    startingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    handleStartGame
  } = useGameSetup();

  const { selectedSquad, setSelectedSquad } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (startingPlayers.length === 0 && selectedSquad && selectedSquad.players) {
      const parsedPlayers = parsePlayers(selectedSquad.players);
      setSelectedSquad(prev => ({
        ...prev,
        players: parsedPlayers.map((player, index) => ({
          id: index + 1,
          name: typeof player === 'object' ? player.name : player,
          isStartingPlayer: true
        }))
      }));
    }
  }, [startingPlayers, selectedSquad, setSelectedSquad]);

  const lineupPlayers = startingPlayers.length > 0 
    ? startingPlayers 
    : (selectedSquad && selectedSquad.players ? selectedSquad.players : []);

  const handleBack = () => {
    navigate('/setup/participants');
  };

  return (
    <div className="p-8 flex-grow">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        >
          ← Back to Selection
        </button>
        <h1 className="text-4xl font-bold text-green-600">Game Configuration</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <StartingLineup 
          startingPlayers={lineupPlayers}
          toggleStartingPlayer={toggleStartingPlayer}
        />

        <GoalkeeperSettings 
          startingPlayers={lineupPlayers}
          goalkeeper={goalkeeper}
          setGoalkeeper={setGoalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setIncludeGKPlaytime={setIncludeGKPlaytime}
        />

        <div className="flex justify-end">
          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-purple-500 text-white text-xl rounded-full hover:bg-purple-600 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
            disabled={!goalkeeper || lineupPlayers.length === 0}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}