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
  } = props;

  const {
    isRunning,
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
      opponentScore={opponentScore}
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
      setOurScore={setOurScore}
      setOpponentScore={setOpponentScore}
      goals={goals}
      setGoals={setGoals}
      goalkeeper={goalkeeper}
      setGoalkeeper={setGoalkeeper}
    />
  );
}

export default GameManagement;