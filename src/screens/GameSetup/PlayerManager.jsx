import React from 'react';
import { toast } from 'react-toastify';
import AddPlayerForm from '../../components/AddPlayerForm.jsx';
import StartingLineupSelector from '../../components/StartingLineupSelector.jsx';

function PlayerManager({ playerName, setPlayerName, players, addPlayer, toggleStartingPlayer, startingPlayersCount }) {
  const handleAddPlayer = () => {
    const success = addPlayer();
    if (success) {
      toast.success('Player added successfully!');
    } else {
      toast.error('Please enter a player name.');
    }
  };

  return (
    <>
      <StartingLineupSelector
        players={players}
        startingPlayersCount={startingPlayersCount}
        toggleStartingPlayer={toggleStartingPlayer}
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