import { createEffect, onMount, onCleanup } from 'solid-js';
import { playerData } from '../state';
import Pitch from './Pitch';
import useDragAndDrop from '../hooks/useDragAndDrop';
import assignInitialPositions from '../utils/assignInitialPositions';

function PitchVisualization() {
  let pitchRef;

  const { handlePointerDown, init, cleanup } = useDragAndDrop();

  createEffect(() => {
    if (pitchRef) {
      assignInitialPositions(pitchRef);
    }
  });

  onMount(() => {
    if (pitchRef) {
      init(pitchRef);
    }
  });

  onCleanup(() => {
    cleanup();
  });

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
        Player Positions
      </h2>
      <Pitch
        pitchRef={(el) => (pitchRef = el)}
        playerData={playerData}
        handlePointerDown={handlePointerDown}
      />
      <p class="mt-4 text-gray-700 dark:text-gray-300">
        Drag and drop players to set their positions.
      </p>
    </div>
  );
}

export default PitchVisualization;