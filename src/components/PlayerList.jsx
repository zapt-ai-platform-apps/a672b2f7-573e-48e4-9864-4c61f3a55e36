import { For } from 'solid-js';

function PlayerList(props) {
  const { players } = props;

  return (
    <ul>
      <For each={players}>
        {(player) => (
          <li>
            {player.name} - {player.totalPlayTime}
          </li>
        )}
      </For>
    </ul>
  );
}

export default PlayerList;