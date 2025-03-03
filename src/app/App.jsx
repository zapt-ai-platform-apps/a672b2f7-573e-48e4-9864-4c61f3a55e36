import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/modules/ui/screens/Landing/LandingPage.jsx';
import GameSetup from '@/modules/game/ui/GameSetup/index.jsx';
import GameManagementScreen from '@/modules/game/ui/GameManagement/index.jsx';
import GameSummaryScreen from '@/modules/game/ui/GameSummaryScreen.jsx';
import NavBar from '@/modules/ui/components/NavBar.jsx';
import AuthScreen from '@/modules/auth/ui/AuthScreen.jsx';
import SquadsScreen from '@/modules/squads/ui/SquadsScreen.jsx';
import SquadPlayersScreen from '@/modules/squads/ui/SquadPlayersScreen.jsx';
import { ProtectedRoute, PublicRoute } from '@/modules/auth/context/AuthProvider';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><AuthScreen /></PublicRoute>} />
        <Route path="/squads" element={
          <ProtectedRoute>
            <SquadsScreen />
          </ProtectedRoute>
        } />
        <Route path="/squads/:squadId/players" element={
          <ProtectedRoute>
            <SquadPlayersScreen />
          </ProtectedRoute>
        } />
        <Route path="/setup" element={
          <ProtectedRoute>
            <GameSetup />
          </ProtectedRoute>
        } />
        <Route path="/manage" element={
          <ProtectedRoute>
            <GameManagementScreen />
          </ProtectedRoute>
        } />
        <Route path="/summary" element={
          <ProtectedRoute>
            <GameSummaryScreen />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;