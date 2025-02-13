import React from 'react';
import GameSetupComponents from './components/GameSetupComponents.jsx';
import useGameSetup from './hooks/useGameSetup.js';
import { useStateContext } from '../../state.jsx';

function GameSetupScreen() {
  const hookProps = useGameSetup();
  const { handleStartGame } = useStateContext();
  return <GameSetupComponents {...hookProps} handleStartGame={handleStartGame} />;
}

export default GameSetupScreen;