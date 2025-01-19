import { For, Show } from 'solid-js';

function GoalsList(props) {
  const { goals } = props;

  const goalsByPlayer = () => {
    const counts = {};
    goals()
      .filter((goal) => goal.team === 'our')
      .forEach((goal) => {
        const scorer = goal.scorerName;
        if (counts[scorer]) {
          counts[scorer]++;
        } else {
          counts[scorer] = 1;
        }
      });
    return counts;
  };

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-brand-500">Goals by Our Team</h2>
      <Show when={Object.keys(goalsByPlayer()).length > 0} fallback={<p>No goals scored by our team.</p>}>
        <ul>
          <For each={Object.entries(goalsByPlayer())}>
            {([playerName, goalCount]) => (
              <li class="mb-2">
                <p>
                  {playerName}: {goalCount} goal{goalCount !== 1 ? 's' : ''}
                </p>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}

export default GoalsList;