import { createSignal, onMount, onCleanup } from 'solid-js';
import { playerData, setPlayerData } from '../state';
import Pitch from './Pitch';

function PitchVisualization() {
  let pitchRef;
  const [draggingPlayer, setDraggingPlayer] = createSignal(null);
  const [isDragging, setIsDragging] = createSignal(false);

  const handlePointerDown = (e, player) => {
    e.preventDefault();
    setDraggingPlayer(player);
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (isDragging()) {
      const pitchRect = pitchRef.getBoundingClientRect();
      const x = e.clientX - pitchRect.left;
      const y = e.clientY - pitchRect.top;

      setPlayerData(
        playerData().map((p) => {
          if (p.name === draggingPlayer().name) {
            return {
              ...p,
              position: { x, y },
            };
          }
          return p;
        })
      );
    }
  };

  const handlePointerUp = () => {
    if (isDragging()) {
      setIsDragging(false);
      setDraggingPlayer(null);
    }
  };

  onMount(() => {
    if (pitchRef) {
      pitchRef.addEventListener('pointermove', handlePointerMove);
      pitchRef.addEventListener('pointerup', handlePointerUp);
      pitchRef.addEventListener('pointercancel', handlePointerUp);
      pitchRef.addEventListener('pointerleave', handlePointerUp);
    }
  });

  onCleanup(() => {
    if (pitchRef) {
      pitchRef.removeEventListener('pointermove', handlePointerMove);
      pitchRef.removeEventListener('pointerup', handlePointerUp);
      pitchRef.removeEventListener('pointercancel', handlePointerUp);
      pitchRef.removeEventListener('pointerleave', handlePointerUp);
    }
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