import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStartingLineup from './useStartingLineup';
import PlayerCard from './PlayerCard';
import { useStateContext } from "../../../../hooks/useStateContext";

export default function StartingLineup(): JSX.Element {
  const {
    startingPlayers,
    toggleStartingPlayer,
    goBack,
    setGoalkeeperForPlayer,
    isGKModalOpen,
    openGKModal,
    closeGKModal,
    confirmedGoalkeeper,
    setConfirmedGoalkeeper
  } = useStartingLineup();
  
  const navigate = useNavigate();
  const { handleStartGame: startGame, matchSquad, includeGKPlaytime } = useStateContext();

  const onStartGame = () => {
    if (!confirmedGoalkeeper) {
      openGKModal();
      return;
    }

    const updatedSquad = startingPlayers.map(player => ({
      ...player,
      isStartingPlayer: player.selected
    }));

    startGame(updatedSquad, confirmedGoalkeeper.name, includeGKPlaytime);
    navigate('/game-management');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-2 text-green-600">Select Starting Lineup</h1>
        <p className="text-sm text-gray-600 mb-6">Tap on a player to toggle selection.</p>

        {confirmedGoalkeeper && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">
              Confirmed Goalkeeper: {confirmedGoalkeeper.name}
            </h3>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {startingPlayers.map((player, index) => (
            <PlayerCard
              key={player.id ? player.id : index}
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
            onClick={onStartGame}
            disabled={startingPlayers.length === 0}
            className="px-8 py-4 bg-green-500 text-white text-xl rounded-full hover:bg-green-600 transition-colors shadow-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Start Game
          </button>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Back
        </button>
      </div>

      {isGKModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeGKModal}></div>
          <div className="bg-white p-6 rounded-lg z-[60] shadow-xl w-80">
            <h2 className="text-lg font-bold mb-4">Confirm Goalkeeper</h2>
            <div className="max-h-64 overflow-y-auto">
              {startingPlayers.filter(player => player.selected).length > 0 ? (
                startingPlayers.filter(player => player.selected).map(player => (
                  <div
                    key={player.id}
                    className={`w-full text-left px-4 py-2 border-b hover:bg-gray-100 cursor-pointer ${
                      confirmedGoalkeeper?.id === player.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setGoalkeeperForPlayer(player.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{player.name}</span>
                      {confirmedGoalkeeper?.id === player.id && (
                        <span className="text-green-500">✓</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No starting players available</p>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  if (confirmedGoalkeeper) {
                    closeGKModal();
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg cursor-pointer"
                disabled={!confirmedGoalkeeper}
              >
                {confirmedGoalkeeper ? 'Keep Selection' : 'Select First'}
              </button>
              <button
                onClick={closeGKModal}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}