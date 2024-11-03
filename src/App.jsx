import { createSignal } from 'solid-js';
import { Show } from 'solid-js/web';
import GameSetup from './components/GameSetup';
import GameManagement from './components/GameManagement';

function App() {
  const [gameStarted, setGameStarted] = createSignal(false);
  const [players, setPlayers] = createSignal([]);
  const [numOnField, setNumOnField] = createSignal(5);
  const [matchLength, setMatchLength] = createSignal(60); // match length in minutes
  const [playerData, setPlayerData] = createSignal([]);

  const handleStartGame = (playerNames, numPlayers, matchDuration, startingLineup) => {
    setPlayers(playerNames);
    setNumOnField(numPlayers);
    setMatchLength(matchDuration);
    // Initialize player data
    setPlayerData(
      playerNames.map((name) => ({
        name,
        totalPlayTime: 0,
        isOnField: startingLineup.includes(name),
        isGoalkeeper: false,
      }))
    );
    setGameStarted(true);
  };

  // Function to reset the game
  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div class="min-h-screen h-full bg-gradient-to-br from-green-100 to-blue-100 p-4 text-gray-800">
      <Show
        when={!gameStarted()}
        fallback={
          <GameManagement
            players={players}
            numOnField={numOnField}
            matchLength={matchLength}
            playerData={playerData}
            setPlayerData={setPlayerData}
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