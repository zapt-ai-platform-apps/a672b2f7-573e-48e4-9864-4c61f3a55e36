import React from 'react';
import { toast } from 'react-toastify';
import StartingLineupSelector from '@/modules/players/ui/StartingLineupSelector.jsx';

function PlayerManager({ players, deletePlayer, toggleStartingPlayer, startingPlayersCount }) {
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
    </>
  );
}

export default PlayerManager;