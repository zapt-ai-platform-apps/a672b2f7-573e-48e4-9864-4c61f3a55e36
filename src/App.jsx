import { Routes, Route } from '@solidjs/router';
import LandingPage from './components/LandingPage';
import GameSetup from './components/GameSetup';
import GameManagement from './components/GameManagement';
import GameSummary from './components/GameSummary';
import NavBar from './components/NavBar';
import {
  playerData,
  setPlayerData,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  ourScore,
  setOurScore,
  opponentScore,
  setOpponentScore,
  goals,
  setGoals,
  handleStartGame,
  resetGame,
} from './state';
import { Toaster } from 'solid-toast';

function App() {
  return (
    <>
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" component={LandingPage} />
        <Route path="/setup" element={<GameSetup onStartGame={handleStartGame} />} />
        <Route
          path="/manage"
          element={
            <GameManagement
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
    </>
  );
}

export default App;