import { createSignal } from 'solid-js';
import GoalScoredModal from './GoalScoredModal';

function GoalScoringSection(props) {
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

  const [showGoalModal, setShowGoalModal] = createSignal(false);

  const recordGoal = (team, scorerName) => {
    const time = getTimeElapsed();
    if (team === 'our') {
      setOurScore(ourScore() + 1);
      setGoals([...goals(), { team, scorerName, time }]);
    } else if (team === 'opponent') {
      setOpponentScore(opponentScore() + 1);
      setGoals([...goals(), { team, scorerName: null, time }]);
    }
  };

  return (
    <>
      <div class="bg-white p-8 rounded-lg shadow-md mb-8">
        <button
          class="px-8 py-4 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={() => setShowGoalModal(true)}
        >
          Goal Scored
        </button>
      </div>

      <GoalScoredModal
        showGoalModal={showGoalModal}
        setShowGoalModal={setShowGoalModal}
        players={onFieldPlayers}
        recordGoal={recordGoal}
      />
    </>
  );
}

export default GoalScoringSection;