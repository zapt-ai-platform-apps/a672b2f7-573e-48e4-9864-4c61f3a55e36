import { Show, For, createSignal } from 'solid-js';

function GoalScoredModal(props) {
  const { showGoalModal, setShowGoalModal, players, recordGoal } = props;
  const [team, setTeam] = createSignal('');
  const [scorerName, setScorerName] = createSignal('');

  const handleTeamSelection = (selectedTeam) => {
    setTeam(selectedTeam);
  };

  const handlePlayerSelection = (playerName) => {
    setScorerName(playerName);
  };

  const handleConfirm = () => {
    recordGoal(team(), scorerName());
    setTeam('');
    setScorerName('');
    setShowGoalModal(false);
  };

  const handleCancel = () => {
    setTeam('');
    setScorerName('');
    setShowGoalModal(false);
  };

  return (
    <Show when={showGoalModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4 text-green-600">Goal Scored</h2>
          <Show when={!team()}>
            <p class="mb-4 text-lg">Which team scored?</p>
            <div class="flex space-x-4">
              <button
                class="flex-1 px-6 py-3 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={() => handleTeamSelection('our')}
              >
                Our Team
              </button>
              <button
                class="flex-1 px-6 py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={() => {
                  recordGoal('opponent', '');
                  setTeam('');
                  setScorerName('');
                  setShowGoalModal(false);
                }}
              >
                Opponent Team
              </button>
            </div>
          </Show>
          <Show when={team() === 'our'}>
            <p class="mt-4 mb-2 text-lg">Who scored?</p>
            <ul class="max-h-64 overflow-y-auto">
              <For each={players().map((player) => player.name)}>
                {(name) => (
                  <li
                    class={`p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${
                      scorerName() === name ? 'bg-blue-200' : ''
                    }`}
                    onClick={() => handlePlayerSelection(name)}
                  >
                    {name}
                  </li>
                )}
              </For>
            </ul>
            <Show when={scorerName()}>
              <div class="mt-4 flex justify-end space-x-4">
                <button
                  class="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  class="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Show>
          </Show>
        </div>
      </div>
    </Show>
  );
}

export default GoalScoredModal;