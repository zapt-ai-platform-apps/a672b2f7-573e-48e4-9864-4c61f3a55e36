import { For } from 'solid-js';
import Player from './Player';

function Pitch(props) {
  return (
    <div
      class="relative bg-green-600 w-full max-w-4xl mx-auto h-96 rounded-lg overflow-hidden"
      ref={props.pitchRef}
      style="touch-action: none;"
    >
      {/* Pitch Markings */}
      <div class="absolute inset-0 flex items-center justify-center">
        {/* Center Circle */}
        <div class="border border-white rounded-full w-32 h-32"></div>
      </div>
      {/* Center Line */}
      <div class="absolute inset-y-0 left-1/2 w-px bg-white opacity-75"></div>
      {/* Left Penalty Area */}
      <div class="absolute left-0 top-1/4 w-12 h-1/2 border border-white"></div>
      {/* Right Penalty Area */}
      <div class="absolute right-0 top-1/4 w-12 h-1/2 border border-white"></div>
      {/* Left Goal Area */}
      <div class="absolute left-0 top-1/3 w-6 h-1/3 border border-white"></div>
      {/* Right Goal Area */}
      <div class="absolute right-0 top-1/3 w-6 h-1/3 border border-white"></div>

      {/* Players */}
      <For each={props.playerData().filter((player) => player.isOnField)}>
        {(player) => (
          <Player
            player={player}
            handlePointerDown={props.handlePointerDown}
          />
        )}
      </For>
    </div>
  );
}

export default Pitch;