import { createSignal, onMount, onCleanup, For } from 'solid-js';
import { playerData, setPlayerData } from '../state';
import Player from './Player';

function PitchVisualization() {
  const [pitchRef, setPitchRef] = createSignal(null);
  const [draggingPlayer, setDraggingPlayer] = createSignal(null);
  const [isDragging, setIsDragging] = createSignal(false);

  const handleMouseDown = (e, player) => {
    e.preventDefault();
    setDraggingPlayer(player);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging()) {
      const pitchRect = pitchRef().getBoundingClientRect();
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

  const handleMouseUp = () => {
    if (isDragging()) {
      setIsDragging(false);
      setDraggingPlayer(null);
    }
  };

  const handleTouchStart = (e, player) => {
    e.preventDefault();
    setDraggingPlayer(player);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging() && e.touches.length === 1) {
      const touch = e.touches[0];
      const pitchRect = pitchRef().getBoundingClientRect();
      const x = touch.clientX - pitchRect.left;
      const y = touch.clientY - pitchRect.top;

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

  const handleTouchEnd = () => {
    if (isDragging()) {
      setIsDragging(false);
      setDraggingPlayer(null);
    }
  };

  onMount(() => {
    const pitchElement = pitchRef();
    if (pitchElement) {
      pitchElement.addEventListener('mousemove', handleMouseMove);
      pitchElement.addEventListener('mouseup', handleMouseUp);
      pitchElement.addEventListener('mouseleave', handleMouseUp);
      pitchElement.addEventListener('touchmove', handleTouchMove);
      pitchElement.addEventListener('touchend', handleTouchEnd);
    }
  });

  onCleanup(() => {
    const pitchElement = pitchRef();
    if (pitchElement) {
      pitchElement.removeEventListener('mousemove', handleMouseMove);
      pitchElement.removeEventListener('mouseup', handleMouseUp);
      pitchElement.removeEventListener('mouseleave', handleMouseUp);
      pitchElement.removeEventListener('touchmove', handleTouchMove);
      pitchElement.removeEventListener('touchend', handleTouchEnd);
    }
  });

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Player Positions</h2>
      <div
        ref={setPitchRef}
        class="relative border border-green-600 bg-green-100 w-full h-96 rounded-lg overflow-hidden"
      >
        <For each={playerData().filter((player) => player.isOnField)}>
          {(player) => (
            <Player
              player={player}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
            />
          )}
        </For>
      </div>
      <p class="mt-4 text-gray-700 dark:text-gray-300">
        Drag and drop players to set their positions.
      </p>
    </div>
  );
}

export default PitchVisualization;