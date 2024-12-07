import { onMount, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import Header from './Header';
import SubstitutionPanel from './SubstitutionPanel';
import GoalManagement from './GoalManagement';
import GoalkeeperManagement from './GoalkeeperManagement';
import AddPlayer from './AddPlayer';
import EndGameConfirmationModal from './EndGameConfirmationModal';
import useGameManagementLogic from '../hooks/useGameManagementLogic';

function GameManagement(props) {
  const navigate = useNavigate();

  const {
    numOnField,
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
    numOnField,
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
    confirmEndGame(navigate);
  };

  return (
    <div class="min-h-screen flex flex-col text-gray-800">
      <div class="p-8 flex-grow">
        <h1 class="text-4xl font-bold mb-8 text-green-600">Game Management</h1>

        <Header
          isRunning={isRunning}
          toggleTimer={toggleTimer}
          getTimeElapsed={getTimeElapsed}
          handleEndGame={handleEndGame}
          ourScore={ourScore}
          opponentScore={opponentScore}
        />

        <Show when={!includeGKPlaytime()}>
          <p class="mb-4 text-gray-700 text-center">
            Note: Playtime for goalkeepers is not tracked.
          </p>
        </Show>

        <EndGameConfirmationModal
          showEndGameConfirm={showEndGameConfirm}
          confirmEndGame={confirmEndGameHandler}
          cancelEndGame={cancelEndGame}
        />

        <SubstitutionPanel
          playerData={playerData}
          setPlayerData={setPlayerData}
          isRunning={isRunning}
          includeGKPlaytime={includeGKPlaytime}
          updatePlayerLists={updatePlayerLists}
          onFieldPlayers={onFieldPlayers}
          offFieldPlayers={offFieldPlayers}
          getTotalPlayTime={getTotalPlayTime}
        />

        <GoalManagement
          isRunning={isRunning}
          ourScore={ourScore}
          setOurScore={setOurScore}
          opponentScore={opponentScore}
          setOpponentScore={setOpponentScore}
          goals={goals}
          setGoals={setGoals}
          onFieldPlayers={onFieldPlayers}
          getTimeElapsed={getTimeElapsed}
        />

        <GoalkeeperManagement
          playerData={playerData}
          setPlayerData={setPlayerData}
          goalkeeper={goalkeeper}
          setGoalkeeper={setGoalkeeper}
          isRunning={isRunning}
          includeGKPlaytime={includeGKPlaytime}
          updatePlayerLists={updatePlayerLists}
          onFieldPlayers={onFieldPlayers}
        />

        <AddPlayer
          playerData={playerData}
          setPlayerData={setPlayerData}
          updatePlayerLists={updatePlayerLists}
        />
      </div>
      <Footer />
    </div>
  );
}

export default GameManagement;