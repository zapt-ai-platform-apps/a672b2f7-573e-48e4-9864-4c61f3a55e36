import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../hooks/useStateContext';
import GameManagementMainContent from './GameManagementMainContent';
import GameManagementScreenViewContent from './GameManagementScreenViewContent';
import BackButton from './BackButton';
import { motion } from 'framer-motion';
import useGameManagementLogic from '../../features/GameManagement/hooks/useGameManagementLogic';
import { GameManagementScreenViewProps } from './GameManagementScreenView.types';

export default function GameManagementScreenView(props: GameManagementScreenViewProps): JSX.Element {
  const navigate = useNavigate();
  const { setPlayerData } = useStateContext();
  
  const { 
    playerData, 
    isRunning,
    goals, 
    ourScore, 
    opponentScore,
    timerControls,
    onFieldPlayers = playerData?.filter(p => p.isOnField) || [],
    offFieldPlayers = playerData?.filter(p => !p.isOnField) || [],
    getTotalPlayTime = (player) => player.totalPlayTime || 0,
  } = props;
  
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
    if (handleRemoveLastGoal && goals && props.setGoals && props.setOurScore && props.setOpponentScore) {
      handleRemoveLastGoal(goals, ourScore, opponentScore, props.setGoals, props.setOurScore, props.setOpponentScore);
    }
  };

  const handleIncreasePlayersWrapper = () => {
    if (handleIncreasePlayers && playerData) {
      handleIncreasePlayers(playerData, setPlayerData);
    }
  };

  const handleDecreasePlayersWrapper = () => {
    if (handleDecreasePlayers && playerData) {
      handleDecreasePlayers(playerData, setPlayerData);
    }
  };

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
          isRunning={isRunning}
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
        isRunning={isRunning}
        ourScore={ourScore}
        opponentScore={opponentScore}
        getTimeElapsed={props.getTimeElapsed}
        toggleTimer={props.toggleTimer}
        handleEndGame={handleEndGame}
        showEndGameConfirm={showConfirmEndModal}
        confirmEndGame={() => {
          setShowConfirmEndModal(false);
          handleEndGame();
        }}
        cancelEndGame={() => setShowConfirmEndModal(false)}
        recordGoal={props.recordGoal}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
        showGoalModal={showGoalModal}
        setShowGoalModal={setShowGoalModal}
        handlePlayerClick={props.handlePlayerClick}
        goals={goals}
        setGoals={props.setGoals}
        setOurScore={props.setOurScore}
        setOpponentScore={props.setOpponentScore}
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