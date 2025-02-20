import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingScreen from './screens/Landing';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import SelectParticipants from './screens/GameSetup/SelectParticipants';

function App() {
  return (
    <div className="min-h-screen h-full text-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/setup/participants"
            element={
              <ProtectedRoute>
                <SelectParticipants />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <footer className="p-4 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}

export default App;