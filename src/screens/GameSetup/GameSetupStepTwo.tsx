import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { useStateContext } from '../../hooks/useStateContext';
import { ensurePlayerProperties } from '../../features/GameSetup/utils/ensurePlayerProperties';
import GoalkeeperSettings from './ConfigureLineup/GoalkeeperSettings';
import StartingLineup from './ConfigureLineup/StartingLineup';

export function GameSetupStepTwo(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { matchSquad, setPlayerData, setGoalkeeper } = useStateContext();
  const [goalkeeperPlayer, setGoalkeeperPlayer] = useState<any>(null);
  const [confirmedGoalkeeper, setConfirmedGoalkeeper] = useState<boolean>(false);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [startingPlayers, setStartingPlayers] = useState<any[]>([]);

  useEffect(() => {
    if (!matchSquad || matchSquad.length === 0) {
      console.error('No match squad available');
      navigate('/game-setup');
      return;
    }

    // Initialize starting players from match squad
    setStartingPlayers(matchSquad.map(player => ({
      ...player,
      isStartingPlayer: false
    })));
  }, [matchSquad, navigate]);

  const handleTogglePlayer = (playerId: string) => {
    setStartingPlayers(prev => 
      prev.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            isStartingPlayer: !player.isStartingPlayer
          };
        }
        return player;
      })
    );
  };

  const handleStartGame = () => {
    setLoading(true);
    setError('');
    
    try {
      // Validate goalkeeper selection
      if (!goalkeeperPlayer) {
        setError('Please select a goalkeeper');
        setLoading(false);
        return;
      }

      // Validate that enough starting players are selected
      const selectedStartingPlayers = startingPlayers.filter(p => p.isStartingPlayer);
      if (selectedStartingPlayers.length < 5) {
        setError('Please select at least 5 players for the starting lineup');
        setLoading(false);
        return;
      }
      
      // Set goalkeeper in context and mark as goalkeeper in player list
      setGoalkeeper(goalkeeperPlayer);
      
      // Prepare final player data with proper flags
      const updatedSquad = startingPlayers.map(player => {
        const isGK = player.id === goalkeeperPlayer.id;
        return ensurePlayerProperties({
          ...player,
          isGoalkeeper: isGK,
          isOnField: player.isStartingPlayer,
          // Add any other necessary properties
        });
      });
      
      // Update player data in state context
      setPlayerData(updatedSquad);
      
      // All checks passed, proceed to game management
      navigate('/game-management');
    } catch (error) {
      console.error('Error in game setup configuration:', error);
      Sentry.captureException(error);
      setError('An error occurred while setting up your game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          Game Setup: Configuration
        </h1>
        <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg text-center text-white mb-4">Configuring your game settings...</p>
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-progress rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors cursor-pointer shadow-sm backdrop-blur-sm"
      >
        ← Back
      </button>
      
      <div className="container mx-auto max-w-4xl px-4">
        <h1 
          className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
          data-testid="configure-lineup-title"
        >
          Game Setup: Configuration
          <span className="block text-white text-2xl mt-2" data-testid="configure-lineup">Configure Lineup</span>
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/30 border border-red-500 rounded-lg text-white">
            <p>{error}</p>
          </div>
        )}
        
        <div className="space-y-8">
          {/* Goalkeeper Selection */}
          <GoalkeeperSettings
            startingPlayers={startingPlayers}
            goalkeeper={goalkeeperPlayer}
            setGoalkeeper={setGoalkeeperPlayer}
            includeGKPlaytime={includeGKPlaytime}
            setIncludeGKPlaytime={setIncludeGKPlaytime}
            confirmedGoalkeeper={confirmedGoalkeeper}
            setConfirmedGoalkeeper={setConfirmedGoalkeeper}
          />
          
          {/* Starting Lineup Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Starting Lineup</h2>
            <StartingLineup 
              players={startingPlayers}
              onTogglePlayer={handleTogglePlayer}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleStartGame}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSetupStepTwo;