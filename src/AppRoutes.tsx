import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingScreen from './screens/Landing';
import { ProtectedRoute } from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import GameManagement from './screens/GameManagement';
import SquadManagementScreen from './screens/SquadManagement';
import GameSetupParticipantsScreen from './screens/GameSetup/SelectParticipants';
import GameSummary from './screens/GameSummary';
import GameSetupStepTwo from './screens/GameSetup/GameSetupStepTwo';
import StartingLineup from './screens/GameSetup/ConfigureLineup/StartingLineup';

const AppRoutes = () => {
  return (
    <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Public routes */}
      <Route path="/" element={<LandingScreen />} />
      <Route path="/login" element={<SignIn />} />
      
      {/* Protected routes */}
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
            <GameSetupParticipantsScreen />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/setup/lineup" 
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
            <GameManagement />
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
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;