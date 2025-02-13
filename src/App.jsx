import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingScreen from './screens/Landing/index.jsx';
import GameSetupScreen from './screens/GameSetup/index.jsx';
import GameManagementScreen from './screens/GameManagement/index.jsx';
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
        <Route path="/setup" element={<ProtectedRoute><GameSetupScreen /></ProtectedRoute>} />
        <Route path="/manage" element={<ProtectedRoute><GameManagementScreen /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><GameSummaryScreen /></ProtectedRoute>} />
        <Route path="/squads" element={<ProtectedRoute><SquadManagementScreen /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;