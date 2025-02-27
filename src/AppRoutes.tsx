import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import LoadingScreen from './components/Loading';
import { AnimatePresence } from 'framer-motion';

// Lazy-loaded screens
const Landing = React.lazy(() => import('./screens/Landing'));
const SquadManagement = React.lazy(() => import('./screens/SquadManagement'));
const GameSetupParticipants = React.lazy(() => import('./screens/GameSetup/SelectParticipants'));
const GameSetupStepTwo = React.lazy(() => import('./screens/GameSetup/GameSetupStepTwo'));
const GameManagement = React.lazy(() => import('./screens/GameManagement'));
const GameSummary = React.lazy(() => import('./screens/GameSummary'));

/**
 * Main routing component for the application
 */
const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <main className="w-full px-4 pb-16 h-full">
        <React.Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes 
              location={location} 
              key={location.pathname}
            >
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/sign-in" element={<SignIn />} />
              
              {/* Protected Routes */}
              <Route path="/squads" element={
                <ProtectedRoute>
                  <SquadManagement />
                </ProtectedRoute>
              } />
              <Route path="/game-setup" element={
                <ProtectedRoute>
                  <GameSetupParticipants />
                </ProtectedRoute>
              } />
              {/* Add this route to handle /setup/participants redirects */}
              <Route path="/setup/participants" element={
                <ProtectedRoute>
                  <Navigate to="/game-setup" replace />
                </ProtectedRoute>
              } />
              <Route path="/game-setup/lineup" element={
                <ProtectedRoute>
                  <GameSetupStepTwo />
                </ProtectedRoute>
              } />
              <Route path="/game-management" element={
                <ProtectedRoute>
                  <GameManagement />
                </ProtectedRoute>
              } />
              <Route path="/game-summary" element={
                <ProtectedRoute>
                  <GameSummary />
                </ProtectedRoute>
              } />
            </Routes>
          </AnimatePresence>
        </React.Suspense>
      </main>
    </>
  );
};

export default AppRoutes;