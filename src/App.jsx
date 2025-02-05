import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/Landing/LandingPage.jsx';
import GameSetup from './features/GameSetup/GameSetup.jsx';
import GameManagementScreen from './features/GameManagement/GameManagementScreen.jsx';
import GameSummaryScreen from './features/GameSummary/GameSummaryScreen.jsx';
import SquadManagement from './features/SquadManagement/SquadManagement.jsx';
import NavBar from './components/navigation/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/manage" element={<GameManagementScreen />} />
        <Route path="/summary" element={<GameSummaryScreen />} />
        <Route
          path="/squads"
          element={
            <ProtectedRoute>
              <SquadManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;