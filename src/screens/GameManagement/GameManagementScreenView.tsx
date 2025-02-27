import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../hooks/useStateContext';
import GameManagementMainContent from './GameManagementMainContent';
import GameManagementScreenViewContent from './GameManagementScreenViewContent';
import BackButton from './BackButton';
import { motion } from 'framer-motion';
import useGameManagementLogic from '../../features/GameManagement/hooks/useGameManagementLogic';

export default function GameManagementScreenView(): JSX.Element {
  const navigate = useNavigate();
  const { 
    playerData, setPlayerData,
    goals, setGoals,
    ourScore, setOurScore,
    opponentScore, setOpponentScore,
    timerControls
  } = useStateContext();
  
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showConfirmEndModal, setShowConfirmEndModal] = useState(false);
  const [modalContext, setModalContext] = useState<any>(null);
  const [selectedGoalkeeper, setSelectedGoalkeeper] = useState<string | null>(null);
  
  const { 
    handleRemoveLastGoal, 
    handleIncreasePlayers, 
    handleDecreasePlayers 
  } = useGameManagementLogic();

  const handleEndGame = () => {
    navigate('/game-summary');
  };

  const assignGoalkeeper = () => {
    const currentGK = playerData.find(p => p.isGoalkeeper);
    setSelectedGoalkeeper(currentGK?.id || null);
    setModalContext('assignGoalkeeper');
  };

  // Wrapper functions to fix type mismatches
  const handleRemoveLastGoalWrapper = () => {
    if (handleRemoveLastGoal && goals) {
      handleRemoveLastGoal(goals, ourScore, opponentScore, setGoals, setOurScore, setOpponentScore);
    }
  };

  const handleIncreasePlayersWrapper = () => {
    if (handleIncreasePlayers) {
      handleIncreasePlayers(playerData, setPlayerData);
    }
  };

  const handleDecreasePlayersWrapper = () => {
    if (handleDecreasePlayers) {
      handleDecreasePlayers(playerData, setPlayerData);
    }
  };

  // Calculate on-field and off-field players for passing to components
  const onFieldPlayers = playerData.filter(player => player.isOnField);
  const offFieldPlayers = playerData.filter(player => !player.isOnField);

  // Simple function to get total play time for a player
  const getTotalPlayTime = (player: any) => player.totalPlayTime || 0;

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BackButton />
      
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Game Management
      </h1>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg mb-6">
        <GameManagementMainContent 
          playerData={playerData}
          isRunning={timerControls.isRunning}
          onFieldPlayers={onFieldPlayers}
          offFieldPlayers={offFieldPlayers}
          getTotalPlayTime={getTotalPlayTime}
          setShowGoalModal={setShowGoalModal}
          timerControls={timerControls}
          ourScore={ourScore}
          opponentScore={opponentScore}
        />
      </div>
      
      <GameManagementScreenViewContent
        playerData={playerData}
        isRunning={timerControls.isRunning}
        ourScore={ourScore}
        opponentScore={opponentScore}
        getTimeElapsed={timerControls.getTimeElapsed}
        toggleTimer={timerControls.toggleTimer}
        handleEndGame={handleEndGame}
        showEndGameConfirm={showConfirmEndModal}
        confirmEndGame={() => {
          setShowConfirmEndModal(false);
          handleEndGame();
        }}
        cancelEndGame={() => setShowConfirmEndModal(false)}
        recordGoal={(team, scorer, time) => {
          // Implement recordGoal functionality here or pass it from context
          console.log('Recording goal', team, scorer, time);
        }}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
        showGoalModal={showGoalModal}
        setShowGoalModal={setShowGoalModal}
        handlePlayerClick={() => {
          // Implement player click functionality if needed
        }}
        showAddPlayerModal={showAddPlayerModal}
        setShowAddPlayerModal={setShowAddPlayerModal}
        showConfirmEndModal={showConfirmEndModal}
        setShowConfirmEndModal={setShowConfirmEndModal}
        assignGoalkeeper={assignGoalkeeper}
        handleRemoveLastGoal={handleRemoveLastGoalWrapper}
        modalContext={modalContext}
        setModalContext={setModalContext}
        selectedGoalkeeper={selectedGoalkeeper}
        setSelectedGoalkeeper={setSelectedGoalkeeper}
        handleIncreasePlayers={handleIncreasePlayersWrapper}
        handleDecreasePlayers={handleDecreasePlayersWrapper}
      />
    </motion.div>
  );
}