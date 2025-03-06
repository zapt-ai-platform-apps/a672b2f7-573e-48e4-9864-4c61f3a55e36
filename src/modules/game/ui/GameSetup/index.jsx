import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameIntro from './GameIntro.jsx';
import PlayerManager from '@/modules/players/ui/PlayerManager.jsx';
import StartGameButton from './StartGameButton.jsx';
import GoalkeeperSettings from '@/modules/players/ui/GoalkeeperSettings.jsx';
import ErrorMessage from '@/modules/ui/components/ErrorMessage.jsx';
import useGameSetup from '@/modules/game/hooks/useGameSetup';
import { useAppContext } from '@/app/context/AppProvider';
import { Button } from '@/modules/ui/components/Button';
import { useSquads } from '@/modules/squads/api';
import * as Sentry from '@sentry/browser';
import { Card } from '@/modules/ui/components/Card';

function GameSetup() {
  const navigate = useNavigate();
  const {
    playerName,
    setPlayerName,
    players,
    setPlayers,
    startingPlayersCount,
    errorMessage,
    setErrorMessage,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    loadedFromSquad,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
  } = useGameSetup();

  const { handleStartGame } = useAppContext();
  const { getSquadPlayers } = useSquads();
  const [isLoading, setIsLoading] = useState(false);
  const [squadPlayers, setSquadPlayers] = useState([]);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);

  // Get squad ID from localStorage (saved when navigating from SquadPlayersScreen)
  const squadId = localStorage.getItem('current_squad_id');

  // Fetch all players from the current squad
  useEffect(() => {
    if (!squadId) return;

    const fetchSquadPlayers = async () => {
      setIsLoading(true);
      try {
        const players = await getSquadPlayers(squadId);
        setSquadPlayers(players);
        
        // If we have players in state, we need to mark which ones are selected
        if (players.length > 0 && selectedTeamPlayers.length === 0) {
          // Check if we have any players already loaded (from localStorage possibly)
          if (players.length > 0) {
            const existingPlayerNames = players.map(p => p.name);
            const initialSelection = selectedTeamPlayers.length > 0 
              ? selectedTeamPlayers 
              : players.filter(p => existingPlayerNames.includes(p.name));
            
            setSelectedTeamPlayers(initialSelection);
          }
        }
      } catch (error) {
        console.error('Error fetching squad players:', error);
        Sentry.captureException(error);
        setErrorMessage('Failed to load squad players');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSquadPlayers();
  }, [squadId, getSquadPlayers]);

  // Update players array when team selection changes
  useEffect(() => {
    const updatedPlayers = selectedTeamPlayers.map(squadPlayer => {
      // Check if this player already exists in the players array
      const existingPlayer = players.find(p => p.name === squadPlayer.name);
      
      return {
        name: squadPlayer.name,
        // Keep existing player's starting status if available, otherwise default to false
        isStartingPlayer: existingPlayer ? existingPlayer.isStartingPlayer : false
      };
    });
    
    setPlayers(updatedPlayers);
  }, [selectedTeamPlayers]);

  const handleGoToSquads = () => {
    navigate('/squads');
  };

  const handleToggleTeamPlayer = (player) => {
    if (selectedTeamPlayers.some(p => p.id === player.id)) {
      // Remove from selected team
      setSelectedTeamPlayers(selectedTeamPlayers.filter(p => p.id !== player.id));
    } else {
      // Add to selected team
      setSelectedTeamPlayers([...selectedTeamPlayers, player]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 md:p-8">
      <GameIntro />
      <ErrorMessage errorMessage={errorMessage} />
      
      {loadedFromSquad && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4 md:mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-3 md:mb-0">
            <p className="font-bold">Squad Players Loaded</p>
            <p className="text-xs md:text-sm">Select players for this match and set your starting lineup below.</p>
          </div>
          <Button 
            variant="secondary"
            size="small"
            onClick={handleGoToSquads}
            className="self-start md:self-auto"
          >
            Choose Different Squad
          </Button>
        </div>
      )}
      
      {!squadId && (
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold mb-3 text-brand-500">Load from Saved Squad</h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
            You can select players from your saved squads instead of adding them manually.
          </p>
          <Button
            onClick={handleGoToSquads}
            variant="primary"
            className="w-full md:w-auto"
          >
            View My Squads
          </Button>
        </div>
      )}
      
      {squadId && (
        <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-md shadow mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-brand-500">Select Team for Match</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
            Choose the players from your squad who will participate in this match.
          </p>
          
          {isLoading ? (
            <div className="flex justify-center py-6 md:py-8">
              <div className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-brand-500 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-4">
              {squadPlayers.map(player => (
                <Card 
                  key={player.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTeamPlayers.some(p => p.id === player.id)
                      ? 'border-4 border-green-500'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleToggleTeamPlayer(player)}
                >
                  <div className="flex items-center justify-between p-2 md:p-3">
                    <span className="text-base md:text-lg font-medium">{player.name}</span>
                    {selectedTeamPlayers.some(p => p.id === player.id) && (
                      <span className="text-green-500 text-xl md:text-2xl">✓</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {players.length > 0 && (
        <>
          <PlayerManager
            players={players}
            deletePlayer={deletePlayer}
            toggleStartingPlayer={toggleStartingPlayer}
            startingPlayersCount={startingPlayersCount}
          />
          
          <GoalkeeperSettings
            startingPlayers={players.filter((p) => p.isStartingPlayer)}
            goalkeeper={goalkeeper}
            setGoalkeeper={setGoalkeeper}
            includeGKPlaytime={includeGKPlaytime}
            setIncludeGKPlaytime={setIncludeGKPlaytime}
          />
          
          {!goalkeeper && players.filter(p => p.isStartingPlayer).length > 0 && (
            <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded mb-4">
              <p className="font-bold">Please select a goalkeeper</p>
              <p className="text-xs md:text-sm">You must select a goalkeeper before starting the game.</p>
            </div>
          )}
          
          <div className="flex justify-center md:justify-start">
            <StartGameButton
              players={players}
              startingPlayersCount={startingPlayersCount}
              goalkeeper={goalkeeper}
              includeGKPlaytime={includeGKPlaytime}
              setErrorMessage={setErrorMessage}
              onStartGame={handleStartGame}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default GameSetup;