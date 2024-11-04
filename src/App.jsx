import { createSignal } from 'solid-js';
import { Show } from 'solid-js/web';
import GameSetup from './components/GameSetup';
import GameManagement from './components/GameManagement';

function App() {
  const [gameStarted, setGameStarted] = createSignal(false);
  const [numOnField, setNumOnField] = createSignal(5);
  const [playerData, setPlayerData] = createSignal([]);
  const [goalkeeper, setGoalkeeper] = createSignal(null);

  const handleStartGame = (players, numPlayers, gk) => {
    // Initialize player data
    setPlayerData(
      players.map((player) => ({
        name: player.name,
        totalPlayTime: 0,
        isOnField: player.isStartingPlayer,
        isGoalkeeper: player.name === gk,
      }))
    );
    setNumOnField(numPlayers);
    setGoalkeeper(gk);
    setGameStarted(true);
  };

  // Function to reset the game
  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div class="h-full bg-gradient-to-br from-green-100 to-blue-100 p-4 text-gray-800">
      <Show
        when={!gameStarted()}
        fallback={
          <GameManagement
            numOnField={numOnField}
            playerData={playerData}
            setPlayerData={setPlayerData}
            goalkeeper={goalkeeper}
            setGoalkeeper={setGoalkeeper}
            onEndGame={resetGame}
          />
        }
      >
        <GameSetup onStartGame={handleStartGame} />
      </Show>
    </div>
  );
}

export default App;