import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './screens/Landing/LandingPage';
import GameSetup from './screens/GameSetup/GameSetup';
import GameManagementScreen from './screens/GameManagement/GameManagementScreen';
import GameSummaryScreen from './screens/GameSummary/GameSummaryScreen';
import NavBar from '../shared/components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/manage" element={<GameManagementScreen />} />
        <Route path="/summary" element={<GameSummaryScreen />} />
      </Routes>
    </>
  );
}

export default App;