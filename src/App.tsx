import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingScreen from './screens/Landing';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import SelectParticipants from './screens/GameSetup/SelectParticipants';
import SquadManagementScreen from './screens/SquadManagement';
import GameSetupStepTwo from './screens/GameSetup/GameSetupStepTwo';
import GameManagementScreen from './screens/GameManagement';
import StartingLineup from './screens/GameSetup/ConfigureLineup/StartingLineup';

function App() {
  return (
    <div className="min-h-screen h-full text-white bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900">
      <Router>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <footer className="fixed bottom-0 inset-x-0 p-2 text-center text-xs bg-white/20 backdrop-blur-sm z-10">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-white hover:text-gray-100 transition-colors"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}

export default App;