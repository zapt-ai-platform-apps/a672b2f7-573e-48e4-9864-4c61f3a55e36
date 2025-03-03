import React from 'react';
import { toast } from 'react-toastify';
import AddPlayerForm from '@/modules/players/ui/AddPlayerForm.jsx';
import StartingLineupSelector from '@/modules/players/ui/StartingLineupSelector.jsx';

function PlayerManager({ playerName, setPlayerName, players, addPlayer, deletePlayer, toggleStartingPlayer, startingPlayersCount }) {
  const handleAddPlayer = () => {
    const success = addPlayer();
    if (success) {
      toast.success('Player added successfully!');
    } else {
      toast.error('Please enter a player name.');
    }
  };

  const handleDeletePlayer = (playerNameToDelete) => {
    const success = deletePlayer(playerNameToDelete);
    if (success) {
      toast.success('Player deleted successfully!');
    }
  };

  return (
    <>
      <StartingLineupSelector
        players={players}
        startingPlayersCount={startingPlayersCount}
        toggleStartingPlayer={toggleStartingPlayer}
        handleDeletePlayer={handleDeletePlayer}
      />
      <AddPlayerForm
        playerName={playerName}
        setPlayerName={setPlayerName}
        handleAddPlayer={handleAddPlayer}
      />
    </>
  );
}

export default PlayerManager;