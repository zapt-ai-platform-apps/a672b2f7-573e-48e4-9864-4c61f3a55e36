import { Routes, Route } from '@solidjs/router';
import LandingPage from './components/LandingPage';
import GameSetup from './components/GameSetup';
import GameManagement from './components/GameManagement';
import { createSignal } from 'solid-js';

function App() {
  const [playerData, setPlayerData] = createSignal([]);
  const [numOnField, setNumOnField] = createSignal(5);
  const [goalkeeper, setGoalkeeper] = createSignal(null);

  const handleStartGame = (players, numPlayers, gk) => {
    // Initialize player data
    setPlayerData(
      players.map((player) => {
        const isStarting = player.isStartingPlayer;
        const isGoalkeeperPlayer = player.name === gk;
        return {
          name: player.name,
          playIntervals: [], // Start with empty playIntervals
          isOnField: isStarting,
          isGoalkeeper: isGoalkeeperPlayer,
          totalPlayTime: 0, // initial total play time is 0
        };
      })
    );
    setNumOnField(numPlayers);
    setGoalkeeper(gk);
  };

  const resetGame = () => {
    setPlayerData([]);
    setNumOnField(5);
    setGoalkeeper(null);
  };

  return (
    <Routes>
      <Route path="/" component={LandingPage} />
      <Route
        path="/setup"
        element={<GameSetup onStartGame={handleStartGame} />}
      />
      <Route
        path="/manage"
        element={
          <GameManagement
            numOnField={numOnField}
            playerData={playerData}
            setPlayerData={setPlayerData}
            goalkeeper={goalkeeper}
            setGoalkeeper={setGoalkeeper}
            onEndGame={resetGame}
          />
        }
      />
    </Routes>
  );
}

export default App;