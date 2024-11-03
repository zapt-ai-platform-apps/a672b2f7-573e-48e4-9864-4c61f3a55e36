import { For } from 'solid-js/web';

function PlayerList(props) {
  return (
    <div>
      <h3 class="text-xl font-bold mb-2 text-green-600">Player Play Times</h3>
      <ul>
        <For each={props.playerData()}>
          {(player) => (
            <li class="mb-1">
              {player.name}: {Math.floor(player.totalPlayTime / 60)}:
              {player.totalPlayTime % 60 < 10 ? '0' : ''}
              {player.totalPlayTime % 60} minutes
              {player.name === props.goalkeeper() ? ' (GK)' : ''}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export default PlayerList;