import { useNavigate } from '@solidjs/router';
import useGameManagementLogic from '../hooks/useGameManagementLogic';
import GameManagementContent from './GameManagementContent';

function GameManagement(props) {
  const navigate = useNavigate();

  const {
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    includeGKPlaytime,
    isRunning,
    gameIntervals,
    onFieldPlayers,
    offFieldPlayers,
    showEndGameConfirm,
    updatePlayerLists,
    getTotalPlayTime,
    getTimeElapsed,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    toggleTimer,
  } = useGameManagementLogic({
    playerData: props.playerData,
    setPlayerData: props.setPlayerData,
    goalkeeper: props.goalkeeper,
    setGoalkeeper: props.setGoalkeeper,
    ourScore: props.ourScore,
    setOurScore: props.setOurScore,
    opponentScore: props.opponentScore,
    setOpponentScore: props.setOpponentScore,
    goals: props.goals,
    setGoals: props.setGoals,
    includeGKPlaytime: props.includeGKPlaytime,
  });

  const confirmEndGameHandler = () => {
    confirmEndGame();
    navigate('/summary');
  };

  return (
    <GameManagementContent
      isRunning={isRunning}
      toggleTimer={toggleTimer}
      getTimeElapsed={getTimeElapsed}
      handleEndGame={handleEndGame}
      ourScore={ourScore}
      setOurScore={setOurScore}
      opponentScore={opponentScore}
      setOpponentScore={setOpponentScore}
      includeGKPlaytime={includeGKPlaytime}
      showEndGameConfirm={showEndGameConfirm}
      confirmEndGame={confirmEndGameHandler}
      cancelEndGame={cancelEndGame}
      playerData={playerData}
      setPlayerData={setPlayerData}
      updatePlayerLists={updatePlayerLists}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
      goals={goals}
      setGoals={setGoals}
      goalkeeper={goalkeeper}
      setGoalkeeper={setGoalkeeper}
    />
  );
}

export default GameManagement;