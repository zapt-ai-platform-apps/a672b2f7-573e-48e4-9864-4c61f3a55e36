/**
 * App component - The root component for the Football Subs application.
 *
 * @returns The rendered application routing with navigation.
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingScreen from './screens/Landing/index';
import GameSetupParticipantsScreen from './screens/GameSetup/SelectParticipants/index';
import GameSetupConfigurationScreen from './screens/GameSetup/ConfigureLineup/index';
import GameManagementScreen from './screens/GameManagement/index';
import GameSummaryScreen from './screens/GameSummary/index';
import SquadManagementScreen from './screens/SquadManagement/index';
import NavBar from './components/navigation/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/setup">
          <Route index element={<Navigate to="/setup/participants" replace />} />
          <Route path="participants" element={<ProtectedRoute><GameSetupParticipantsScreen /></ProtectedRoute>} />
          <Route path="configuration" element={<ProtectedRoute><GameSetupConfigurationScreen /></ProtectedRoute>} />
        </Route>
        <Route path="/game-management" element={<ProtectedRoute><GameManagementScreen /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><GameSummaryScreen /></ProtectedRoute>} />
        <Route path="/squads" element={<ProtectedRoute><SquadManagementScreen /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;