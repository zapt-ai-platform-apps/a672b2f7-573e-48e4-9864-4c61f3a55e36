import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameIntro from './GameIntro.jsx';
import PlayerManager from '@/modules/players/ui/PlayerManager.jsx';
import StartGameButton from './StartGameButton.jsx';
import GoalkeeperSettings from '@/modules/players/ui/GoalkeeperSettings.jsx';
import ErrorMessage from '@/modules/ui/components/ErrorMessage.jsx';
import useGameSetup from '@/modules/game/hooks/useGameSetup';
import { useAppContext } from '@/app/context/AppProvider';
import { Button } from '@/modules/ui/components/Button';
import AddPlayerModal from '@/modules/players/ui/AddPlayerModal.jsx';

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

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  // Get the handleStartGame function from the AppContext to properly initialize players
  const { handleStartGame } = useAppContext();

  const handleGoToSquads = () => {
    navigate('/squads');
  };

  const handleAddPlayerFromModal = (playerName) => {
    if (playerName) {
      const newPlayer = {
        name: playerName.trim(),
        isStartingPlayer: false
      };
      setPlayers([...players, newPlayer]);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <GameIntro />
      <ErrorMessage errorMessage={errorMessage} />
      
      {loadedFromSquad && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6 flex items-center justify-between">
          <div>
            <p className="font-bold">Squad Players Loaded</p>
            <p className="text-sm">You've loaded players from your saved squad. You can modify them below if needed.</p>
          </div>
          <Button 
            variant="secondary"
            size="small"
            onClick={handleGoToSquads}
          >
            Choose Different Squad
          </Button>
        </div>
      )}
      
      {!loadedFromSquad && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-3 text-brand-500">Load from Saved Squad</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You can select players from your saved squads instead of adding them manually.
          </p>
          <Button
            onClick={handleGoToSquads}
            variant="primary"
          >
            View My Squads
          </Button>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand-500">Add Players</h2>
          <Button
            onClick={() => setIsAddPlayerModalOpen(true)}
            variant="primary"
          >
            Add Player
          </Button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Add players to your match squad. You can add players manually or select from your squad.
        </p>
      </div>
      
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
      
      <StartGameButton
        players={players}
        startingPlayersCount={startingPlayersCount}
        goalkeeper={goalkeeper}
        includeGKPlaytime={includeGKPlaytime}
        setErrorMessage={setErrorMessage}
        onStartGame={handleStartGame} // Use the proper handleStartGame function
      />
      
      <AddPlayerModal
        isOpen={isAddPlayerModalOpen}
        onClose={() => setIsAddPlayerModalOpen(false)}
        onAddPlayer={handleAddPlayerFromModal}
      />
    </div>
  );
}

export default GameSetup;