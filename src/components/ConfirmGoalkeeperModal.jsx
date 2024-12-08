import { Show } from 'solid-js';

function ConfirmGoalkeeperModal(props) {
  const {
    showGKConfirmModal,
    selectedNewGoalkeeper,
    confirmGoalkeeper,
    setShowGKConfirmModal,
  } = props;

  return (
    <Show when={showGKConfirmModal()}>
      <div class="modal-background">
        <div class="modal-content">
          <h2>Confirm new Goalkeeper</h2>
          <p>
            Are you sure you want to assign {selectedNewGoalkeeper()} as the new goalkeeper?
          </p>
          <button onClick={() => confirmGoalkeeper(selectedNewGoalkeeper())}>Confirm</button>
          <button onClick={() => setShowGKConfirmModal(false)}>Cancel</button>
        </div>
      </div>
    </Show>
  );
}

export default ConfirmGoalkeeperModal;