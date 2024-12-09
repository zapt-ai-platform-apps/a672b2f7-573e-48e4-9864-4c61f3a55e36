import { Show } from 'solid-js';
import Header from './Header';
import SubstitutionPanel from './SubstitutionPanel';
import GoalManagement from './GoalManagement';
import GoalkeeperManagement from './GoalkeeperManagement';
import AddPlayer from './AddPlayer';
import EndGameConfirmationModal from './EndGameConfirmationModal';
import AdjustPlayers from './AdjustPlayers';

function GameManagementMain(props) {
  return (
    <div class="p-8 flex-grow">
      <h1 class="text-4xl font-bold mb-8 text-green-600">Game Management</h1>

      <Header {...props} />

      <Show when={!props.includeGKPlaytime()}>
        <p class="mb-4 text-gray-700 text-center">
          Note: Playtime for goalkeepers is not tracked.
        </p>
      </Show>

      <EndGameConfirmationModal
        showEndGameConfirm={props.showEndGameConfirm}
        confirmEndGame={props.confirmEndGame}
        cancelEndGame={props.cancelEndGame}
      />

      <SubstitutionPanel {...props} />

      <GoalManagement {...props} />

      <GoalkeeperManagement {...props} />

      <AddPlayer {...props} />

      <AdjustPlayers {...props} />
    </div>
  );
}

export default GameManagementMain;