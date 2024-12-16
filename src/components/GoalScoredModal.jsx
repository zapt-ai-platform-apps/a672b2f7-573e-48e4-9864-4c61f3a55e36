import { Show, createSignal } from 'solid-js';
import { toast } from 'solid-toast';
import TeamSelection from './TeamSelection';
import ScorerSelection from './ScorerSelection';
import OpponentGoalConfirmation from './OpponentGoalConfirmation';

function GoalScoredModal(props) {
  const { showGoalModal, setShowGoalModal, players, recordGoal } = props;
  const [team, setTeam] = createSignal('');
  const [scorerName, setScorerName] = createSignal('');
  const [confirmOpponentGoal, setConfirmOpponentGoal] = createSignal(false);

  const handleConfirm = () => {
    recordGoal(team(), scorerName());
    if (team() === 'our') {
      toast.success(`Goal scored by ${scorerName()}!`);
    } else {
      toast.success('Opponent scored a goal.');
    }
    setTeam('');
    setScorerName('');
    setConfirmOpponentGoal(false);
    setShowGoalModal(false);
  };

  const handleCancel = () => {
    setTeam('');
    setScorerName('');
    setConfirmOpponentGoal(false);
    setShowGoalModal(false);
  };

  const modalHeightClass = () => {
    return team() === 'our' ? 'h-4/5' : '';
  };

  return (
    <Show when={showGoalModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          class={`bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full flex flex-col ${modalHeightClass()}`}
        >
          <h2 class="text-2xl font-bold mb-4 text-green-600">Goal Scored</h2>
          <Show when={!team()}>
            <TeamSelection setTeam={setTeam} setConfirmOpponentGoal={setConfirmOpponentGoal} />
          </Show>
          <Show when={team() === 'opponent' && confirmOpponentGoal()}>
            <OpponentGoalConfirmation
              handleConfirm={handleConfirm}
              handleCancel={handleCancel}
            />
          </Show>
          <Show when={team() === 'our'}>
            <ScorerSelection
              players={players}
              scorerName={scorerName}
              setScorerName={setScorerName}
              handleConfirm={handleConfirm}
              handleCancel={handleCancel}
            />
          </Show>
        </div>
      </div>
    </Show>
  );
}

export default GoalScoredModal;