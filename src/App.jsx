import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './screens/Landing/LandingPage.jsx';
import GameSetup from './screens/GameSetup.jsx';
import GameManagementScreen from './features/GameManagement/GameManagementScreen.jsx';
import GameSummaryScreen from './features/GameSummary/GameSummaryScreen.jsx';
import SquadManagement from './screens/SquadManagement.jsx';
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