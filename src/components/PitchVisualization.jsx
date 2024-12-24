import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';
import { playerData, setPlayerData } from '../state';

function PitchVisualization() {
  const [pitchRef, setPitchRef] = createSignal(null);
  const [draggingPlayer, setDraggingPlayer] = createSignal(null);

  const onDragStart = (player) => {
    setDraggingPlayer(player);
  };

  const onDragEnd = () => {
    setDraggingPlayer(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const pitchRect = pitchRef().getBoundingClientRect();
    const x = e.clientX - pitchRect.left;
    const y = e.clientY - pitchRect.top;

    setPlayerData(
      playerData().map((player) => {
        if (player.name === draggingPlayer().name) {
          console.log(`Player ${player.name} moved to position: x=${x}, y=${y}`);
          return {
            ...player,
            position: { x, y },
          };
        }
        return player;
      })
    );
    setDraggingPlayer(null);
  };

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Player Positions</h2>
      <div
        ref={setPitchRef}
        class="relative border border-green-600 bg-green-100 w-full h-96 rounded-lg overflow-hidden"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <For each={playerData().filter(player => player.isOnField)}>
          {(player) => (
            <div
              class="absolute cursor-pointer flex items-center justify-center bg-blue-500 text-white rounded-full"
              style={{
                top: player.position && player.position.y !== null ? `${(player.position.y - 20)}px` : '50%',
                left: player.position && player.position.x !== null ? `${(player.position.x - 20)}px` : '50%',
                width: '40px',
                height: '40px',
                transform: 'translate(-50%, -50%)',
              }}
              draggable
              onDragStart={() => onDragStart(player)}
              onDragEnd={onDragEnd}
            >
              {player.isGoalkeeper ? 'GK' : player.name.charAt(0)}
            </div>
          )}
        </For>
      </div>
      <p class="mt-4 text-gray-700 dark:text-gray-300">Drag and drop players to set their positions.</p>
    </div>
  );
}

export default PitchVisualization;