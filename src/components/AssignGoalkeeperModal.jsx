import { Show } from 'solid-js';

function AssignGoalkeeperModal(props) {
  const {
    showGKModal,
    availablePlayers,
    setSelectedNewGoalkeeper,
    setShowGKConfirmModal,
    setShowGKModal,
  } = props;

  return (
    <Show when={showGKModal()}>
      <div class="modal-background">
        <div class="modal-content">
          <h2>Select new Goalkeeper</h2>
          <ul>
            {availablePlayers().map((player) => (
              <li>
                <button
                  onClick={() => {
                    setSelectedNewGoalkeeper(player.name);
                    setShowGKConfirmModal(true);
                    setShowGKModal(false);
                  }}
                >
                  {player.name}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowGKModal(false)}>Cancel</button>
        </div>
      </div>
    </Show>
  );
}

export default AssignGoalkeeperModal;