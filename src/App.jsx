import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/Landing/LandingPage.jsx';
import GameSetup from './features/GameSetup/GameSetup.jsx';
import GameManagementScreen from './features/GameManagement/GameManagementScreen.jsx';
import GameSummaryScreen from './features/GameSummary/GameSummaryScreen.jsx';
import SquadSelectionScreen from './features/SquadManagement/SquadSelectionScreen.jsx';
import SquadOptionsScreen from './features/SquadManagement/SquadOptionsScreen.jsx';
import CreateSquadScreen from './features/SquadManagement/CreateSquadScreen.jsx';
import EditSquadForm from './features/SquadManagement/EditSquadForm.jsx';
import NavBar from './components/navigation/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<ProtectedRoute><GameSetup /></ProtectedRoute>} />
        <Route path="/manage" element={<ProtectedRoute><GameManagementScreen /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><GameSummaryScreen /></ProtectedRoute>} />
        <Route path="/squads" element={<ProtectedRoute><SquadSelectionScreen /></ProtectedRoute>} />
        <Route path="/squads/new" element={<ProtectedRoute><CreateSquadScreen /></ProtectedRoute>} />
        <Route path="/squads/options" element={<ProtectedRoute><SquadOptionsScreen /></ProtectedRoute>} />
        <Route path="/squads/edit" element={<ProtectedRoute><EditSquadForm /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;