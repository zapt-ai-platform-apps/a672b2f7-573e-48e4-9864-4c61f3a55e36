import { createSignal, onMount } from 'solid-js';

function useGameSetup() {
  const [playerName, setPlayerName] = createSignal('');
  const [players, setPlayers] = createSignal([]);
  const [startingPlayersCount, setStartingPlayersCount] = createSignal(0);
  const [errorMessage, setErrorMessage] = createSignal('');
  const [startingPlayers, setStartingPlayers] = createSignal([]);
  const [goalkeeper, setGoalkeeper] = createSignal('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = createSignal(true);

  onMount(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      const loadedPlayers = JSON.parse(savedPlayers);
      const updatedPlayers = loadedPlayers.map((player) => ({
        ...player,
        isStartingPlayer: false,
      }));
      setPlayers(updatedPlayers);
    }
  });

  const addPlayer = () => {
    if (playerName().trim() !== '') {
      const newPlayer = {
        name: playerName().trim(),
        isStartingPlayer: false,
      };
      setPlayers([...players(), newPlayer]);
      setPlayerName('');
      return true;
    }
    return false;
  };

  const deletePlayer = (playerNameToDelete) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${playerNameToDelete}?`);
    if (confirmDelete) {
      const updatedPlayers = players().filter((player) => player.name !== playerNameToDelete);
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
      return true;
    }
    return false;
  };

  const toggleStartingPlayer = (playerNameToToggle) => {
    setPlayers(
      players().map((player) => {
        if (player.name === playerNameToToggle) {
          return { ...player, isStartingPlayer: !player.isStartingPlayer };
        }
        return player;
      })
    );
    const count = players().filter((p) => p.isStartingPlayer).length;
    setStartingPlayersCount(count);
    setStartingPlayers(players().filter((p) => p.isStartingPlayer));
  };

  return {
    playerName,
    setPlayerName,
    players,
    setPlayers,
    startingPlayersCount,
    setStartingPlayersCount,
    errorMessage,
    setErrorMessage,
    startingPlayers,
    setStartingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
  };
}

export default useGameSetup;