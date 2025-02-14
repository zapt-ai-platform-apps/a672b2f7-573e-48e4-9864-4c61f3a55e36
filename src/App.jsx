import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingScreen from './screens/Landing/LandingPage.jsx';
import GameSetupParticipantsScreen from './screens/GameSetup/SelectParticipants/index.jsx';
import GameSetupConfigurationScreen from './screens/GameSetup/ConfigureLineup/index.jsx';
import GameManagementScreen from './screens/GameManagement/GameManagementScreen.jsx';
import GameSummaryScreen from './screens/GameSummary/index.jsx';
import SquadManagementScreen from './screens/SquadManagement/index.jsx';
import NavBar from './components/navigation/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
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
        <Route path="/manage" element={<ProtectedRoute><GameManagementScreen /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><GameSummaryScreen /></ProtectedRoute>} />
        <Route path="/squads" element={<ProtectedRoute><SquadManagementScreen /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;