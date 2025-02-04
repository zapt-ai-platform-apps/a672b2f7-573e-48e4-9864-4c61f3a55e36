import React from 'react';
import StartingLineupSelector from '../../components/StartingLineupSelector.jsx';

function PlayerManager({ players, toggleStartingPlayer, startingPlayersCount }) {
  return (
    <>
      <StartingLineupSelector
        players={players}
        startingPlayersCount={startingPlayersCount}
        toggleStartingPlayer={toggleStartingPlayer}
      />
    </>
  );
}

export default PlayerManager;