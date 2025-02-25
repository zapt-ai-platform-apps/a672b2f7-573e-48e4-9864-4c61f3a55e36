import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingScreen from './screens/Landing';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import SelectParticipants from './screens/GameSetup/SelectParticipants';
import SquadManagementScreen from './screens/SquadManagement';
import GameSetupStepTwo from './screens/GameSetup/GameSetupStepTwo';
import GameManagementScreen from './screens/GameManagement';
import StartingLineup from './screens/GameSetup/ConfigureLineup/StartingLineup';
import GameSummary from './screens/GameSummary';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/squads"
        element={
          <ProtectedRoute>
            <SquadManagementScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setup/participants"
        element={
          <ProtectedRoute>
            <SelectParticipants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setup/starting-lineup"
        element={
          <ProtectedRoute>
            <StartingLineup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setup/configuration"
        element={
          <ProtectedRoute>
            <GameSetupStepTwo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game-management"
        element={
          <ProtectedRoute>
            <GameManagementScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game-summary"
        element={
          <ProtectedRoute>
            <GameSummary />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;