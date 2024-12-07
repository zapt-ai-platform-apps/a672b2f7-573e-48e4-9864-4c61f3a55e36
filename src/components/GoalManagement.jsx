import GoalScoringSection from './GoalScoringSection';
import GoalRemovalSection from './GoalRemovalSection';

function GoalManagement(props) {
  const {
    isRunning,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    onFieldPlayers,
    getTimeElapsed,
  } = props;

  return (
    <>
      <GoalScoringSection
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

      <GoalRemovalSection
        ourScore={ourScore}
        setOurScore={setOurScore}
        opponentScore={opponentScore}
        setOpponentScore={setOpponentScore}
        goals={goals}
        setGoals={setGoals}
      />
    </>
  );
}

export default GoalManagement;