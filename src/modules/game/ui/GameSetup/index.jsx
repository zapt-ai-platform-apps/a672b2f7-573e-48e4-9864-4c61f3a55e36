import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/app/context/AppProvider';
import useGameSetup from '@/modules/game/hooks/useGameSetup';
import GameIntro from './GameIntro';
import { Button } from '@/modules/ui/components/Button';
import { Card } from '@/modules/ui/components/Card';
import StartGameButton from './StartGameButton';
import PlayerManager from '@/modules/players/ui/PlayerManager';
import GoalkeeperSettings from '@/modules/players/ui/GoalkeeperSettings';
import ErrorMessage from '@/modules/ui/components/ErrorMessage';

function GameSetup() {
  const navigate = useNavigate();
  const { handleStartGame } = useAppContext();
  const {
    playerName,
    setPlayerName,
    players,
    setPlayers,
    startingPlayersCount,
    errorMessage,
    setErrorMessage,
    startingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    loadedFromSquad,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer
  } = useGameSetup();

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (addPlayer()) {
      setErrorMessage('');
    } else if (!playerName.trim()) {
      setErrorMessage('Please enter a player name.');
    }
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <GameIntro />
        <ErrorMessage errorMessage={errorMessage} />
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-brand-500 dark:text-brand-400 mb-4">
            Add Players to Match
          </h2>
          {!loadedFromSquad && (
            <div className="mb-4">
              <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Player Name"
                  className="form-input flex-1 sm:rounded-r-none"
                />
                <Button 
                  type="submit" 
                  variant="primary"
                  className="cursor-pointer sm:rounded-l-none"
                  disabled={!playerName.trim()}
                >
                  Add Player
                </Button>
              </form>
            </div>
          )}
          
          {players.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Players for this match ({players.length})
              </h3>
              <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-3">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {players.map((player, index) => (
                    <li key={index} className="flex justify-between items-center py-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={player.isStartingPlayer}
                          onChange={() => toggleStartingPlayer(player.name)}
                          className="mr-3 cursor-pointer w-4 h-4 text-brand-500 focus:ring-brand-400 border-gray-300 rounded"
                          id={`player-${index}`}
                        />
                        <label 
                          htmlFor={`player-${index}`}
                          className="text-gray-800 dark:text-white cursor-pointer"
                        >
                          {player.name}
                        </label>
                      </div>
                      <Button 
                        onClick={() => deletePlayer(player.name)}
                        variant="danger"
                        size="small"
                        className="cursor-pointer"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 text-right text-gray-600 dark:text-gray-400 text-sm">
                <span className="font-medium">{startingPlayersCount}</span> players selected for starting lineup
              </div>
            </div>
          )}
          
          {players.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                No players added yet. {loadedFromSquad 
                  ? "You need to return to your squad and add players first." 
                  : "Add players using the form above."}
              </p>
              {loadedFromSquad && (
                <Button 
                  onClick={() => navigate('/squads')}
                  variant="primary"
                  className="mt-4 cursor-pointer"
                >
                  Go to My Squads
                </Button>
              )}
            </div>
          )}
        </Card>
        
        {players.length > 0 && startingPlayers.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-brand-500 dark:text-brand-400 mb-4">
              Goalkeeper Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Select Goalkeeper:
                </label>
                <select
                  className="form-input cursor-pointer"
                  value={goalkeeper}
                  onChange={(e) => setGoalkeeper(e.target.value)}
                >
                  <option value="">-- Select Goalkeeper --</option>
                  {startingPlayers.map((player, index) => (
                    <option key={index} value={player.name}>{player.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="gk-playtime"
                  checked={includeGKPlaytime}
                  onChange={() => setIncludeGKPlaytime(!includeGKPlaytime)}
                  className="w-5 h-5 text-brand-500 focus:ring-brand-400 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="gk-playtime" className="ml-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                  {includeGKPlaytime ? 'Include' : 'Exclude'} Goalkeeper's Playtime in Totals
                </label>
              </div>
            </div>
          </Card>
        )}
        
        <div className="flex justify-center mt-8">
          <StartGameButton
            players={players}
            startingPlayersCount={startingPlayersCount}
            goalkeeper={goalkeeper}
            includeGKPlaytime={includeGKPlaytime}
            setErrorMessage={setErrorMessage}
            onStartGame={handleStartGame}
          />
        </div>
      </div>
    </div>
  );
}

export default GameSetup;