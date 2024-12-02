import { Routes, Route } from '@solidjs/router';
import LandingPage from './components/LandingPage';
import GameSetup from './components/GameSetup';
import GameManagement from './components/GameManagement';
import GameSummary from './components/GameSummary';
import { createSignal } from 'solid-js';

function App() {
  const [playerData, setPlayerData] = createSignal([]);
  const [numOnField, setNumOnField] = createSignal(5);
  const [goalkeeper, setGoalkeeper] = createSignal(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = createSignal(true);

  const [ourScore, setOurScore] = createSignal(0);
  const [opponentScore, setOpponentScore] = createSignal(0);
  const [goals, setGoals] = createSignal([]);

  const handleStartGame = (players, numPlayers, gk, includeGKTime) => {
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
    setIncludeGKPlaytime(includeGKTime);
  };

  const resetGame = () => {
    setPlayerData([]);
    setNumOnField(5);
    setGoalkeeper(null);
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
    setIncludeGKPlaytime(true);
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
            ourScore={ourScore}
            setOurScore={setOurScore}
            opponentScore={opponentScore}
            setOpponentScore={setOpponentScore}
            goals={goals}
            setGoals={setGoals}
            includeGKPlaytime={includeGKPlaytime}
            onEndGame={resetGame}
          />
        }
      />
      <Route
        path="/summary"
        element={
          <GameSummary
            playerData={playerData}
            goals={goals}
            ourScore={ourScore}
            opponentScore={opponentScore}
            includeGKPlaytime={includeGKPlaytime}
            resetGame={resetGame}
          />
        }
      />
    </Routes>
  );
}

export default App;