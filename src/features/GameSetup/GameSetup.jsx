import React from 'react';
import GameSetupComponents from './GameSetupComponents.jsx';
import useGameSetup from './hooks/useGameSetup.js';
import { useStateContext } from '../../state.jsx';

function GameSetup() {
  const hookProps = useGameSetup();
  const { handleStartGame } = useStateContext();
  return <GameSetupComponents {...hookProps} handleStartGame={handleStartGame} />;
}

export default GameSetup;