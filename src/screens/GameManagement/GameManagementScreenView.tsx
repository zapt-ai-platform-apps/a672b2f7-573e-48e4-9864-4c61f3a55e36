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
          timerControls={timerControls}
          ourScore={ourScore}
          opponentScore={opponentScore}
        />
      </div>
      
      <GameManagementScreenViewContent
        players={playerData}
        showGoalModal={showGoalModal}
        setShowGoalModal={setShowGoalModal}
        showAddPlayerModal={showAddPlayerModal}
        setShowAddPlayerModal={setShowAddPlayerModal}
        showConfirmEndModal={showConfirmEndModal}
        setShowConfirmEndModal={setShowConfirmEndModal}
        assignGoalkeeper={assignGoalkeeper}
        handleRemoveLastGoal={() => handleRemoveLastGoal(goals, ourScore, opponentScore, setGoals, setOurScore, setOpponentScore)}
        handleEndGame={handleEndGame}
        modalContext={modalContext}
        setModalContext={setModalContext}
        selectedGoalkeeper={selectedGoalkeeper}
        setSelectedGoalkeeper={setSelectedGoalkeeper}
        handleIncreasePlayers={() => handleIncreasePlayers(playerData, setPlayerData)}
        handleDecreasePlayers={() => handleDecreasePlayers(playerData, setPlayerData)}
      />
    </motion.div>
  );
}